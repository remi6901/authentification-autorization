import Connexion from "@pages/Connexion";
import Home from "@pages/Home";
import SignUp from "@pages/SignUp";
import Movies from "@pages/Movies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "@pages/Users";
import AuthAPI from "@services/AuthAPI";
import Profile from "@pages/Profile";
import UnauthorizedPage from "@pages/UnauthorizedPage";

AuthAPI.setup();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/" element={<Connexion />} />
        <Route path="/signup/" element={<SignUp />} />
        <Route path="/movies/" element={<Movies />} />
        <Route path="/users/" element={<Users />} />
        <Route path="/my-profile/" element={<Profile />} />
        <Route path="/unauthorized/" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
