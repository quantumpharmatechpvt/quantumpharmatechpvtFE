"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };
  const { handleSubmit, control } = useForm<any>({
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);
  const handleRegister = (e: { preventDefault: () => void }) => {
    signIn(
      "qpt",
      {
        callbackUrl: process.env.NEXT_PUBLIC_BASE_PATH
          ? `/${process.env.NEXT_PUBLIC_BASE_PATH}/home`
          : `/home`,
      },
      {
        Register_hint: email,
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "xs",
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
          <Typography variant="h6">Register Quantum Pharma Tech</Typography>
          <Box sx={{ mt: 3, display: "grid", width: 360 }}>
            <TextField
              required
              id="email"
              label="First Name"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              sx={{margin:'10px'}}
            />
            <TextField
              required
              id="password"
              label="Last Name"
              name="password"
              value={password}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              sx={{margin:'10px'}}
            />
            <TextField
              required
              id="email"
              label="Email"
              name="email"
              value={password}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              sx={{margin:'10px'}}
            />
            <TextField
              required
              id="password"
              label="Phone Number"
              name="password"
              value={password}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              sx={{margin:'10px'}}
            />
            <TextField
              required
              id="password"
              label="Address"
              name="password"
              value={password}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              sx={{margin:'10px'}}
            />
            <TextField
              required
              id="password"
              label="Pincode"
              name="password"
              value={password}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              sx={{margin:'10px'}}
            />
            <Button
              type="submit"
              variant="contained"
              onClick={handleRegister}
              disabled={Boolean(emailError) || email.length === 0}
              sx={{ mt: 3, mb: 3 }}
            >
              Register
            </Button>
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default Register;
