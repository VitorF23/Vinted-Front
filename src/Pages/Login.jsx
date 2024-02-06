import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const onChange = (event, target) => {
    if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    }
  };

  const LoginData = async (email, password) => {
    try {
      if (email && password) {
        const response = await axios.post(
          "https://site--vinted-backend--ptd8p9px9d2y.code.run/user/login",
          { email, password }
        );

        Cookies.set(
          "token",
          response.data.token,
          { expires: 1 },
          { secure: true }
        );
        console.log(response.data);
        setToken(response.data.token);
        navigate("/");
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log("catch = login", error.response);
    }
  };

  return (
    <div className="main-login">
      <div className="login">
        <h1>Se connecter</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            LoginData(email, password);
          }}
        >
          <input
            type="email"
            placeholder="Adresse email"
            onChange={(event) => {
              onChange(event, "email");
              setErrorMessage("");
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              onChange(event, "password");
              setErrorMessage("");
              setPassword(event.target.value);
            }}
          />
          <div className="login-button">
            <button type="submit">Se connecter</button>
          </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="login-inscris-toi">
          <Link to="/signup">
            <h1>Pas encore de compte ? Inscris-toi !</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
