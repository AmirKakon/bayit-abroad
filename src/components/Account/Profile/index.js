import React, { useState } from "react";
import {
  TextField,
  Typography,
  Paper,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { updateUserProfile } from "../../../utilities/api";

const Profile = ({ isSmallScreen, user, setUser, setTriggerRefresh }) => {
  const [loadingPopup, setLoadingPopup] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateUserProfile = async () => {
    setLoadingPopup(true);
    const updatedUser = await updateUserProfile(user);
    console.log(updatedUser);
    setResponseStatus(updatedUser.status);
    setLoadingPopup(false);
  };

  const handleOkButtonClick = () => {
    setTriggerRefresh(prev => !prev);
    setResponseStatus(null);
  };

  return (
    <Paper elevation={2} sx={{ padding: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        label="Full Name"
        required
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />

      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        label="Email Address"
        type="email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        required
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth={isSmallScreen}
          onClick={handleUpdateUserProfile}
        >
          <Typography>Save Changes</Typography>
        </Button>
      </Box>
      <Dialog
        open={loadingPopup}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <DialogTitle sx={{ backgroundColor: "primary.main", color: "white" }}>
          Updating...
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

      {responseStatus && (
        <Dialog
          open={true}
          color="primary"
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <DialogTitle sx={{ backgroundColor: "primary.main", color: "white" }}>
            {responseStatus === "Success" ? "Success" : "Failed"}
          </DialogTitle>
          <DialogContent sx={{ padding: 2 }}>
            {responseStatus === "Success" ? (
              <p>Updated Successfully</p>
            ) : (
              <p>Failed to update. Try again Later</p>
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
        </Dialog>
      )}
    </Paper>
  );
};

export default Profile;
