import GoHomeButton from "@components/GoHomeButton";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`)
      .then((response) => response.data)
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <GoHomeButton />

      <p>Page qui ne doit être accessible que par les rôles administrateurs</p>
      <h2>Liste des utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
