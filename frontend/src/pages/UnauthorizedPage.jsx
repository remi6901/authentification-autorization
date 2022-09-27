import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <>
      <h2>Accès non autorisé</h2>
      <p>
        Vous n'êtes pas autorisé à accéder à cette page. Vous allez
        automatiquement être redirigé vers la page d'accueil
      </p>
    </>
  );
}
