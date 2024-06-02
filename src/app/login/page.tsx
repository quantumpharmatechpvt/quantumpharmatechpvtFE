"use client";
import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pswdError, setPswdError] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);

    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the entered email is in a valid format
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };
  const handlePwdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    if (value) {
      setPswdError("Please enter a valid password");
    } else {
      setPswdError("");
    }
  };
  const { handleSubmit, control } = useForm<any>({
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);
  const handleLogin = (e: { preventDefault: () => void }) => {
    signIn(
      "qpt",
      {
        callbackUrl: process.env.NEXT_PUBLIC_BASE_PATH
          ? `/${process.env.NEXT_PUBLIC_BASE_PATH}/home`
          : `/home`,
      },
      {
        login_hint: email,
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Container
          sx={{
            border: "1px solid #CCCCCC",
            width: "30%",
            padding: "40px",
            borderRadius: "10px",
            
          }}
        >
          <Typography variant="h5">Signin Quantum Pharma Tech</Typography>
          <Box sx={{ mt: 3, display: "grid" }}>
            <TextField
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              id="password"
              label="Password"
              name="password"
              autoFocus
              value={password}
              onChange={handlePwdChange}
              error={Boolean(emailError)}
              helperText={emailError}
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleLogin}
              disabled={Boolean(emailError) || email.length === 0}
              sx={{ mt: 3, mb: 3 }}
            >
              Sign In
            </Button>
            <Grid justifyContent="center">
              <Link href="/register" style={{ fontSize: 13 }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default Login;
