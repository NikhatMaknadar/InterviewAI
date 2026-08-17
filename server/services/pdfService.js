const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);

    console.log("PDF size:", dataBuffer.length, "bytes");

    const parser = new PDFParse({
      data: dataBuffer,
    });

    const result = await parser.getText();

    await parser.destroy();

    console.log("Extracted text length:", result.text.length);

    return result.text;
  } catch (error) {
    console.error("PDF Extraction Error:", error.message);

    throw new Error(
      "Unable to read this PDF. Please upload a valid PDF resume.",
    );
  }
};

module.exports = {
  extractTextFromPDF,
};
