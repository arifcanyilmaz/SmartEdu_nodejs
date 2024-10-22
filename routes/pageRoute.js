const express = require("express");
const pageControllers = require('../controllers/pageControllers') // Sayfa Yönlendirme Controllers Import
const router = express.Router();

router.route("/").get(pageControllers.getIndexPage);
router.route("/about").get(pageControllers.getAboutPage);

router.route("/dashboard").get(pageControllers.getDashboardPage);
router.route("/contact").get(pageControllers.getContactPage);
router.route("/login").get(pageControllers.getLoginPage);
router.route("/register").get(pageControllers.getRegisterPage);

module.exports = router;
