const Resume = require("../models/Resume");
const { extractTextFromPDF } = require("../services/pdfService");
const uploadResume = async (req, res) => {
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,

        message: "Please upload PDF",
      });
    }

    const resume = await Resume.create({
      user: req.user.id,

      fileName: req.file.originalname,

      filePath: req.file.path,
    });

    const extractedText = await extractTextFromPDF(req.file.path);

    resume.extractedText = extractedText;

    await resume.save();

    res.status(201).json({
      success: true,

      message: "Resume Uploaded Successfully",

      resume,

      extractedText,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Server Error",
    });
  }
};

module.exports = {
  uploadResume,
};
