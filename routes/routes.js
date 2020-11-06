const express = require('express');
const router = express.Router();
const controller = require('../controllers/CommonController');

router.get('/', function (req, res) {
    res.send('API works!');
});
// router.get('/records',controller.getAllRecords);
router.post('/signup',controller.signup);

module.exports = router;