import axios from 'axios';

const API_URL = 'https://localhost:7290/api';
const token = localStorage.getItem('token');

// 🏕 Pobranie wszystkich kolonii (przeszłe + przyszłe)
export const fetchAllKolonie = async (token) => {
  try {
    const response = await fetch(`${API_URL}/Kolonia/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("Błąd podczas pobierania wszystkich kolonii");
    return await response.json();
  } catch (error) {
    console.error("Błąd:", error.message);
    throw error;
  }
};

// 🏕 Pobranie przyszłych kolonii
export const fetchKolonie = async (token) => {
  try {
    const response = await fetch(`${API_URL}/Kolonia/future`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("Błąd podczas pobierania przyszłych kolonii");
    return await response.json();
  } catch (error) {
    console.error("Błąd:", error.message);
    throw error;
  }
};

// 🏕 Pobranie szczegółów kolonii
export const fetchKoloniaDetails = async (id, token) => {
  if (!token) throw new Error("Brak tokenu. Proszę się zalogować.");

  try {
    const response = await fetch(`${API_URL}/Kolonia/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || "Błąd podczas pobierania szczegółów kolonii");
    }

    return await response.json();
  } catch (error) {
    console.error("Błąd:", error.message);
    throw new Error(error.message || "Nieznany błąd");
  }
};

// 🏕 Dodawanie kolonii
export const addColony = async (colonyData, token) => {
  try {
    const response = await fetch(`${API_URL}/Kolonia`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colonyData),
    });

    if (!response.ok) throw new Error("Błąd podczas dodawania kolonii");
    return await response.json();
  } catch (error) {
    console.error("Błąd:", error.message);
    throw error;
  }
};

// 🏕 Edytowanie kolonii
export const updateColony = async (id, updatedData, token) => {
  try {
    const response = await fetch(`${API_URL}/Kolonia/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("Błąd podczas edytowania kolonii");
    return await response.json();
  } catch (error) {
    console.error("Błąd:", error.message);
    throw error;
  }
};

// 🏕 Usuwanie kolonii
export const deleteColony = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/Kolonia/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("Błąd podczas usuwania kolonii");
    return await response.json();
  } catch (error) {
    console.error("Błąd:", error.message);
    throw error;
  }
};

// 🏕 Pobranie wszystkich grup (ADMIN)
export const fetchGrupy = async (token) => {
  try {
    const response = await fetch(`${API_URL}/GrupaCRUD`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("Błąd podczas pobierania grup");
    return await response.json();
  } catch (error) {
    console.error("Błąd:", error.message);
    throw error;
  }
};

// 🏕 Pobranie grup dla danej kolonii (ADMIN)
export const fetchGrupyByKolonia = async (koloniaId, token) => {
  try {
    const allGroups = await fetchGrupy(token);
    return allGroups.filter(group => group.koloniaId === koloniaId);
  } catch (error) {
    console.error("Błąd:", error.message);
    return [];
  }
};

// 🏕 Pobranie grup dla danej kolonii z liczbą wolnych miejsc (ADMIN)
export const fetchGrupyWolneMiejsca = async (koloniaId, token) => {
  try {
    const response = await fetch(`${API_URL}/Grupa/kolonia/${koloniaId}/wolne-miejsca`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("Błąd podczas pobierania grup z wolnymi miejscami");
    return await response.json();
  } catch (error) {
    console.error("Błąd:", error.message);
    throw error;
  }
};

export const getColony = async (colonyId, token) => {
  try {
    const response = await axios.get(`${API_URL}/Kolonia/${colonyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching colony:', error);
    throw error;
  }
};

export const saveColony = async (colonyData, token, colonyId = null) => {
  try {
    const url = colonyId ? `${API_URL}/Kolonia/${colonyId}` : `${API_URL}/Kolonia`;
    const method = colonyId ? 'put' : 'post';

    const response = await axios({
      method: method,
      url: url,
      headers: { Authorization: `Bearer ${token}` },
      data: colonyData,
    });

    return response.data;
  } catch (error) {
    console.error('Error saving colony:', error);
    throw error;
  }
};