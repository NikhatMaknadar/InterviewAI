const { GoogleGenAI } = require("@google/genai");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const analyzeInterviewQuestions = async (resumeAnalysis) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are an experienced technical interviewer.

The candidate is:

- A Fresher
- Recently completed BCA
- Applying for MERN Stack / Full Stack Developer roles
- Has experience only through academic and personal projects

Below is the AI analysis of the candidate's resume:

${JSON.stringify(resumeAnalysis)}

Generate ONLY valid JSON in the following format:

{
  "technical": [
    "...",
    "...",
    "...",
    "...",
    "..."
  ],

  "hr": [
    "...",
    "...",
    "..."
  ],

  "coding": [
    "...",
    "..."
  ]
}

Rules:

- Difficulty: Easy to Medium
- Ask beginner-friendly interview questions.
- Focus on JavaScript, React.js, Node.js, Express.js, MongoDB, HTML, CSS, Git and REST APIs.
- Include questions based on the candidate's projects.
- Do NOT ask system design, distributed systems, Kubernetes, microservices, DevOps, cloud architecture or senior-level questions.
- HR questions should be suitable for freshers.
- Coding questions should be simple DSA or JavaScript coding questions asked in fresher interviews.
- Questions should resemble interviews conducted by TCS, Infosys, Wipro, Cognizant, Capgemini, Accenture and startups.
- Return ONLY valid JSON. Do not include markdown or explanations.
`;

  const models = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash",
  ];

  for (const model of models) {
    try {
      console.log(`Trying interview Gemini model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const cleanedText = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const result = JSON.parse(cleanedText);

      console.log(`Interview questions generated successfully using: ${model}`);

      return result;
    } catch (error) {
      const status = error.status || error.code;

      console.error(
        `Interview Gemini model ${model} failed with status: ${status}`,
      );

      if (status === 503 || status === 429 || status === 500) {
        console.log("Trying next Gemini fallback model...");
        await sleep(1000);
        continue;
      }

      throw error;
    }
  }

  throw new Error(
    "All Gemini models are temporarily unavailable. Please try again later.",
  );
};

module.exports = {
  analyzeInterviewQuestions,
};
