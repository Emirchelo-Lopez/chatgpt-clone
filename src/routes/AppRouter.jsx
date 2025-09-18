import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ChatPage from "../pages/ChatPage/ChatPage";
import NotFoundPage from "../pages/NotFound/NotFound";
import LandingPage from "../pages/LandingPage/LandingPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import ChatPageIntermediate from "../components/ChatPageIntermediate";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/start" element={<HomePage />} />
          <Route path="/chat/:chatId" element={<ChatPageIntermediate />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
