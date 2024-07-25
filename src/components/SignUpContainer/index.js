import React, { useState } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";

const SignUpContainer = ({ isSmallScreen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSignUp = () => {
    if(!email.includes("@")) {
        setError(true);
    }
    console.log(email, password);
  };

  return (
    <Grid
      container
      item
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="300px"
      padding={2}
      sx={{ backgroundColor: "white" }}
    >
      <Grid item >
        <Typography variant="h6" fontWeight="bold" >Sign Up</Typography>
      </Grid>
      {error ?
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
         <Typography variant="caption" color="red">* Not a valid email</Typography> 
      </Grid> : null}
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 11, py: 1 }}
          onClick={handleSignUp}
          disabled={email === "" || password === ""}
          fullWidth
        >
          SignUp
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignUpContainer;
