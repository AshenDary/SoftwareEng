const router = require('express').Router();
const { getStatistics } = require('../controllers/statisticsController');

router.get('/', getStatistics);

module.exports = router;
