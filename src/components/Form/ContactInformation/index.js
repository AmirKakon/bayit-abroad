import React, {useState} from "react";
import {
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const ContactInformation = ({formData, setFormData}) => {
    const [deliveryDate, setDeliveryDate] = useState(null);
    const [pickupDate, setPickupDate] = useState(null);

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

      const validatePhoneNumber = (number) => {
        // This is a basic regex for validating phone numbers, consider using a library like libphonenumber-js for a comprehensive solution
        const pattern = /^[0-9]{10}$/;
        return true; //pattern.test(number);
      };

  return (
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
          !validatePhoneNumber(formData.phoneNumber) && "Invalid phone number"
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

      <DatePicker
        label="Delivery Date"
        onChange={(newDate) => setDeliveryDate(newDate)}
        disablePast
        sx={{ marginRight: 2, marginTop: 2 }}
      />

      <DatePicker
        label="Pickup Date"
        onChange={(newDate) => setPickupDate(newDate)}
        minDate={deliveryDate || dayjs()}
        sx={{ marginTop: 2 }}
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
  );
};

export default ContactInformation;
