import { Link } from "@mui/material";
import { Box } from "@mui/system";

const AboutPage = () => {
    return (
      <Box flex={1}>
        <h5> Welcome to about page </h5>
        <Link href="https://www.w3schools.com" target="_blank" rel="noopener noreferrer" underline="none">
    <img border="0" alt="W3Schools" src="logo_w3s.gif" width="100" height="100" />
  </Link>
      </Box>
    );
  };
  
  export default AboutPage;
  