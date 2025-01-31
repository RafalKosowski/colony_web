import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [haslo, setHaslo] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, haslo);
    } catch (err) {
      setError("Nieprawidłowe dane logowania!");
    }
  };

  return (
    <div className="login-form">
      <h1>Zaloguj się</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Hasło"
          value={haslo}
          onChange={(e) => setHaslo(e.target.value)}
          required
        />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
}

export default LoginForm;
