import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../services/AuthAPI";

export default function Home() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
    AuthAPI.logout();
  };

  return (
    <header className="App-header">
      <nav>
        <ul>
          <Link to="/">
            <li>Accueil - accessible par tous les visiteurs</li>
          </Link>
          {!isAuthenticated && (
            <Link to="/login">
              <li>Connexion</li>
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/signup">
              <li>Inscription</li>
            </Link>
          )}
          {isAuthenticated && (
            <>
              <Link to="/movies">
                <li>
                  Films -{" "}
                  <em>accessible par tous les utilisateurs connectés</em>
                </li>
              </Link>
              <Link to="/users">
                <li>
                  Utilisateurs - <em>accessible par les comptes admin</em>
                </li>
              </Link>
              <Link to="/my-profile">
                <li>
                  Mon profil -{" "}
                  <em>accessible que par l'utilisateur connecté concerné</em>
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>
      <button type="button" onClick={() => handleLogout()}>
        Deconnexion
      </button>
    </header>
  );
}
