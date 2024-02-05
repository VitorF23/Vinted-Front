import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const SignupData = async () => {
    try {
      if (username && email && password) {
        const response = await axios.post(
          "https://site--vinted-backend--ptd8p9px9d2y.code.run/user/signup",
          {
            username,
            email,
            password,
            newsletter,
          }
        );

        if (response.status !== 200) {
          console.error(response.message);
          return;
        }
        // console.log("signup==>>>", response.data);
        Cookies.set("token", response.data.token, { secure: true });
        setToken(response.data.token);
        alert("Your account has been successfully created");
        navigate("/");
        setError(null);
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="signup-ins">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await SignupData();
          }}
        >
          <h1>S'inscrire</h1>
          <input
            type="text"
            placeholder="Nom d'utilizateur"
            value={username}
            onChange={(event) => {
              setErrorMessage("");
              setUserName(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setErrorMessage("");
              setEmail(event.target.value);
            }}
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setErrorMessage("");
              setPassword(event.target.value);
            }}
          />
          <label>
            <input
              type="checkbox"
              checked={newsletter}
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
            S'inscrire à notre newsletter
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </label>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div>
            <button type="submit">S'inscrire</button>
          </div>
        </form>

        {error && <p className="error-message">{error}</p>}
        <div className="signup-connecte-toi">
          <Link to="/login">
            <p>Tu as déjà un compte ? Connecte-toi !</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
