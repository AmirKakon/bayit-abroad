import { Grid, Box, Typography } from '@mui/material';
import logo from '../../media/bayit-abroad-logo.png';

const Header = () => {
    return(
        <Box sx={{ bgcolor: "#2c3c30", color: "white", height: "100px" }}>
        <Grid container style={{ height: '100%' }} alignItems="center" justifyContent="center">
          <Box position="absolute" left="16px">
            <img src={logo} alt="logo" height={70} />
          </Box>
          <Typography variant="h4">Welcome to Bayit Abroad</Typography>
        </Grid>
      </Box>
    );
};

export default Header;