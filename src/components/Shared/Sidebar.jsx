import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ width: "250px", height: "100vh" }}>
      <h4>Menu</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
        <li><Link className="nav-link" to="/colonies">Kolonie</Link></li>
        <li><Link className="nav-link" to="/payments">Płatności</Link></li>
        <li><Link className="nav-link" to="/account">Konto</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;