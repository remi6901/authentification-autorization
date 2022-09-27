import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function logout() {
  const { setCurrentUser } = useContext(CurrentUserContext);
  window.localStorage.removeItem("authToken");
  window.localStorage.removeItem("refreshToken");
  delete axios.defaults.headers.Authorization;
  setCurrentUser("toto");
}

function setAxiosToken(token) {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function authenticate(credentials) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, credentials)
    .then((response) => response.data)
    .then((data) => {
      // Stocker le token dans le local storage
      window.localStorage.setItem("authToken", data.token);
      window.localStorage.setItem("refreshToken", data.refreshtoken);
      // Prevenir Axios du header par défaut pour les futures requetes http
      setAxiosToken(data.token);
      setCurrentUser(jwtDecode(data.token));
      console.log(`toto${currentUser}`);
    });
}

function isCurrentUser() {
  // Vérifier la présence d'un token dans le localStorage
  const token = window.localStorage.getItem("authToken");

  // Vérifier si le token est toujours valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      const payload = jwtDecode(window.localStorage.getItem("authToken"));
      return payload;
    }
  }
}

function setup() {
  // Vérifier la présence d'un token dans le localStorage
  const token = window.localStorage.getItem("authToken");
  const refreshToken = window.localStorage.getItem("refreshToken");

  // Vérifier si le token est toujours valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
      isCurrentUser();
    } else if (refreshToken) {
      return axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/refreshToken`)
        .then((response) => response.data)
        .then((data) => {
          // Stocker le token dans le local storage
          window.localStorage.setItem("authToken", data.token);
          // Prevenir Axios du header par défaut pour les futures requetes http
          setAxiosToken(data.token);
        });
    }
  }
}

function isAuthenticated() {
  // Vérifier la présence d'un token dans le localStorage
  const token = window.localStorage.getItem("authToken");

  // Vérifier si le token est toujours valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated,
  isCurrentUser,
  setAxiosToken,
};
