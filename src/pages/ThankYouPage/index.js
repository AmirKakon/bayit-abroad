import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Loading from "../../components/Loading";
import ThankYouSummary from "../../components/ThankYouSummary";

const ThankYouPage = () => {
    const {id} = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
  
      const apiBasrUrl = process.env.REACT_APP_API_BASE_URL;
  
      fetch(`${apiBasrUrl}/api/form/orders/get/${id}`)
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
    ) : ( <Box
      flex={1}
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "200",
        padding: 2,
      }}
    >
      <Typography variant='h4' align='center' sx={{marginBottom:2}}>Thank you for your order!</Typography>
      <ThankYouSummary order={{...order, id}}/>
    </Box>
    );
};

export default ThankYouPage;
