import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { loginViaEmail } from "../../utilities/api";
import { useNavigate } from "react-router-dom";

const LoginContainer = ({ isSmallScreen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState(false);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setPopup(true);
    var tempStatus = null;
    try {
      const response = await loginViaEmail({
        email: email,
        password: password,
      });
      tempStatus = response.status
      setStatus(tempStatus);
    } catch (e) {
      console.log(e);
      setStatus("Failed");
    } finally {
      setPopup(false);
      if (tempStatus === "Success") {
        navigate("/home");
      }
    }
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
      padding={3}
      sx={{ backgroundColor: "#2c3c30" }}
    >
      <Grid item>
        <Typography variant="h6" fontWeight="bold" color="#e6deca">
          Login
        </Typography>
      </Grid>
      {status === "Failed" && (
        <Grid item xs={isSmallScreen ? 12 : "auto"}>
          <Typography variant="caption" color="red">
            * Email/password is incorrect
          </Typography>
        </Grid>
      )}
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <TextField
          id="login_email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#e6deca", // Default border color
              },
            },
            "& .MuiInputLabel-root": {
              color: "#e6deca", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#e6deca", // Label color when focused
            },
            "& .MuiInputBase-input": {
              color: "#e6deca", // Text color
            },
          }}
        />
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <TextField
          id="login_password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#e6deca", // Default border color
              },
            },
            "& .MuiInputLabel-root": {
              color: "#e6deca", // Label color
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#e6deca", // Label color when focused
            },
            "& .MuiInputBase-input": {
              color: "#e6deca", // Text color
            },
          }}
        />
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            px: 11,
            py: 1,
            "&:disabled": {
              backgroundColor: "#b4b4b4",
              color: "grey",
            },
          }}
          onClick={handleLogin}
          disabled={email === "" || password === ""}
          fullWidth
        >
          Login
        </Button>
      </Grid>
      <Dialog
        open={popup}
        color="primary"
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <DialogTitle sx={{ backgroundColor: "primary.main", color: "white" }}>
          Logging in...
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <CircularProgress sx={{ padding: 2 }} />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default LoginContainer;
