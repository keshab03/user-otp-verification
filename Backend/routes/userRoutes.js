const express = require('express');
const bodyParser = require('body-parser');
// const requireAuth = require('../middleware/requireAuth');
const { getAll, getAllEmployee, signup, login, sendOtp} = require('../controllers/userController')

const router = express.Router();
// router.use(requireAuth);
// Add bodyParser middleware to parse request bodies
router.use(bodyParser.json());

router.get('/get', getAll);

router.get('/getnum', getAllEmployee);

router.post('/signup', signup);

router.post('/login', login);

router.post('/sendotp',sendOtp);

module.exports = router;