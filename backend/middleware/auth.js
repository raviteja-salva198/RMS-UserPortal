const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token is missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (e) {
      console.log("auth error",e);
      return res.status(404).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "Sorry something went wrong while validating the token",
    });
  }
};

exports.isUser = async (req, res, next) => {
  try {
    if (req.user.accountType !== "User") {
      return res.status(404).json({
        success: false,
        message: "This is the protected route for SuperAdmin only",
      });
    }
    next();
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "User cannot be verified something went wrong",
    });
  }
};

exports.isCompany = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Company") {
      return res.status(404).json({
        success: false,
        message: "This is the protected route for Admin only",
      });
    }
    next();
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "User cannot be verified something went wrong",
    });
  }
};
  


