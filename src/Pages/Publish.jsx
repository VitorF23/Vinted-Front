import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const navigate = useNavigate();

  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [etat, setEtat] = useState("");
  const [lieu, setLieu] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("article", article);
    formData.append("marque", marque);
    formData.append("taille", taille);
    formData.append("couleur", couleur);
    formData.append("etat", etat);
    formData.append("lieu", lieu);
    formData.append("price", price);
    // formData.append("user", token);

    try {
      if (
        picture &&
        title &&
        article &&
        marque &&
        taille &&
        couleur &&
        etat &&
        lieu &&
        price
      ) {
        const { data } = await axios.post(
          "https://site--vinted-backend--ptd8p9px9d2y.code.run/offer/publish",
          formData,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("data>>>>>", data);
        alert("Votre annonce a bien été créée.");
        navigate("/");
      } else {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      console.log("catch>>>>>>>>>", error);
    }
  };

  return token ? (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="main">
            <div className="title">
              <h1>Vends ton article</h1>
            </div>
            <div className="publish">
              <div className="publish-photo">
                <label htmlFor="picture">
                  <input
                    type="file"
                    name="picture"
                    id="picture"
                    placeholder="+ Ajoute une photo"
                    onChange={(event) => {
                      setErrorMessage("");
                      setPicture(event.target.files[0]);
                    }}
                  />
                  <span className="picture">+ Ajoute une photo</span>
                </label>
              </div>
              {picture && (
                <img src={URL.createObjectURL(picture)} alt="picture" />
              )}
            </div>
            <div className="publish-title">
              <div>
                <h1>Title</h1>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  placeholder="ex: Chemise Sézane verte"
                  onChange={(event) => {
                    setErrorMessage("");
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div>
                <h1>Déscris ton article</h1>
                <input
                  type="text"
                  name="article"
                  id="article"
                  value={article}
                  placeholder="ex:porté quelquefois,taille correctement"
                  onChange={(event) => {
                    setErrorMessage("");
                    setArticle(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="publish-info">
              <div>
                <h1>Marque</h1>
                <input
                  type="text"
                  name="marque"
                  id="marque"
                  value={marque}
                  placeholder="ex:Zara"
                  onChange={(event) => {
                    setErrorMessage("");
                    setMarque(event.target.value);
                  }}
                />
              </div>
              <div>
                <h1>Taille</h1>
                <input
                  type="text"
                  name="taille"
                  id="taille"
                  value={taille}
                  placeholder="ex: L / 40 / 12"
                  onChange={(event) => {
                    setErrorMessage("");
                    setTaille(event.target.value);
                  }}
                />
              </div>
              <div>
                <h1>Couleur</h1>
                <input
                  type="text"
                  name="couleur"
                  id="couleur"
                  value={couleur}
                  placeholder="ex: Fushia"
                  onChange={(event) => {
                    setErrorMessage("");
                    setCouleur(event.target.value);
                  }}
                />
              </div>
              <div>
                <h1>Etat</h1>
                <input
                  type="text"
                  name="etat"
                  id="etat"
                  value={etat}
                  placeholder="Neuf avec étiquette"
                  onChange={(event) => {
                    setErrorMessage("");
                    setEtat(event.target.value);
                  }}
                />
              </div>
              <div>
                <h1>Lieu</h1>
                <input
                  type="text"
                  name="lieu"
                  id="lieu"
                  value={lieu}
                  placeholder="ex: Paris"
                  onChange={(event) => {
                    setErrorMessage("");
                    setLieu(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="publish-prix">
              <h1>Prix</h1>
              <div className="input">
                <input
                  type="text"
                  name="prix"
                  id="prix"
                  value={price}
                  placeholder="0,00 €"
                  onChange={(event) => {
                    setErrorMessage("");
                    setPrice(event.target.value);
                  }}
                />
                <div className="publish-checkbox">
                  <input type="checkbox" /> Je suis intéresse(e) par les
                  échanges
                </div>
              </div>
            </div>
          </div>
          <div className="publish-button">
            <button type="submit">Ajouter</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </form>
    </main>
  ) : (
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default Publish;
