import axios from 'axios';

const API_URL = 'https://localhost:7290/api';

// export const getChildrenByParent = async (idRodzica, token) => {
//   try {
//     const response = await axios.get(`${API_URL}/KoloniaDziecko/dzieci/${idRodzica}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: '*/*',
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Błąd pobierania listy dzieci:', error);
//     return [];
//   }
// };



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



  