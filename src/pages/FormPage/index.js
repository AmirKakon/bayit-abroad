import React, { useState } from "react";
import { Button, Container } from "@mui/material";
import { Box } from "@mui/system";
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
  });

  const isEntirePackageSelected = selectedItems.includes(items[0]);

  const validatePhoneNumber = (number) => {
    // This is a basic regex for validating phone numbers, consider using a library like libphonenumber-js for a comprehensive solution
    const pattern = /^[0-9]{10}$/;
    return true; //pattern.test(number);
  };

  const isFormComplete = () => {
    return (
      formData.fullName &&
      formData.email &&
      validatePhoneNumber(formData.phoneNumber) &&
      formData.deliveryAddress &&
      formData.dateRange && formData.dateRange.delivery && formData.dateRange.pickup
      && formData.dateRange.delivery < formData.dateRange.pickup
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderItems = isEntirePackageSelected ? items : selectedItems;
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
        padding: 2, // Consistent padding
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
            style={{ marginTop: "16px" }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default FormPage;
