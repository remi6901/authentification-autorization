import { useEffect } from "react";
import GoHomeButton from "@components/GoHomeButton";

export default function Profile() {
  useEffect(() => {
    // Appeler les infos du user avec l'id récupéré dans un contexte
  });

  return (
    <>
      <GoHomeButton />
      <p>Page qui ne peut être accessible que par le user concerné</p>
      <h2>My profile</h2>
      <p>Hello, this is my page</p>
      <p>Nom de famille : </p>
      <p>Prénom : </p>
      <p>Email : </p>
      <p>Ville : </p>
    </>
  );
}
