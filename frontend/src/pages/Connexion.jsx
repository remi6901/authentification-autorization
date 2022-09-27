import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import GoHomeButton from "../components/GoHomeButton";

export default function Connexion() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    email: "mail@mail.com",
    password: "mail",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        ...formState,
        // Requete de connexion -> stocker le token dans le local storage -> ajouter le token dans les autorisations
        // -> rediriger l'utilisateur vers la page d'accueil
      })
      .then((response) => response.data)
      .then((data) => {
        window.localStorage.setItem("token", data.token);
        axios.defaults.headers.Authorization = `Bearer ${data.token}`;
        setIsAuthenticated(true);
      })
      /* .then(() => {
        const token = window.localStorage.getItem("token");
        console.log(token);
      }) */ // Nous permet d'afficher en clair le Token dans la console
      .then(() => navigate("/"));
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
