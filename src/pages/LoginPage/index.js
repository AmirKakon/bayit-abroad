import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import SignUpContainer from "../../components/SignUpContainer";
import LoginContainer from "../../components/LoginContainer";
import Loading from "../../components/Loading";
import { backgroundImageUrl } from "../../utilities/config";
import { logout, getLoggedInUser } from "../../utilities/api";

const LoginPage = ({ isSmallScreen }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setLoading(false);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: "#e2e2e2",
        minHeight: "50vh",
        padding: 2,
      }}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
        padding={3}
      >
        <Grid item>
          <LoginContainer isSmallScreen={isSmallScreen} />
        </Grid>
        <Grid item>
          <SignUpContainer isSmallScreen={isSmallScreen} />
        </Grid>
        <Grid item>
          <Button onClick={logout}>LOGOUT</Button>
        </Grid>
        <Grid item>
          <Button onClick={getLoggedInUser}>Check</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
