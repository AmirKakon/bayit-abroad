import logo from '../../media/bayit-abroad-logo.png';
import { Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Box sx={{ bgcolor: "#2c3c30", color: "white", height: "100%", px: 1 }}>
                <Grid container alignItems="center" justifyContent="start">
                    <Link to="/home" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="Bayit Abroad Logo" height={70} style={{ display: 'block'}} />
                    </Link>
                    <Typography variant="h5" color="#e6deca" sx={{ marginLeft: 2 }}>Bayit Abroad</Typography>
                </Grid>
            </Box>
        </header>
    );
};

export default Header;
