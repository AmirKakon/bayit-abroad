import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import Loading from "../../components/Loading";
import { OrderSummary } from "../../components/Form";

const ThankYouPage = ({ isSmallScreen }) => {
  const { id } = useParams();
  const location = useLocation();
  const isFirstVisit =
    new URLSearchParams(location.search).get("first") === "true";

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/orders/get/${id}`);

        if (!response.ok) {
            setNotFound(true);
        }

        const res = await response.json();

        // Assuming the backend now returns formatted dateRange
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
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
      {isFirstVisit ? (
        <Typography variant="h4" align="center" gutterBottom>
          Thank you for your order!
        </Typography>
      ) : null}
      <OrderSummary order={order } thankyou={isFirstVisit} />
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
