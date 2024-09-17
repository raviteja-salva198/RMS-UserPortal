// models
const Jobapplied = require("../mail/jobapplied");
const otpModel = require("../model/otp");
const Company = require("../model/Company");
const Address = require("../model/address");
const User = require("../model/User");
const Job = require("../model/job");
const Announcement = require("../model/announcement");
const otpGenerator = require("otp-generator");

const jobSearchModal = require("../model/jobSearch");
const applicationModal = require("../model/application");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// utils
const mailSender = require("../utils/mailSender");

const School = require("../model/schoolInfo");
const College = require("../model/collegeInfo");
const educationalInfo = require("../model/EducationalInfo");
const trainingWorkshop = require("../model/trainingWorkshops");
const visa = require("../model/visaInfo");
const Languages = require("../model/languageInfo");
const jobpreferances = require("../model/jobPreferances");
const passportinfo = require("../model/passportInfo");
const jobinfo = require("../model/jobInfo");
const { uploadImageToCloudinary } = require("../utils/cloudinary");
exports.getJobAlertsFunction = async (req, res) => {
  try {
    const userId = req.user.id;
    const findUser = await User.findById({ userId })
      .populate("notification")
      .exec();
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "You are coming into the wrong login page",
      });
    }
    const jobNotifications = findUser.notification;
    return res.status(200).json({
      success: true,
      message: "Job notifications updated",
      jobNotifications,
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong while posting the job",
    });
  }
};
exports.applyorWithdrawJobFunction = async (req, res) => {
  try {
    const userId = req.user.id;
    const findUser = await User.findById({ userId })
      .populate("notification")
      .exec();
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "You are coming into the wrong login page",
      });
    }
    const { id, decision } = req.body;
    if (decision === 0) {
      const findCondition = await User.findById({
        _id: userId,
        jobsApplied: { $eleMatch: { $eq: id } },
      })
        .populate("jobsApplied")
        .exec();
      if (!findCondition) {
        return res.status(404).json({
          success: false,
          message: "Sorry the job is not existing over here",
        });
      }
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          $pull: {
            jobsApplied: id,
          },
        },
        { new: true }
      );
      await Job.findByIdAndUpdate(
        { _id: userId },
        {
          $pull: {
            applicants: userId,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Job is removed successfully",
      });
    } else {
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            jobsApplied: id,
          },
        },
        { new: true }
      );
      await Job.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            applicants: userId,
          },
        },
        { new: true }
      );
      const firstName = findUser.firstName;
      try {
        await mailSender(
          getAdmin.email,
          "Aptitude guru Hem",
          Jobapplied({
            firstName,
          })
        );
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        });
      }
      return res.status(200).json({
        success: true,
        message: "You have applied to job successfully",
      });
    }
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong while posting the job",
    });
  }
};

// Mani Charan Start
exports.jobSearch = async (req, res) => {
  console.log("hi");
  const { keyword, jobType } = req.query;
  const query = {};

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { company: { $regex: keyword, $options: "i" } },
      { location: { $regex: keyword, $options: "i" } },
    ];
  }

  if (jobType) {
    query.jobType = { $in: jobType.split(",") };
  }

  try {
    const jobs = await jobSearchModal.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.application = async (req, res) => {
  try {
    const { start, end, jobPosition, status } = req.query;

    const query = {};

    if (start) {
      query.date = { ...query.date, $gte: start };
    }

    if (end) {
      query.date = { ...query.date, $lte: end };
    }

    if (jobPosition) {
      query.jobPosition = jobPosition;
    }

    if (status) {
      query.status = status;
    }

    const applications = await applicationModal.find(query);
    res.json({ applications });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Mani Charan End

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await profile.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "Profile not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error, please try again." });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { videoLink, username } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Find or create profile based on username
    const updatedProfile = await profile.findOneAndUpdate(
      { username },
      { image, videoLink },
      { new: true, upsert: true } // Update existing or create new
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found." });
    }

    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error processing profile:", error);
    res.status(500).json({ error: "Server error, please try again." });
  }
};
exports.getAnnouncement = async (req, res) => {
  try {
    // Fetch announcements data from database
    const announcement = await Announcement.find().sort({ createdAt: -1 });

    if (!announcement) {
      return res.status(404).json({ message: "No announcement found" });
    }

    // Send successful response
    res.status(200).json({
      success: true,
      announcement,
    });
  } catch (error) {
    console.log("error", error);
    // Send error response
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all the required details",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not registered",
      });
    }

    // Check if user is active
    //FIXME: is admin approval needed? ask to Sairam.
    // if (!user.active) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Account not active, please wait for admin approval",
    //   });
    // }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Find related college (this check might not be necessary here)
    // const findCollege = await Admin.find({ collegeName: user.collegeName });

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        accountType: "User",
        collegeName: user.collegeName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Send response with token
    const options = {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    };
    res
      .cookie("token", token, options)
      .status(200)
      .json({
        success: true,
        token,
        user: {
          email: user.email,
          id: user._id,
          collegeName: user.collegeName,
        },
        message: "User login successful",
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while logging in",
    });
  }
};

exports.userLogout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};

exports.UserSignUp = async (req, res) => {
  try {
    console.log("body", req.body);
    const {
      firstName,
      lastName,
      email,
      mobile,
      countryCode,
      password,
      confirmPassword,
      otp,
    } = req.body;

    // Check if all required fields are provided
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile ||
      !countryCode ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required details",
      });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    // Check if email is already registered
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Check if mobile number is already registered
    const existingUserByMobile = await User.findOne({ mobileNumber: mobile });

    if (existingUserByMobile) {
      return res.status(409).json({
        success: false,
        message: "Mobile number is already registered",
      });
    }

    // Validate OTP
    const latestOtp = await otpModel.find({ email }).sort({ createdAt: -1 });

    console.log("lastes", latestOtp);
    if (latestOtp.length === 0 || Number(otp) !== Number(latestOtp[0].otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      firstName,
      lastName,
      password: hashPassword,
      mobileNumber: mobile,
      countryCode,
      email,
      accountType: "User",
    });

    // Send confirmation email
    //FIXME: add Email Template.
    try {
      await mailSender(
        email,
        "Aptitude Guru Hem",
        `<p>Account create Successfully. RMS`
      );
    } catch (error) {
      console.log("error in mail sending", error);
    }

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.error("Sign-up error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during sign-up",
    });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    // Generate a 6-digit OTP

    const otps = await otpModel.find({ email });
    let otp;
    do {
      otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    } while (otps.includes(otp));

    console.log("check");

    //TODO: define otp type as well

    await otpModel.create({
      email,
      otp,
    });

    // Log or save the OTP to your database
    console.log(`OTP ${otp} sent to ${email}`);

    return res.status(201).json({
      success: true,
      message: "OTP sent successfully.",
      otp, //TODO: You might not want to return the OTP in production
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again later.",
    });
  }
};
exports.studentRegistration = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      middleName,
      email,
      mobileNumber,
      mobilecountryCode,
      phoneNumber,
      phonecountryCode,
      address,
      tempaddress,
      gender,
      maritialInfo,
      dateofBirth,
      nationality,
      personalWebsite,
      linkedinProfile,
      emergencyContact,
      emergencyContactCode,
      emergencyContactPhone,
      schoolInfo,
      higherSchoolInfo,
      degree,
      educationLevel,
      hasGaps,
      haveGapsAfter12th,
      yearofexperience,
      isFresher,
      jobInfo,
      jobPreferances,
      resumeLink,
      workSampleLink,
      volunteerExprience,
      passportDetails,
      skills,
      visaInfo,
      trainingWorkShops,
      languages,
      resume,
      workSamples,
      awards,
      publications,
      hobbies,
      volunteerExperience,
    } = req.body;
    let currentAddress = "";
    if (!address) {
      currentAddress = await Address.create({
        street: address.street,
        state: address.state,
        city: address.city,
        zipcode: address.zipCode,
      });
    }
    let tempAddress = "";
    if (!tempaddress) {
      tempAddress = await Address.create({
        street: tempaddress.street,
        state: tempaddress.state,
        city: tempaddress.city,
        zipcode: tempaddress.zipCode,
      });
    }
    let schoolArray = [];
    let school = await School.create({
      schoolName: schoolInfo.school,
      yearofpassing: toString(schoolInfo.yearOfpassing.label),
      standard: "10th",
      board: schoolInfo.board.label,
      state: schoolInfo.state,
      city: schoolInfo.city,
      percentage: schoolInfo.cgpa,
    });
    let highschool = "";
    if (higherSchoolInfo) {
      highschool = await School.create({
        schoolName: higherSchoolInfo.school,
        yearofpassing: toString(higherSchoolInfo.yearOfpassing.label),
        standard: "12th",
        board: higherSchoolInfo.board.label,
        state: higherSchoolInfo.state,
        city: higherSchoolInfo.city,
        percentage: higherSchoolInfo.cgpa,
      });
    }
    schoolArray.push(school._id);
    schoolArray.push(highschool._id);
    let collegeArray = [];
    for (let i = 0; i < degree.length; i++) {
      let college = await College.create({
        collegeName: degree[i].institution,
        degree: degree[i].degreeType.label,
        yearofpassing: degree[i].graduationYear.label,
        state: degree[i].state,
        city: degree[i].city,
        country: degree[i].country,
        percentage: degree[i].cgpa,
        fieldOfStudy: degree[i].fieldOfStudy.label,
        gaps: degree[i].gaps,
        completionStatus: degree[i].completionStatus.label,
        completed: degree[i].completed,
        summary: degree[i].summary,
      });
      collegeArray.push(college._id);
    }

    const education = await educationalInfo.create({
      schoolInfo: schoolArray,
      collegeInfo: collegeArray,
      educationLevel: educationLevel.label,
      haveGaps: hasGaps,
    });
    const jobPrefe = await jobpreferances.create({
      preferredWorkingHours: jobPreferances.preferredWorkingHours,
      preferredCompanySize: jobPreferances.preferredCompanySize,
      preferredWorkEnvironment: jobPreferances.preferredWorkEnvironment,
      preferredRoleLevel: jobPreferances.preferredRoleLevel,
      preferredBenefits: jobPreferances.preferredBenefits,
      preferredCompanyCulture: jobPreferances.preferredCompanyCulture,
      positionAppliedFor: jobPreferances.positionAppliedFor,
      cities: jobPreferances.cities,
      state: jobPreferances.state,
      careerGoals: jobPreferances.careerGoals,
      additionalComments: jobPreferances.additionalComments,
      desiredIndustry: jobPreferances.desiredIndustry,
      currentEmploymentStatus: jobPreferances.currentEmploymentStatus,
      preferredJobType: toString(jobPreferances.preferredJobType),
      preferredCountry: jobPreferances.preferredCountry,
      minSalary: jobPreferances.minSalary,
      maxSalary: jobPreferances.maxSalary,
      availableToStart: jobPreferances.availableToStart,
      willingnessToRelocate: jobPreferances.willingnessToRelocate,
      willingnessToTravel: jobPreferances.willingnessToTravel,
    });
    let jobinfoList = [];
    for (let i = 0; i < jobInfo.length; i++) {
      const job = await jobinfo.create({
        Jobtitle: jobInfo[i].jobTitle,
        Company: jobInfo[i].company,
        employmentType: jobInfo[i].employmentType,
        startDate: jobInfo[i].startDate,
        endDate: jobInfo[i].endDate,
        achivements: jobInfo[i].responsibilities,
        reasonforLeavingPreviousJob: jobInfo[i].reasonForLeaving,
        previousSalary: jobInfo[i].salary,
      });
      jobinfoList.push(job._id);
    }

    let createPassport = "";
    if (createPassport) {
      createPassport = await passportinfo.create({
        passportNumber: passportDetails.passportNumber,
        passportImage: passportDetails.passportDocument,
      });
    }

    let visaList = [];
    if (visaInfo) {
      for (let i = 0; i < visaInfo.length; i++) {
        const createVisa = await visa.create({
          country: visaInfo[i].country,
          visaType: visaInfo[i].visaType,
          visaNumber: visaInfo[i].visaNumber,
          visaImage: visaInfo[i].visaDocument,
        });
        visaList.push(createVisa._id);
      }
    }
    let trainingWorkshopInfo = [];
    if (trainingWorkShops) {
      for (let i = 0; i < trainingWorkShops.length; i++) {
        const training = await trainingWorkshop.create({
          title: trainingWorkShops[i].title,
          type: trainingWorkShops[i].type,
          date: trainingWorkShops[i].date,
          description: trainingWorkShops[i].description,
        });
        trainingWorkshopInfo.push(training._id);
      }
    }

    let languagesInfo = [];
    if (languages) {
      for (let i = 0; i < languages.length; i++) {
        const langu = await Languages.create({
          language: languages[i].name,
          reading: languages[i].read,
          writing: languages[i].write,
          speaking: languages[i].speak,
        });
        languagesInfo.push(langu._id);
      }
    }

    const makeUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        mobileNumber: mobileNumber,
        mobilecountryCode: mobilecountryCode,
        phoneNumber: phoneNumber,
        phonecountryCode: phonecountryCode,
        active: true,
        address: currentAddress._id,
        tempAddress: tempAddress._id,
        gender,
        maritialInfo,
        dateofBirth,
        nationality,
        personalWebsite,
        linkedinProfile,
        emergencyContact,
        emergencyContactCode,
        emergencyContactPhone,
        educationalInfo: education._id,
        yearofexperience: yearofexperience,
        jobInfo: jobinfoList,
        isFresher,
        jobPreferances: jobPrefe._id,
        resumeLink: resume,
        workSampleLink: workSamples,
        volunteerExperience: volunteerExperience,
        publications,
        hobbies,
        awards,
        passportInfo: createPassport._id,
        visaInfo: visaList,
        skills: skills,
        trainingWorkShops: trainingWorkshopInfo,
        languages: languagesInfo,
        resumeLink: resume,
        completed: true,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      mesage: "Your details is updated successfully",
    });
  } catch (e) {
    console.log("registeration error", e);
    return res.status(404).json({
      success: false,
      message: "Something went wrong while posting the job",
    });
  }
};
