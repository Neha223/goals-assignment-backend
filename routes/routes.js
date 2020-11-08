const express = require('express');
const router = express.Router();
const controller = require('../controllers/CommonController');

router.get('/', function (req, res) {
    res.send('API works!');
});
router.get('/records',controller.getAllRecords);
router.post('/signup',controller.signup);
router.post('/changestatus',controller.changeStatus);
router.post('/search',controller.searchData);
router.get('/checkphone',controller.checkPhoneByValue);
router.get('/checkemail',controller.checkEmailByValue);

module.exports = router;