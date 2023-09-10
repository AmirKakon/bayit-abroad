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
      formData.range && formData.range.delivery && formData.range.pickup
    );
  };

  //   const calculateTotal = (selectedItems) => {
  //     let totalUSD = 0;
  //     let totalNIS = 0;

  //     if (selectedItems.includes(items[0].name)) {
  //       totalUSD = items[0].price.usd;
  //       totalNIS = items[0].price.nis;
  //     } else {
  //       selectedItems.forEach((itemName) => {
  //         const item = items.find(it => it.name === itemName);
  //         if (item) {
  //           totalUSD += item.price.usd;
  //           totalNIS += item.price.nis;
  //         }
  //       });
  //     }

  //     return { usd: totalUSD, nis: totalNIS };
  //   };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    let newSelectedItems;
    if (name === items[0].name && checked) {
      newSelectedItems = [items[0]];
    } else if (name === items[0].name && !checked) {
      newSelectedItems = [];
    } else {
      newSelectedItems = checked
        ? [...selectedItems, name]
        : selectedItems.filter((item) => item.name !== name);
    }

    setSelectedItems(newSelectedItems);
    // const total = calculateTotal(newSelectedItems);
    // setTotalPrice(total);
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
