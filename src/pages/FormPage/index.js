import React, { useState, useEffect } from "react";
import {
  Link,
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
import {
  ItemSelection,
  ContactInformation,
  OrderSummary,
} from "../../components/Form";
import dayjs from "dayjs";
import isBefore from "dayjs/plugin/isSameOrBefore";
import { useNavigate } from "react-router-dom";
import { orderStatus } from "../../utilities/config";
import { fetchFormItems, createOrder } from "../../utilities/api";

dayjs.extend(isBefore);

const FormPage = ({ isSmallScreen }) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState({ usd: 0, nis: 0 });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    additionalNotes: "",
    dateRange: { delivery: null, return: null },
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
      formData.phone &&
      formData.deliveryAddress &&
      formData.dateRange.delivery &&
      formData.dateRange.return &&
      dayjs(formData.dateRange.delivery).isBefore(formData.dateRange.return)
    );
  };

  const steps = [
    { label: "Select Items", limitations: selectedItems.length > 0 },
    {
      label: "Provide Information and Choose Delivery Dates",
      limitations: isFormComplete(),
    },
    { label: "Review and Place Order", limitations: true },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

    const fetchData = async () => {
      try {        
        const itemData = await fetchFormItems();
        setItems(itemData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const currentURL = window.location.href;
      const baseUrl = currentURL.split("/form")[0];

      const submissionData = {
        ...formData,
        selectedItems,
        totalPrice,
        baseUrl,
        status: orderStatus[0],
      };

      setLoadingPopup(true);

      const data = await createOrder(submissionData);
      setResponseStatus(data.status);
      setOrderId(data.orderId);
    } catch (error) {
      console.error("Error:", error);
      setResponseStatus("Failed");
    } finally {
      setLoadingPopup(false);
    }
  };

  const handleOkButtonClick = () => {
    setResponseStatus(null);
    if (responseStatus === "Success") {
      const url = `/orders/${orderId}/thankyou?first=true`;
      navigate(url);
    }
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
                Please fill out the form including the items you&apos;d like to
                rent, the dates of the rental and the location.
                <br /> Feel free to reach out to us for any questions or
                requests at{" "}
                <Link
                  href="mailto:bayitabroad@gmail.com"
                  color="#0563c4"
                  style={{ textDecoration: "underline" }}
                >
                  bayitabroad&#64;gmail.com
                </Link>
                &nbsp;or via WhatsApp at{" "}
                <Link
                  href="https://wa.me/972587714120"
                  color="#0563c4"
                  style={{ textDecoration: "underline" }}
                  target="_blank"
                >
                  +972&#45;58&#45;771&#45;4120
                </Link>
                .
                <br />
                <br />
                &#42; Please note that delivery is only in Jerusalem. Drop off
                time is dependent on our availability and your preference.
                <br />
                &#42; Payment will be available after confirmation of the order
                by our team. Payment options include cash, bit, or PayPal.
                <br />
                <br />
                Looking for an item that isn't listed? Add more items in the
                &quot;Additional Notes&quot; section on the next page and our
                team will review the request and get back to you if we can
                supply it for you.
              </Typography>
            </Paper>

            <ItemSelection
              items={items}
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
          <OrderSummary order={{ ...formData, selectedItems, totalPrice }} />
        );
      default:
        return <Typography>ERROR</Typography>;
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
        padding: isSmallScreen ? 1 : 2,
      }}
    >
      <Container component="main" maxWidth="md">
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          align="center"
          gutterBottom
        >
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
            Placing Order...
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
                <p>
                  Order processed successfully!
                  <br />
                  We have recieved your order and will reach out once it is
                  confirmed by our team.
                </p>
              ) : (
                <p>
                  Failed to process the order. Please try submitting the order
                  again or refresh the page.
                  <br />
                  If the issue persists, please contact us!
                </p>
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
