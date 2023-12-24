import React from 'react';
import { useParams } from 'react-router-dom';

const ThankYouPage = () => {
    const {id} = useParams();
    return (
        <div>
      <h2>Thank you for your order!</h2>
      <p>Your order ID is: {id}</p>
    </div>
    );
};

export default ThankYouPage;
