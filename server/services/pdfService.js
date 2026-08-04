const fs = require("fs");
const pdf = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);

  const data = await pdf(dataBuffer);

  console.log("Extracted text length:", data.text.length);

  return data.text;
};

module.exports = {
  extractTextFromPDF,
};
