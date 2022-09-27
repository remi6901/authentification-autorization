import axios from "axios";
import { useEffect, useState } from "react";
import GoHomeButton from "@components/GoHomeButton";

export default function Movies() {
  const [movies, setMovies] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/movies`)
      .then((response) => response.data)
      .then((data) => setMovies(data));
  }, []);

  return (
    <>
      <GoHomeButton />
      <p>Page pouvant être accessible par tous les users</p>
      <h2>Liste de films</h2>
      <ul>
        {movies &&
          movies.map((movie) => (
            <li key={movie.id}>
              <p>{movie.title}</p>
              <p>{movie.director}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
