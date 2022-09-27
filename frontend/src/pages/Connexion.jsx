import { useState } from "react";
import GoHomeButton from "@components/GoHomeButton";

export default function Connexion() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Requete de connexion -> stocker le token dans le local storage -> ajouter le token dans les autorisations
    // -> rediriger l'utilisateur vers la page d'accueil
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
