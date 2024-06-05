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
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { store } from "@/components/redux/store";
import { fetchClientUsers } from "@/components/slices/usersSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pswdError, setPswdError] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [data, setData] = useState<any>([]);;

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
    setEmailError("");
    setError('')
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
  const fetchusers = () => {
    try {
      store.dispatch(fetchClientUsers()).then((res: any) => {
        setData(res.payload.data);
      });
    } catch (error) {}
  };
  useEffect(() => {
    fetchusers();
  }, []);
  const onSubmit = (e: any) => {
    const user = data.find(
      (user: any) => user.email === email && user.password === password
    );
    if (user) {
      localStorage.setItem("email", user.email);
      localStorage.setItem("password", user.password);
      setTimeout(() => {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        alert("Session expired. Please login again.");
        router.push("/login");
      }, 30 * 60 * 1000);
      if (user?.userType === "client") {
        router.push("/home");
      } else {
        router.push("/settings");
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          <Typography variant="h5">Log In to Quantum Pharma Tech</Typography>
          <Box sx={{ mt: 3, display: "grid" }}>
            <TextField
              required
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              autoFocus
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              type='email'
            />
            <TextField
              margin="normal"
              required
              id="password"
              label="Password"
              name="password"
              value={password}
              onChange={handlePwdChange}
              type='password'
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!password || !email}
              sx={{ mt: 3, mb: 3 }}
            >
              Sign In
            </Button>
            <span style={{ color: "red" }}>{error ? error : ""}</span>
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
