import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripePublicKey);

const StripePayment = ({ amount, currency }) => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  const stripe = useStripe();
  const elements = useElements();

  const apiBasrUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // Step 1: Create a payment intent on the server
      const response = await fetch(`${apiBasrUrl}/api/form/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount, // Replace with the actual amount in cents
          currency: currency, // Replace with the actual currency
        }),
      });

      const { clientSecret } = await response.json();

      // Step 2: Confirm the payment on the client
      const { token, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error("error", error);
      } else {
        console.log("token", token);
        // Payment succeeded, you can update the order status or redirect to a success page
      }
    } catch (error) {
      console.error("err", error);
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <PaymentElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </Elements>
  );
};

export default StripePayment;
