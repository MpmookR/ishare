import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

function App() {
  return (
    <Routes>
      {/* Protected homepage */}
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />

      {/* Public auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
