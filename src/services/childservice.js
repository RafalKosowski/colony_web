import axios from "axios";

const API_URL = "https://localhost:7290/api";

// Pobierz id rodzica na podstawie id konta
export const getParentByAccountId = async (accountId, token) => {
  try {
    const response = await axios.get(`${API_URL}/Rodzic/ByKonto/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });
    console.log("Dane rodzica:", response.data); 
    return response.data; // Zwraca pełne dane rodzica
  } catch (error) {
    console.error("Błąd pobierania danych rodzica:", error);
    return null;
  }
};

// Pobierz dzieci dla danego rodzica
export const getChildrenWithColonies = async (parentId, token) => {
  try {
    const response = await axios.get(`${API_URL}/KoloniaDziecko/dzieci/${parentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Błąd pobierania danych dzieci:", error);
    return [];
  }
};
