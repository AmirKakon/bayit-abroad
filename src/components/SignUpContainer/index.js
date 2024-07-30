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
import { signupViaEmail } from "../../utilities/api";
import { useNavigate } from "react-router-dom";

const SignUpContainer = ({ isSmallScreen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: false, email: false, password: false });
  const [popup, setPopup] = useState(false);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const newErrors = { name: false, email: false, password: false };

    if(!name ||  name === "") {
      newErrors.name = true;
    }

    if (!email.includes("@")) {
      newErrors.email = true;
    }

    if (password.length < 6) {
      newErrors.password = true;
    }

    setErrors(newErrors);

    if (!(newErrors.name && newErrors.email && newErrors.password)) {
      console.log(name, email, password);
      setPopup(true);
      try {
        const response = await signupViaEmail({
          name: name,
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
      sx={{ backgroundColor: "white" }}
    >
      <Grid item>
        <Typography variant="h6" fontWeight="bold">
          Sign Up
        </Typography>
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
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
        />
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : "auto"}>
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 11, py: 1 }}
          onClick={handleSignUp}
          disabled={name === "" || email === "" || password === ""}
          fullWidth
        >
          SignUp
        </Button>
      </Grid>
      <Dialog
        open={popup}
        color="primary"
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <DialogTitle sx={{ backgroundColor: "primary.main", color: "white" }}>
          {status === "" ? "Signing Up..." : status}
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
              <p>Signed Up successfully!</p>
            ) : (
              <p>
                Failed to sign up. Please try again at a later time.
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

export default SignUpContainer;
