import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { items } from "../../dummyData/items";

const FormPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
    dateRange: [null, null],
    additionalNotes: "",
  });

  const isEntirePackageSelected = selectedItems.includes(items[0]);

  const validatePhoneNumber = (number) => {
    // This is a basic regex for validating phone numbers, consider using a library like libphonenumber-js for a comprehensive solution
    const pattern = /^[0-9]{10}$/;
    return pattern.test(number);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phoneNumber" && !validatePhoneNumber(value)) {
      return; // Do not update state if the phone number is invalid
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === "Entire package..." && checked) {
      setSelectedItems(items); // Select all items if "Entire package..." is checked
    } else if (name === "Entire package..." && !checked) {
      setSelectedItems([]); // Deselect all items if "Entire package..." is unchecked
    } else {
      setSelectedItems((prev) =>
        checked ? [...prev, name] : prev.filter((item) => item !== name)
      );
    }
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
        <Typography variant="h4" align="center" gutterBottom>
          Bayit Abroad Order Form
        </Typography>
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
          <Typography variant="body1" align="center" paragraph>
            Thanks for choosing to order from us!
          </Typography>
          <Typography variant="body1" align="left" paragraph>
            Please fill out which equipment you'd like to rent, the weekend of
            the rental and the location.
            <br />
            <br />* Please note that delivery is only in Jerusalem. Drop off is
            on Thursday night / Friday morning and pick it up is on Saturday
            night / Sunday morning, depending on our availability and your
            preference.
          </Typography>
        </Paper>
        <form onSubmit={handleSubmit}>
          <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
            <FormControl component="fieldset">
              <Typography variant="h6" component="legend">
                Select the Items to Order:
              </Typography>
              {items.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      name={item}
                      checked={selectedItems.includes(item) || isEntirePackageSelected}
                      onChange={handleCheckboxChange}
                      color="primary"
                      disabled={
                        isEntirePackageSelected && item !== items[0]
                      }
                    />
                  }
                  label={item}
                />
              ))}
            </FormControl>
            <Typography variant="body1" align="left" paragraph padding={1}>
              Looking for an item that isn't listed? Add more items in the
              "Additional Notes" section at the bottom of the form and our team
              will review the request and let you know if we can supply it for
              you.
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ padding: 2 }}>
            <Typography variant="h6" component="legend">
              Contact Information:
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Full Name"
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Phone Number"
              name="phoneNumber"
              error={!validatePhoneNumber(formData.phoneNumber)}
              helperText={
                !validatePhoneNumber(formData.phoneNumber) &&
                "Invalid phone number"
              }
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Delivery Address"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              required
            />

            <DateRangePicker
              sx={{ marginTop: 2 }}
              localeText={{ start: "From", end: "To" }}
              name="dateRange"
              value={formData.dateRange}
              minDate={new Date()}
              onChange={(newValue) =>
                setFormData((prevData) => ({
                  ...prevData,
                  dateRange: newValue,
                }))
              }
            />

            <TextField
              fullWidth
              margin="normal"
              id="outlined-multiline-flexible"
              label="Additional Notes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              multiline
              maxRows={4}
            />
          </Paper>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
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
