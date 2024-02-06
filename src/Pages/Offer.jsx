import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Offer = ({ product, token }) => {
  const { id } = useParams();

  return (
    <>
      <section>
        {product.map((offer, index) => {
          return (
            offer._id === id && (
              <div key={index} className="offer">
                <div className="img-taille">
                  <img src={offer.product_pictures} alt="photo" />
                </div>
                <div className="product">
                  <div className="price">
                    <p>{offer.product_price} €</p>
                  </div>
                  <div>
                    {offer.product_details.map((details, index) => {
                      return (
                        <div key={index} className="details">
                          {details.MARQUE && (
                            <p>
                              <span>Marque</span> {details.MARQUE}
                            </p>
                          )}
                          {details.TAILLE && (
                            <p>
                              <span>Taille</span> {details.TAILLE}
                            </p>
                          )}
                          {details.ÉTAT && (
                            <p>
                              <span>État</span> {details.ÉTAT}
                            </p>
                          )}
                          {details.COULEUR && (
                            <p>
                              <span>Couleur</span> {details.COULEUR}
                            </p>
                          )}
                          {details.EMPLACEMENT && (
                            <p>
                              <span>Emplacement</span> {details.EMPLACEMENT}
                            </p>
                          )}
                        </div>
                      );
                    })}
                    <div>
                      <p>{offer.product_name}</p>
                    </div>
                    <div>
                      <p>{offer.product_description}</p>
                    </div>
                    <div className="avatar-offer">
                      {offer.owner.account.avatar && (
                        <img
                          className=""
                          src={offer.owner.account.avatar.secure_url}
                          alt="avatar"
                        />
                      )}
                      <p>{offer.owner.account.username}</p>
                    </div>
                    <div className="button-offer">
                      {token ? (
                        <Link
                          to="/Payment"
                          state={{
                            prix: offer.product_price,
                            title: offer.product_name,
                          }}
                        >
                          <button>Acheter</button>
                        </Link>
                      ) : (
                        <Link to="/login">
                          <button>Se connecter</button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </section>
    </>
  );
};

export default Offer;
