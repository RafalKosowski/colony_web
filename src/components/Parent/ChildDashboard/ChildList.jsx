// ChildList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext'; // Upewnij się, że ścieżka jest poprawna

const ChildList = () => {
  const { user } = useAuth(); // Pobieramy dane użytkownika z kontekstu
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const parentId = user?.id; // Zakładam, że idRodzica jest przechowywane w user.id

  useEffect(() => {
    const fetchChildren = async () => {
      if (!parentId) {
        console.log("Nie ma parrent ID");
        parentId = "1";
        //return; // Jeśli parentId nie jest dostępne, nie wykonuj zapytania
      }
      try {
        const response = await axios.get(`https://localhost:7290/api/Dziecko/rodzic/${parentId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Zakładając, że token jest w localStorage
          },
        });
        setChildren(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [parentId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h2>Lista Dzieci</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Data Urodzenia</th>
            <th>Kolonie</th>
          </tr>
        </thead>
        <tbody>
          {children.map(child => (
            <ChildRow key={child.id} childId={child.id} childName={child.imie} childSurname={child.nazwisko} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ChildRow = ({ childId, childName, childSurname }) => {
  const [colonies, setColonies] = useState([]);

  useEffect(() => {
    const fetchColonies = async () => {
      try {
        const response = await axios.get(`https://localhost:7290/api/KoloniaDziecko/dzieci/${childId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setColonies(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchColonies();
  }, [childId]);

  return (
    <tr>
      <td>{childName}</td>
      <td>{childSurname}</td>
      <td>{/* Możesz dodać datę urodzenia, jeśli chcesz */}</td>
      <td>
        <ul>
          {colonies.map(colony => (
            <li key={colony.idKolonii}>
              {colony.nazwaKolonii} - {colony.status}
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default ChildList;