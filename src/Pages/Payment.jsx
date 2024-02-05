import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Ofky3HgGsgIhLn7M25JnL5DBF8Zx8JsWEugy7EbOn8GJUYXSlyazl7VfzQ3JooJAGXW8o6DiqYJDRNLpOJYlsAt00iudnZHGV"
);

const Payment = ({ token }) => {
  const location = useLocation();
  const { prix, title } = location.state || { prix: 0, title: "" };
  const buyerProtection = 1.0;
  const fraisDePort = 2.0;
  const totalPrix = (prix + buyerProtection + fraisDePort).toFixed(2);

  return (
    <div className="payment">
      <div>
        <p>Résumé de la commande</p>
      </div>

      <div className="payment-frais">
        <div>
          <h1>Commande</h1>
          <span>{prix} €</span>
        </div>
        <div>
          <h1>Frais protection acheteurs</h1>
          <span>{buyerProtection} €</span>
        </div>
        <div>
          <h1>Frais de port</h1>
          <span>{fraisDePort} €</span>
        </div>
      </div>

      <div className="payment-frais">
        <div>
          <h1>Total</h1>
          <span>{totalPrix}</span>
        </div>
      </div>

      <div className="payment-color">
        <p>
          Il ne vous reste plus qu'une étape pour vous offrir{" "}
          <span>{title}</span>. Vous allez payer <span>{totalPrix} €</span>{" "}
          (frais de protection et frais de port inclus).
        </p>
      </div>

      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm totalPrix={totalPrix} title={title} token={token} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
