import { Link } from "react-router-dom";

export default function GoHomeButton() {
  return (
    <Link to="/">
      <button type="button">Retour à l'accueil</button>
    </Link>
  );
}
