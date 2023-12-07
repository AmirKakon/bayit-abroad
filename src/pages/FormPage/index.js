import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Loading from "../../components/Loading";
import {
  Header,
  ItemSelection,
  ContactInformation,
} from "../../components/Form";

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

  useEffect(() => {
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


    console.log(submissionData);
    setLoadingPopup(true);

    // const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // fetch(`${apiBaseUrl}/api/form/orders/create`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(submissionData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setResponseStatus(data.status);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     setResponseStatus("Failed");
    //   })
    //   .finally(() => {
      setTimeout(() => {
        // Your code after the delay
        console.log('Three seconds have passed!');
        setLoadingPopup(false);
      }, 3000);
    
    //   });
  };

  const handleOkButtonClick = () => {
    setResponseStatus(null);
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
        <Header />
        <form onSubmit={handleSubmit}>
          <ItemSelection
            items={items}
            games={games}
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
            disabled={!isFormComplete() || loadingPopup}
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>

          <Dialog
            open={loadingPopup}
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
    </Box>
  );
};

export default FormPage;
