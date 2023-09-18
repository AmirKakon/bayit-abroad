import { Typography, Paper } from "@mui/material";

const Header = () => {
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Bayit Abroad Order Form
      </Typography>
      <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="subtitle1" align="center" paragraph>
          Thanks for choosing to order from us!
        </Typography>
        <Typography variant="body1" align="left" paragraph>
          Please fill out the equipment you'd like to rent, the dates of the
          rental and the location and submit the form.
          <br /> Feel free to reach out to us for any questions or requests.
          <br />
          <br />* Please note that delivery is only in Jerusalem. Drop off is depending on our availability and your preference.
          <br />* Payment is at time of delivery via cash, bit or bank transfer.
        </Typography>
      </Paper>
    </>
  );
};

export default Header;
