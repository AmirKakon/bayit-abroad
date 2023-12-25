import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import Loading from "../../components/Loading";
import ThankYouSummary from "../../components/ThankYouSummary";

const ThankYouPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiBaseUrl}/api/form/orders/get/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setOrder(res.data);
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
      <ThankYouSummary order={{ ...order, id }} />
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
