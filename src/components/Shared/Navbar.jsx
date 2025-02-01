import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">KolonieApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                {/* Linki dostępne dla wszystkich zalogowanych użytkowników */}
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>

                {/* Linki dla rodzica */}
                {user?.nazwa === "Rodzic" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/parent/children">Dzieci</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/parent/payments">Płatności</Link>
                    </li>
                  </>
                )}

                {/* Linki dla administratora */}
                {user?.nazwa === "Administrator" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/colonies">Kolonie</Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link className="nav-link" to="/admin/payments">Płatności</Link>
                    </li> */}
                  </>
                )}

                {/* Przyciski dostępne dla wszystkich zalogowanych */}
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;