import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SignUpContainer from "../../components/SignUpContainer";
import Loading from "../../components/Loading";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const LoginPage = ({ isSmallScreen }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setLoading(false);
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, "test@gmail.com", "123456")
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("signed up!", user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
    >
      <SignUpContainer isSmallScreen={isSmallScreen} />
    </Box>
  );
};

export default LoginPage;
