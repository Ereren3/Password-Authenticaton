const express = require('express');
const pageRoutes = require('../controllers/pageController');

const router = express.Router();

router.route("/").get(pageRoutes.getWelcomePage);
router.route("/dashboard").get(pageRoutes.getDashboardPage);

module.exports = router;