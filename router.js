const express = require("express");
const router = express.Router();

const promoController = require("./controllers/promoController");
const studentController = require("./controllers/studentController");

// * PROMO
router.get("/", promoController.homePage);

router.get("/promos", promoController.promosListPage);

// route paramétrée pour afficher 1 promo
// on met le nom de la promo dans l'url pour que ce soit sympa pour l'utilisateur, et l'id pour retrouver la promo au sein du code
router.get("/promo/:name/:id", promoController.promoPage);

// * STUDENT

router.get("/promo/:name/:id/students", studentController.studentsByPromoPage);

// route pour la page d'1 étudiant
router.get("/student/:id", studentController.studentPage);

// ! ERROR
// à la fin du routeur pour capter toutes les requetes qui n'ont correspondu à aucune route précédente
router.use("*", (req, res) => {
  res.render("404");
});

module.exports = router;
