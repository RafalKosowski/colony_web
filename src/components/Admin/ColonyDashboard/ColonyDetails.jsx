import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { fetchKoloniaDetails } from "../../../services/api";

const KoloniaDetails = () => {
  const { id } = useParams(); // Get Kolonia ID from URL
  const [kolonia, setKolonia] = useState(null);
  const { token } = useAuth();

  // Fetch Kolonia details on component mount or ID/token change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchKoloniaDetails(id, token); // Fetch Kolonia details
        setKolonia(data);
      } catch (error) {
        console.error("Error fetching Kolonia details:", error.message);
      }
    };

    fetchData();
  }, [id, token]);

  // Show loading spinner while data is being fetched
  if (!kolonia) {
    return (
      <div className="container mt-4 text-center">
        <Spinner animation="border" role="status" />
        <span className="ml-2">Ładowanie szczegółów kolonii...</span>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card>
        <Card.Header>
          <h3>{kolonia.nazwa}</h3>
        </Card.Header>
        <Card.Body>
          <p>{kolonia.opis}</p>
          <p><strong>Cena:</strong> {kolonia.cena} PLN</p>
          <p>
            <strong>Termin:</strong> {new Date(kolonia.terminOd).toLocaleDateString()} -{" "}
            {new Date(kolonia.terminDo).toLocaleDateString()}
          </p>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Firma:</strong> {kolonia.firma?.nazwa || "Brak danych"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Adres firmy:</strong>{" "}
              {kolonia.firma?.adres?.ulicaNazwa} {kolonia.firma?.adres?.nrDomu}/{kolonia.firma?.adres?.nrMiesz || ""}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Adres kolonii:</strong>{" "}
              {kolonia.adres?.ulicaNazwa} {kolonia.adres?.nrDomu}/{kolonia.adres?.nrMiesz || ""}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Rodzaj wypoczynku:</strong> {kolonia.forma?.rodzajWypoczynku || "Brak danych"}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default KoloniaDetails;
