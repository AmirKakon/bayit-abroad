import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const InformationCard = ({ icon, text }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ border: "1px solid #000" }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: -3,
          }}
        >
          {icon}
        </CardContent>
        <CardContent>
          <Typography variant="body2">{text}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InformationCard;
