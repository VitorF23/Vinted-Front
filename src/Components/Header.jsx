import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../img/logo.svg";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="div-header">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        <div className="input-articles">
          <input type="text" placeholder="Recherche des articles" />
        </div>
      </div>
      <div className="button-header">
        {token ? (
          <button
            className="button-déconnecter"
            onClick={() => {
              Cookies.remove("token");
              setToken("");
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link to="/signup">
              <button>S'inscrire</button>
            </Link>

            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </>
        )}
        <div className="header-vends">
          <Link to="/Publish">
            <button>Vends tes article</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
