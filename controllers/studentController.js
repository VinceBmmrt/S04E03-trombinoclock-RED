const db = require("../db");

const studentController = {
  // ici on va utiliser la syntaxe async/await donc je dois déclarer ma fonction en asynchrone avec le mot clé "async"
  studentsByPromoPage: async (req, res, next) => {
    const { id: promoId } = req.params;

    const queryPromo = {
      text: "SELECT * FROM promo WHERE id = $1",
      values: [promoId],
    };

    const queryStudent = {
      text: "SELECT * FROM student WHERE promo_id = $1",
      values: [promoId],
    };

    // on utilise un bloc try/catch pour gérer le code asynchrone
    try {
      //* On query la promo
      const resultPromo = await db.query(queryPromo);
      console.log("PROMO", resultPromo);

      if (!resultPromo.rowCount) {
        throw new Error("Aucune promo correspondante");
      }

      // -- je récupère mon objet promo
      const promo = resultPromo.rows[0];

      //*  On query les étudiants
      const resultStudent = await db.query(queryStudent);
      console.log("STUDENT", resultStudent);

      if (resultStudent.rowCount === 0) {
        throw new Error("Aucun étudiant correspondant");
      }

      //  -- je récupère le tableau de résultats qui contient tous les étudiants
      const studentList = resultStudent.rows;

      res.render("students", { promo, studentList });

      // si jamais le code du try génère la moindre exception, son exécution sera interrompue, et c'est le bloc 'catch' qui sera exécuté
    } catch (error) {
      console.log(error);
      res.locals.error = { code: 404, message: error };
      return next();
    }
  },

  studentPage: async (req, res, next) => {
    const { id: studentId } = req.params;
    // const studentId = req.params.id

    const query = {
      text: "SELECT * FROM student WHERE id = $1",
      values: [studentId],
    };

    try {
      const result = await db.query(query);

      if (!result.rowCount) {
        throw new Error("Aucun étudiant correspondant");
      }

      const student = result.rows[0];

      const resultPromo = await db.query("SELECT * FROM promo WHERE id = $1", [
        student.promo_id,
      ]);

      console.log(resultPromo);

      res.render("student", { student, promo: resultPromo.rows[0] });
    } catch (error) {
      console.log(error);
      res.locals.error = { code: 404, message: error };
      return next();
    }
  },
};

module.exports = studentController;
