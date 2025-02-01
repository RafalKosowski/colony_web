import React, { useState, useEffect } from "react";
import { fetchAllKolonie } from "../../../services/api"; // Import funkcji API
import { Table, Button, Spinner, Alert, Badge } from "react-bootstrap";
import { Navigate, useNavigate  } from 'react-router-dom';

const AdminColonyList = ({ token }) => {
  const [kolonie, setKolonie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadKolonie = async () => {
      try {
        const data = await fetchAllKolonie(token);
        setKolonie(data);
      } catch (err) {
        setError("Nie udało się załadować kolonii.");
      } finally {
        setLoading(false);
      }
    };

    loadKolonie();
  }, [token]);

  const getStatusLabel = (terminOd, terminDo) => {
    const today = new Date();
    const start = new Date(terminOd);
    const end = new Date(terminDo);

    if (end < today) return <Badge bg="secondary">Przeszła</Badge>;
    if (start > today && (start - today) / (1000 * 60 * 60 * 24) > 7)
      return <Badge bg="primary">Przyszła</Badge>;
    if (start > today) return <Badge bg="warning">Zbliżająca się</Badge>;

    return <Badge bg="success">Trwa</Badge>;
  };
  const handleEdit = (idKolonii) => {
    console.log(idKolonii);
    navigate(`/admin/colonies/edit/${idKolonii}`); // Przekierowanie do strony edycji
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2>Lista Kolonii (Admin)</h2>
      <Button variant="primary" className="mb-3" onClick={() => navigate("/admin/colonies/add")}>Dodaj Kolonię</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Data rozpoczęcia</th>
            <th>Data zakończenia</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {kolonie.length > 0 ? (
            kolonie.map(kolonia => (
              <tr key={kolonia.id}>
                <td>{kolonia.id}</td>
                <td>{kolonia.nazwa}</td>
                <td>{kolonia.terminOd}</td>
                <td>{kolonia.terminDo}</td>
                <td>{getStatusLabel(kolonia.terminOd, kolonia.terminDo)}</td>
                <td>
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleEdit(kolonia.id)}>
                    Edytuj
                  </Button>
                  <Button variant="danger" size="sm">
                    Usuń
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Brak kolonii do wyświetlenia.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminColonyList;