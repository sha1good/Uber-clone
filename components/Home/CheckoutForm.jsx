import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      return;
    }
   const response = await fetch("http://localhost:3000/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount
        //amount,
      }),
    });

    const secretKey = await response.json();

    console.log(secretKey);
    const { error } = await stripe.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });
  };
  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
      <h2 className="m-5 font-bold">Amount to pay: {amount}</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <button className="bg-black text-white w-full p-2 mt-2 rounded-lg">
          pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
