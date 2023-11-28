import React, { useState } from "react";
import {
  Button,
  Container,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  Header,
  ItemSelection,
  ContactInformation,
} from "../../components/Form";

import QuantityInput from "../../components/Form/NumberInput";

const FormPage = () => {
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
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const isFormComplete = () => {
    return (
      formData.fullName &&
      formData.email &&
      formData.phoneNumber &&
      formData.deliveryAddress &&
      formData.dateRange.delivery &&
      formData.dateRange.pickup &&
      formData.dateRange.delivery < formData.dateRange.pickup
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const submissionData = {
      ...formData,
      selectedItems,
      totalPrice,
    };

    setLoading(true);

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
        console.log(data);
        setResponseStatus(data.status);
      })
      .catch((error) => {
        console.error("Error:", error);
        setResponseStatus("Failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOkButtonClick = () => {
    setResponseStatus(null);
  };

  return (
    <Box
      flex={1}
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "200",
        padding: 2,
      }}
    >
      <Container component="main" maxWidth="md">
        <Header />
        <form onSubmit={handleSubmit}>
          <ItemSelection
            setSelectedItems={setSelectedItems}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />

          <ContactInformation formData={formData} setFormData={setFormData} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!isFormComplete() || loading}
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>

          <Dialog
            open={loading}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <DialogTitle
              sx={{ backgroundColor: "primary.main", color: "white" }}
            >
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
        </form>
      </Container>
      <QuantityInput />
    </Box>
  );
};

export default FormPage;
