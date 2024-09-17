const Company = require("../model/Company");
const User = require("../model/User");
const Job = require("../model/job");
//job posted by
exports.postJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const findCompany = await Company.findById({ userId });
    if (!findCompany) {
      return res.status(404).json({
        success: false,
        message: "You are coming into the wrong login page",
      });
    }
    const { skills, package, jobLocation } = req.body;
    const createdJob = await Job.create({
      company: userId,
      skills: skills,
      package: package,
      jobLocation: jobLocation,
      dataandtime: new Date(),
      status: true,
    });
    await Company.findByIdAndUpdate(
      { _id: userId },
      { $push: { jobsPosted: createdJob._id } },
      { new: true }
    );
    const getAllStudents = await User.find({});
    for (const student of getAllStudents) {
      const user = await User.findById(student._id)
        .populate("notificationPreferances")
        .exec();

      const getnotificationArray = user.notificationPreferances;

      const filteredNotifications = getnotificationArray.filter(
        (notification) => {
          const isCompanyMatch =
            criteria.company === undefined ||
            notification.company === criteria.company;
          const isRoleMatch =
            criteria.role === undefined || notification.role === criteria.role;
          const isSalaryMatch =
            criteria.salary === undefined ||
            parseInt(notification.salary) >= criteria.salary;

          return isCompanyMatch && isRoleMatch && isSalaryMatch;
        }
      );

      if (filteredNotifications.length > 0) {
        await User.findByIdAndUpdate(
          student._id,
          { $push: { notification: createdJob._id } },
          { new: true }
        ).exec();
      }
    }
    return res.status(200).json({
      success: true,
      message: "Job posted successfully",
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong while posting the job",
    });
  }
};
exports.updateJobFunction = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id;
    const findCompany = await Company.findById({ userId });
    if (!findCompany) {
      return res.status(404).json({
        success: false,
        message: "You are coming into the wrong login page",
      });
    }
    const updateJob = await Job.findByIdAndUpdate(
      { _id: jobId },
      { status: false },
      { new: true }
    );
    if (!updateJob) {
      return res.status(404).json({
        success: false,
        message: "Sorry something went wrong in updating the job",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong while posting the job",
    });
  }
};

exports.getAllApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;
    const findCompany = await Company.findById({ userId });
    if (!findCompany) {
      return res.status(404).json({
        success: false,
        message: "You are coming into the wrong login page",
      });
    }
    const findJob = await Company.find(
      { userId },
      {
        jobsPosted: { $eq: jobId },
      }
    );
    if (!findJob) {
      return res.status(404).json({
        success: false,
        message: "Sorry cannot show you these details",
      });
    }
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong while posting the job",
    });
  }
};
