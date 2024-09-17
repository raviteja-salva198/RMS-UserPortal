const express = require("express");
const { postJob, updateJobFunction } = require("../controllers/company");
const { auth, isCompany } = require("../middleware/auth");
const router = express.Router();
//changes
router.post("/jobPost", auth, isCompany, postJob);
router.post("/jobUpdate", auth, isCompany, updateJobFunction);
router.get("/getallapplicants", auth, isCompany);
module.exports = router;
