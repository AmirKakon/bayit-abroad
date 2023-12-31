import React, { useState } from "react";
import { Button, Container, Box } from "@mui/material";
import {
  Header,
  ItemSelection,
  ContactInformation,
} from "../../components/Form";
import { items } from "../../dummyData/items";

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

  const isEntirePackageSelected = selectedItems.includes(items[0].name);

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
    const orderItems = isEntirePackageSelected
      ? items
      : selectedItems.map((itemName) =>
          items.find((item) => item.name === itemName)
        );
    const submissionData = {
      ...formData,
      orderItems,
    };
    console.log("Form Data:", submissionData);
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
            selectedItems={selectedItems}
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
            disabled={!isFormComplete()}
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default FormPage;
