import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
} from "@mui/material";
import Loading from "../../components/Loading";
import StepsContainer from "../../components/StepsContainer";
import { ItemSelection, ContactInformation, OrderSummary } from "../../components/Form";
import dayjs from "dayjs";
import isBefore from "dayjs/plugin/isSameOrBefore";
import { useNavigate } from "react-router-dom";

dayjs.extend(isBefore);

const FormPage = () => {
  const [items, setItems] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState({ usd: 0, nis: 0 });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
    additionalNotes: "",
    dateRange: { delivery: null, pickup: null },
  });
  const [loading, setLoading] = useState(true);
  const [loadingPopup, setLoadingPopup] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [orderId, setOrderId] = useState("000");

  const navigate = useNavigate();

  const isFormComplete = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.phoneNumber &&
      formData.deliveryAddress &&
      formData.dateRange.delivery &&
      formData.dateRange.pickup &&
      dayjs(formData.dateRange.delivery).isBefore(formData.dateRange.pickup)
    );
  };

  const steps = [
    { label: "Select Items", limitations: selectedItems.length > 0 },
    {
      label: "Provide Information and Choose Delivery Dates",
      limitations: isFormComplete(),
    },
    { label: "Review and Pay", limitations: true },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const apiBasrUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiBasrUrl}/api/form/form-items/getAll`)
      .then((response) => response.json())
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    fetch(`${apiBasrUrl}/api/form/game-items/getAll`)
      .then((response) => response.json())
      .then((res) => {
        setGames(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = () => {
    const submissionData = {
      ...formData,
      selectedItems,
      totalPrice,
    };

    setLoadingPopup(true);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiBaseUrl}/api/form/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponseStatus(data.status);
        setOrderId(data.orderId);
      })
      .catch((error) => {
        console.error("Error:", error);
        setResponseStatus("Failed");
      })
      .finally(() => {
        setLoadingPopup(false);
      });
  };

  const handleOkButtonClick = () => {
    setResponseStatus(null);
    const url = `/form/orders/${orderId}/thankyou`;

    navigate(url);
  };

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="subtitle1" align="center" paragraph>
                Thanks for choosing to order from us!
              </Typography>
              <Typography variant="body1" align="left" paragraph>
                Please fill out the equipment you'd like to rent, the dates of
                the rental and the location.
                <br /> Feel free to reach out to us for any questions or
                requests.
                <br />
                <br />* Please note that delivery is only in Jerusalem. Drop off
                is dependent on our availability and your preference.
                <br />* Payment is at time of delivery via cash, bit or bank
                transfer.
                <br />
                <br />
                Looking for an item that isn't listed? Add more items in the
                "Additional Notes" section on the next page and our team will
                review the request and get back to you if we can supply it for
                you.
              </Typography>
            </Paper>

            <ItemSelection
              items={items}
              games={games}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          </>
        );
      case 1:
        return (
          <ContactInformation formData={formData} setFormData={setFormData} />
        );
      case 2:
        return (
          <OrderSummary order={{...formData, selectedItems, totalPrice}}/> 
        );
      default:
        return <Typography>DEFAULT</Typography>;
    }
  };

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
      <Container component="main" maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Bayit Abroad Order Form
        </Typography>
        <StepsContainer
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
          renderStep={renderStep}
          onFinish={handleSubmit}
        />

        <Dialog
          open={loadingPopup}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <DialogTitle sx={{ backgroundColor: "primary.main", color: "white" }}>
            Loading...
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <CircularProgress sx={{ padding: 2 }} />
          </DialogContent>
        </Dialog>

        {responseStatus && (
          <Dialog
            open={true}
            color="primary"
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <DialogTitle
              sx={{ backgroundColor: "primary.main", color: "white" }}
            >
              {responseStatus === "Success" ? "Success" : "Failed"}
            </DialogTitle>
            <DialogContent sx={{ padding: 2 }}>
              {responseStatus === "Success" ? (
                <p>Order processed successfully!</p>
              ) : (
                <p>Failed to process the order. Please try again.</p>
              )}
              <Button
                onClick={handleOkButtonClick}
                fullWidth
                variant="contained"
                color="primary"
              >
                OK
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </Container>
    </Box>
  );
};

export default FormPage;
