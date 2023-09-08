import React, { useState } from 'react';
import { Button, Container, TextField, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { Box } from '@mui/system';

const FormPage = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const items = ['Item 1', 'Item 2', 'Item 3']; // Example items
  
    const handleCheckboxChange = (event) => {
      if (event.target.checked) {
        setSelectedItems(prev => [...prev, event.target.name]);
      } else {
        setSelectedItems(prev => prev.filter(item => item !== event.target.name));
      }
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data here, e.g., send it to an API or save in some other way.
    console.log("Form submitted"); // Just a placeholder
  };

  return (
    <Box flex={1}>
    <Container component="main" maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        Bayit Abroad Order Form
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Please fill out this form for your order.
      </Typography>
      
      <form onSubmit={handleSubmit}>
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

        <FormControl component="fieldset" margin="normal">
        <Typography component="legend">Select Items:</Typography>
        {items.map(item => (
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

        {/* ... Add other fields ... */}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Submit
        </Button>
      </form>
    </Container>
    </Box>
  );
};

export default FormPage;
