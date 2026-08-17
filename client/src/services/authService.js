import api from "./api";

// ===============================
// Register User
// ===============================
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// ===============================
// Login User
// ===============================
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// ===============================
// Get Current User Profile
// ===============================
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// ===============================
// Update Current User Profile
// ===============================
export const updateProfile = async (userData) => {
  const response = await api.put("/auth/profile", userData);
  return response.data;
};
