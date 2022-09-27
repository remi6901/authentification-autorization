import { useContext, useEffect, useState } from "react";
import GoHomeButton from "@components/GoHomeButton";
import axios from "axios";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Profile() {
  const { currentUser } = useContext(CurrentUserContext);

  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${currentUser.sub}`)
      .then((res) => res.data)
      .then((data) => setUser(data), setLoading(false));
  }, [currentUser]);

  if (loading) {
    return "En cours de chargement";
  }

  return (
    <>
      <GoHomeButton />
      <p>Page qui ne peut être accessible que par le user concerné</p>
      <h2>My profile</h2>
      <p>Hello, this is my page</p>
      <p>Nom de famille : {user.lastname}</p>
      <p>Prénom : {user.firstname}</p>
      <p>Email : {user.email}</p>
      <p>Ville : {user.city}</p>
    </>
  );
}
