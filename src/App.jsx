import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/pages/login/Login";
import Profile from "./components/pages/profile/Profile";
import "../src/App.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      ``
    </Routes>
  );
};

export default App;
