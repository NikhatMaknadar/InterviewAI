import api from "./api";

// ===============================
// Start Interview
// ===============================
export const startInterview = async (resumeId, interviewType = "Mixed") => {
  const response = await api.post("/interview/start", {
    resumeId,
    interviewType,
  });

  return response.data;
};

// ===============================
// Submit Answer
// ===============================
export const submitAnswer = async (interviewId, questionId, answer) => {
  const response = await api.post("/answer", {
    interviewId,
    questionId,
    answer,
  });

  return response.data;
};

// ===============================
// Get Interview Report
// ===============================
export const getInterviewReport = async (interviewId) => {
  const response = await api.get(`/report/${interviewId}`);

  return response.data;
};

// ===============================
// Get Interview History
// ===============================
export const getInterviewHistory = async () => {
  const response = await api.get("/interview/history");

  return response.data;
};
