import React, { createContext, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = "https://localhost:7290"; // Adres zapisany w zmiennej
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const navigate = useNavigate();

  // Pobranie poziomu uprawnień użytkownika
  const fetchUserRole = async (token) => {
    try {
      const response = await fetch(`${API_URL}/api/Konto/poziom-uprawnien`, {
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
      });

      if (!response.ok) throw new Error("Błąd pobierania uprawnień");

      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      // Przekierowanie użytkownika na odpowiedni dashboard
      if (data.nazwa === "Administrator") {
        console.log("Przekierowanie na dashboard admina");
        navigate("/admin/dashboard");
      } else if (data.nazwa === "Rodzic") {
        navigate("/parent/dashboard");
      } else {
        throw new Error("Nieznana rola użytkownika");
      }
    } catch (error) {
      console.error("Błąd pobierania uprawnień:", error.message);
      logout();
    }
  };

  // Logowanie użytkownika
  const login = async (email, haslo) => {
    try {
      const response = await fetch(`${API_URL}/api/Auth/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, haslo }),
      });
  
      if (!response.ok) throw new Error("Nieprawidłowe dane logowania");
  
      const data = await response.json();
      localStorage.setItem("jwt", data.token);
      setToken(data.token);
  
      // Pobranie poziomu uprawnień
      await fetchUserRole(data.token);
    } catch (error) {
      console.error("Błąd logowania:", error.message);
      throw error; // Przekazuje błąd do LoginForm
    }
  };

  // Wylogowanie
  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  
  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;