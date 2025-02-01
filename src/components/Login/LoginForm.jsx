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
      navigate("/admin/dashboard"); // redirect after successful login
    } catch (err) {
      setError("Nieprawidłowe dane logowania!");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        <h1 className="text-center mb-4">Zaloguj się</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="haslo" className="form-label">Hasło</label>
            <input
              type="password"
              id="haslo"
              className="form-control"
              placeholder="Hasło"
              value={haslo}
              onChange={(e) => setHaslo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Zaloguj</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
