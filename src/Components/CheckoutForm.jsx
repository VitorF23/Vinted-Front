import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ token, title, totalPrix }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setErrorMessage("Le champ de carte n'est pas valide");
      return;
    }

    const stripeResponse = await stripe.createToken(cardElement, {
      name: token,
    });

    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      "https://site--vinted-backend--ptd8p9px9d2y.code.run/payment",
      {
        stripeToken,
        totalPrix,
        title,
      }
    );

    if (response.data.status === "succeeded") {
      setCompleted(true);
    } else {
      setErrorMessage(response.data.status);
    }
  };

  return !completed ? (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="button-valider">Valider</button>
    </form>
  ) : (
    <span className="effec">Paiement effectué !</span>
  );
};

export default CheckoutForm;
