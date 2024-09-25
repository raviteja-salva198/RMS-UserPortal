const express = require("express");
const router = express.Router();
const {createOrder, registerExam, verifyPayment}  = require('../controllers/certificationExam')
const { auth } = require("../middleware/auth");

router.post("/create-order", auth, createOrder)
router.post("/verify-payment", auth, verifyPayment)
router.post("/register-exam", auth, registerExam)

module.exports = router;

