const express = require("express");
const pageControllers = require('../controllers/pageControllers') // Sayfa Yönlendirme Controllers Import
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const router = express.Router();

router.route("/").get(pageControllers.getIndexPage);
router.route("/about").get(pageControllers.getAboutPage);
router.route("/contact").get(pageControllers.getContactPage);
router.route("/contact").post(pageControllers.sendEmail);
router.route("/login").get(redirectMiddleware, pageControllers.getLoginPage);
router.route("/register").get(redirectMiddleware, pageControllers.getRegisterPage);

module.exports = router;
