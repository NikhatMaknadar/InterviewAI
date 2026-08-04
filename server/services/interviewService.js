const { GoogleGenAI } = require("@google/genai");

const analyzeInterviewQuestions = async (resumeAnalysis) => {
  try {
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

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Interview Generation Error:", error);
    throw error;
  }
};

module.exports = {
  analyzeInterviewQuestions,
};
