// const promos = require("../docs/data/promos.json")

const db = require("../db");

const promoController = {
  homePage: (req, res) => {
    res.render("index");
  },

  // renvoie une réponse à la requête HTTP
  promosListPage: (req, res, next) => {
    // aller chercher la donnée nécessaire pour dynamiser notre vue
    // ! ce n'est pas le rôle de cette méthode du controller, elle ne doit s'occuper que de renvoyer la réponse

    const query = "SELECT * FROM promo ORDER BY name ASC;";

    // ici on a du code asynchrone donc il faut gérer le retour avec un callback
    // CALLBACK = fonction qui sera appelé lors de la résolution/réjection de la promesse
    db.query(query, (error, result) => {
      if (error) {
        res.locals.error = { code: 404, message: error };
        next();
      } else {
        // console.log(result); // objet contenant rowCount : nbr_de_resultats, rows : [tableau des résultats]

        const promos = result.rows;
        res.render("promosList", { promos });
      }
    });
  },

  promoPage: (req, res, next) => {
    // "http://localhost:5000/promo/Cosmos/5"

    // const name = req.params.name
    // const id = req.params.id

    // destructuring
    const { name: promoName, id: reqId } = req.params;

    // const query = "SELECT * FROM promo WHERE id = " + reqId
    // const query = `SELECT * FROM promo WHERE id = ${reqId}`

    // ! dangereux -> potentielle faille pour les injections SQL

    // si l'utilisateur fournit du code SQL dans l'url au lieu d'un id, ma requête peut ressembler à ça : SELECT * FROM promo WHERE id = -- DROP TABLE promo; ==> suppression totale de la table 'promo'

    // * On va plutôt utiliser des requêtes paramétrées (https://node-postgres.com/features/queries)

    // on va laisser le module PG construire la requête à notre place en y intégrant les données sensibles après avoir fait un 'sanitize' (assainissement) des données externes à l'application

    const query = {
      text: "SELECT * FROM promo WHERE id = $1",
      values: [reqId],
    };

    // syntaxe promise .then().catch()
    db.query(query)
      .then((result) => {
        console.log(result);
        return res.render("promo", { promo: result.rows[0] });
      })
      .catch((error) => {
        res.locals.error = { code: 404, message: error };
        return next();
      });
  },

  promosListPageThenCatch: async (req, res, next) => {
    const query = "SELECT * FROM promo ORDER BY name ASC ;";
    try {
      const result = await db.query(query);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = promoController;
