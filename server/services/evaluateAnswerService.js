const { GoogleGenAI } = require("@google/genai");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const evaluateAnswer = async (question, answer) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are an experienced software interviewer.

Interview Question:

${question}

Candidate Answer:

${answer}

Evaluate the answer.

Return ONLY valid JSON.

{
  "score": 8,
  "strengths": [
    "...",
    "..."
  ],
  "weaknesses": [
    "...",
    "..."
  ],
  "correctAnswer": "...",
  "tips": [
    "...",
    "..."
  ]
}

Rules:

- Score must be between 1 and 10.
- Be fair.
- Give constructive feedback.
- Explain the ideal answer simply.
`;

  const models = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash",
  ];

  for (const model of models) {
    try {
      console.log(`Trying evaluation Gemini model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const cleaned = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const result = JSON.parse(cleaned);

      console.log(`Answer evaluation successful using: ${model}`);

      return result;
    } catch (error) {
      const status = error.status || error.code;

      console.error(
        `Evaluation Gemini model ${model} failed with status: ${status}`,
      );

      // Try another model for temporary availability/quota errors
      if (status === 429 || status === 503 || status === 500) {
        console.log("Trying next Gemini fallback model...");
        await sleep(1000);
        continue;
      }

      // Invalid JSON or another unexpected error
      throw error;
    }
  }

  const evaluationError = new Error(
    "AI evaluation is temporarily unavailable. Gemini models are currently unavailable or the API quota has been exceeded. Please try again later.",
  );

  evaluationError.status = 503;

  throw evaluationError;
};

module.exports = {
  evaluateAnswer,
};
