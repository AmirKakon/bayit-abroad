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
          Please fill out which equipment you'd like to rent, the weekend of the
          rental and the location.
          <br />
          <br />* Please note that delivery is only in Jerusalem. Drop off is on
          Thursday night / Friday morning and pick it up is on Saturday night /
          Sunday morning, depending on our availability and your preference.
        </Typography>
      </Paper>
    </>
  );
};

export default Header;
