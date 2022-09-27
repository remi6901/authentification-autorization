import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import GoHomeButton from "@components/GoHomeButton";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AuthContext from "../contexts/AuthContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Connexion() {
  const [formState, setFormState] = useState({
    email: "a@a.com",
    password: "toto",
  });

  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, formState)
      .then((response) => response.data)
      .then((data) => {
        // Stocker le token dans le local storage
        window.localStorage.setItem("authToken", data.token);
        window.localStorage.setItem("refreshToken", data.refreshtoken);
        // Prevenir Axios du header par défaut pour les futures requetes http
        axios.defaults.headers.Authorization = `Bearer ${data.token}`;
        setCurrentUser(jwtDecode(data.token));
      })
      .then(() => {
        setIsAuthenticated(true);
        navigate("/");
      })

      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <GoHomeButton />
      <h2>Formulaire de connexion</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="email"
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formState.password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
        <input type="submit" />
      </form>
    </>
  );
}
