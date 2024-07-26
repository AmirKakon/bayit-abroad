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
  const [errors, setErrors] = useState({ email: false, password: false });
  const [popup, setPopup] = useState(false);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const newErrors = { email: false, password: false };

    if (!email.includes("@")) {
      newErrors.email = true;
    }

    if (password.length < 6) {
      newErrors.password = true;
    }

    setErrors(newErrors);

    if (!(newErrors.email && newErrors.password)) {
      console.log(email, password);
      setPopup(true);
      try {
        const response = await loginViaEmail({
          email: email,
          password: password,
        });

        setStatus(response.status);
      } catch (e) {
        console.log(e);
        setStatus("Failed");
      }
    }
  };

  const handleOkButtonClick = () => {
    setPopup(false);
    navigate("/home");
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
      {errors.email ? (
        <Grid item xs={isSmallScreen ? 12 : "auto"}>
          <Typography variant="caption" color="red">
            * Not a valid email
          </Typography>
        </Grid>
      ) : null}
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#e6deca', // Default border color
              },
            },
            '& .MuiInputLabel-root': {
              color: '#e6deca', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#e6deca', // Label color when focused
            },
            '& .MuiInputBase-input': {
              color: '#e6deca', // Text color
            },
          }}
        />
      </Grid>
      {errors.password ? (
        <Grid item xs={isSmallScreen ? 12 : "auto"}>
          <Typography variant="caption" color="red">
            * Password length &lt; 6
          </Typography>
        </Grid>
      ) : null}
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#e6deca', // Default border color
              },
            },
            '& .MuiInputLabel-root': {
              color: '#e6deca', // Label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#e6deca', // Label color when focused
            },
            '& .MuiInputBase-input': {
              color: '#e6deca', // Text color
            },
          }}
        />
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ px: 11, py: 1 }}
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
          {status === "" ? "Logging in..." : status}
        </DialogTitle>
        {status === "" ? (
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
        ) : (
          <DialogContent sx={{ padding: 2 }}>
            {status === "Success" ? (
              <p>Logged in successfully!</p>
            ) : (
              <p>
                Failed to log in. Please try again at a later time.
                <br />
                If the issue persists, please contact us!
              </p>
            )}
            <Button
              onClick={handleOkButtonClick}
              fullWidth
              variant="contained"
              color="primary"
            >
              OK
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </Grid>
  );
};

export default LoginContainer;
