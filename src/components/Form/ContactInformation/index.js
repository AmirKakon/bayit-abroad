import React, { useState, useMemo } from "react";
import { TextField, Typography, Grid, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

const ContactInformation = ({ formData, setFormData }) => {
  const [dateError, setDateError] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);

  const validatePhoneNumber = (number) => {
    // This is a basic regex for validating phone numbers, consider using a library like libphonenumber-js for a comprehensive solution
    //const pattern = /^[0-9]{10}$/;
    return true; //pattern.test(number);
  };

  const setDateString = (date) => {
    const d = dayjs(date);
    const formatedD = d.format("YYYY-MM-DD").concat("T00:00:00+00:00");
    return formatedD;
  };

  const errorMessage = useMemo(() => {
    switch (dateError) {
      case "maxDate":
      case "minDate": {
        return "Pickup date must be after Delivery date.";
      }

      case "invalidDate": {
        return "The dates selected are invalid";
      }

      default: {
        return "";
      }
    }
  }, [dateError]);

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

  const handleDateChange = (newDate, type) => {
    let updatedDeliveryDate = deliveryDate;
    let updatedPickupDate = pickupDate;

    if (type === 0) {
      updatedDeliveryDate = newDate;
    } else {
      updatedPickupDate = newDate;
      if (
        updatedDeliveryDate &&
        dayjs(updatedPickupDate).isSameOrBefore(dayjs(updatedDeliveryDate))
      ) {
        setDateError("minDate"); // Set the error type
      } else {
        setDateError(null); // Reset error for valid dates
      }
    }

    if (type === 0) {
      setDeliveryDate(updatedDeliveryDate);
    } else {
      setPickupDate(updatedPickupDate);
    }

    let range = {
      delivery: updatedDeliveryDate ? setDateString(updatedDeliveryDate.$d) : null,
      pickup: updatedPickupDate ? setDateString(updatedPickupDate.$d) : null,
    };

    setFormData((prevData) => ({
      ...prevData,
      dateRange: range,
    }));
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

<Grid container spacing={2}>
        <Grid item xs={6}>
          <DatePicker
            label="Delivery Date *"
            onChange={(newDate) => {
              handleDateChange(newDate, 0);
            }}
            disablePast
            sx={{width: "100%"}}
            defaultValue={formData.dateRange.delivery !==null ? dayjs(formData.dateRange.delivery) : undefined}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            label="Pickup Date *"
            onError={(error) => setDateError(error)}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
            onChange={(newDate) => {
              handleDateChange(newDate, 1);
            }}
            minDate={
              deliveryDate
                ? dayjs(deliveryDate).add(1, "day")
                : dayjs().add(1, "day")
            }
            defaultValue={formData.dateRange.pickup !==null ? dayjs(formData.dateRange.pickup) : undefined}
            sx={{width: "100%"}}
          />
        </Grid>
      </Grid>
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
