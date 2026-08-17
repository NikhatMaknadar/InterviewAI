import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Resume from "../pages/Resume/Resume";
import ResumeResult from "../pages/ResumeResult/ResumeResult";
import Interview from "../pages/Interview/Interview";
import InterviewReport from "../pages/InterviewReport/InterviewReport";
import History from "../pages/History/History";
import Profile from "../pages/Profile/Profile";
import ResumeManagement from "../pages/ResumeManagement/ResumeManagement";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/resume-result" element={<ResumeResult />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/interview-report" element={<InterviewReport />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resume-management" element={<ResumeManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
