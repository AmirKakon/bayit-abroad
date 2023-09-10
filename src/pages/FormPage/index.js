import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { items } from "../../dummyData/items";

const FormPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedItems((prev) => [...prev, event.target.name]);
    } else {
      setSelectedItems((prev) =>
        prev.filter((item) => item !== event.target.name)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data here, e.g., send it to an API or save in some other way.
    console.log("Form submitted"); // Just a placeholder
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
          <Typography variant="body1" align="center" paragraph>
            Thanks for choosing to order from us!
          </Typography>
          <Paper elevation={2} sx={{ padding: 1, marginBottom: 5}}>
          <Typography variant="body1" align="left" paragraph>
            Please fill out which equipment you'd like to rent, the weekend of
            the rental and the location.
            <br />
            <br />
            Looking for an item that isn't listed below? Add more items in the
            "Additional Notes" section at the bottom of the form and our team
            will review the request and let you know if we can supply it for
            you.
            <br />
            <br />
            * Please note that delivery is only in Jerusalem. Drop off is
            on Thursday night / Friday morning and pick it up is on Saturday
            night / Sunday morning, depending on our availability and your
            preference.
          </Typography>
        </Paper>
        <form onSubmit={handleSubmit}>
          <Paper elevation={2} sx={{ padding: 1 }}>
            <FormControl component="fieldset">
              <Typography component="legend">Select the Items to Order:</Typography>
              {items.map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      name={item}
                      checked={selectedItems.includes(item)}
                      onChange={handleCheckboxChange}
                      color="primary"
                    />
                  }
                  label={item}
                />
              ))}
            </FormControl>
          </Paper>

          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Full Name"
            required
          />

          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Email Address"
            type="email"
            required
          />

          {/* You can continue adding more fields like this. For dropdowns, use Select: */}
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Some Select Field</InputLabel>
            <Select>
              <MenuItem value={10}>Option 1</MenuItem>
              <MenuItem value={20}>Option 2</MenuItem>
              <MenuItem value={30}>Option 3</MenuItem>
            </Select>
          </FormControl>

          {/* ... Add other fields ... */}

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
