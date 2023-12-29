import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import Loading from "../../components/Loading";
import { OrderSummary } from '../../components/Form';
import dayjs from "dayjs";

const ThankYouPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiBaseUrl}/api/form/orders/get/${id}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            // Order not found
            setNotFound(true);
          } else {
            throw new Error(`Error: ${response.status}`);
          }
        }
        return response.json();
      })
      .then((res) => {
        const data = {
          ...res.data,
          dateRange: {
            delivery: dayjs.unix(res.data.deliveryDate._seconds).format("ddd MMM D YYYY"),
            return: dayjs.unix(res.data.returnDate._seconds).format("ddd MMM D YYYY"),
          }
        };

        delete data.deliveryDate;
        delete data.returnDate
        setOrder(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return loading ? (
    <Loading />
  ) : notFound ? (
    <Box
      flex={1}
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "200",
        padding: 2,
      }}
    >
      <Typography variant='h4' align='center' sx={{ marginBottom: 2 }}>
        Order Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/home"
        sx={{ marginTop: 2 }}
        fullWidth
      >
        Back to Home
      </Button>
    </Box>
  ) : (
    <Box
      flex={1}
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "200",
        padding: 2,
      }}
    >
      <Typography variant='h4' align='center' sx={{ marginBottom: 2 }}>
        Thank you for your order!
      </Typography>
      <OrderSummary order={{ ...order, id }} thankyou={true}/>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/home"
        sx={{ marginTop: 2 }}
        fullWidth
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default ThankYouPage;
