import logo from '../../media/bayit-abroad-logo.png';
import { Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Box sx={{ bgcolor: "#2c3c30", color: "white", height: "70", px: 1 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Link to="/home" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="Bayit Abroad Logo" height={70} />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h4">Welcome to Bayit Abroad</Typography>
                    </Box>
                </Grid>
            </Box>
        </header>
    );
};

export default Header;