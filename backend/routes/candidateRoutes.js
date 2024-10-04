// routes/candidateRoutes.js
const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController.js');
const { auth } = require("../middleware/auth");

router.post('/register', auth, candidateController.registerCandidate);
router.get('/:candidateId', auth, candidateController.getCandidateById);
router.put('/:candidateId', auth, candidateController.updateCandidate);

module.exports = router;