import React, { useEffect, useState } from "react";
import { Table, Card, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { fetchKolonie } from "../../services/api"; // Importujemy funkcję

const Dashboard = () => {
  const [kolonie, setKolonie] = useState([]);
  const { token } = useAuth();

  // Pobranie danych o nadchodzących koloniach
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchKolonie(token); // Używamy funkcji fetchKolonie
        setKolonie(data);
      } catch (error) {
        console.error("Błąd:", error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    
    <div className="container mt-4">
      <Card>
        <Card.Header>
          <h3>Nadchodzące Kolonie</h3>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Opis</th>
                <th>Termin</th>
                <th>Liczba zapisanych osób</th>
              </tr>
            </thead>
            <tbody>
              {kolonie.map((kolonia) => (
                <tr key={kolonia.id}>
                  <td>
                    <Link to={`/admin/colony/${kolonia.id}`}>{kolonia.nazwa}</Link>
                  </td>
                  <td>{kolonia.opis}</td>
                  <td>
                    {new Date(kolonia.terminOd).toLocaleDateString()} -{" "}
                    {new Date(kolonia.terminDo).toLocaleDateString()}
                  </td>
                  <td>—</td> {/* Możesz dodać logikę dla liczby zapisanych osób */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
