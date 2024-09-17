const express = require("express");
const { postJob, updateJobFunction } = require("../controllers/company");
const { auth, isCompany, isUser } = require("../middleware/auth");
const upload = require("../config/multer");
const {
  jobSearch,
  getJobAlertsFunction,
  applyorWithdrawJobFunction,
  studentRegistration,
  getProfile,
  updateProfile,
  getAnnouncement,
  UserLogin,
  UserSignUp,
  sendOtp,
  userLogout,
  application,
} = require("../controllers/user");

const router = express.Router();

//routes

router.post("/login", UserLogin);
router.post("/logout", userLogout);
router.post("/signup", UserSignUp);
router.post("/otp", sendOtp);

// Mani Charan
router.get("/jobs", jobSearch);
router.get("/applications", application);

router.get("/profile/:username", getProfile);
router.post("/upload", upload.single("image"), updateProfile);
router.get("/getalljobalerts", auth, isUser, getJobAlertsFunction);
router.get("/announcement", getAnnouncement);
router.post(
  "/applyorwithdrawapplication",
  auth,
  isUser,
  applyorWithdrawJobFunction
);
// auth, isUser,
router.post("/studentRegistration", auth, isUser, studentRegistration);
module.exports = router;
