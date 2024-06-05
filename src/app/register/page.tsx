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
import { store } from "@/components/redux/store";
import { addClientUser } from "@/components/slices/usersSlice";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState();
  const [address, setAddress] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState("");
  const [phoneErr, setPhoneError] = useState<string>("");
  const { handleSubmit, control } = useForm<any>({
    resetOptions: {
      keepDirtyValues: true, // keep dirty fields unchanged, but update defaultValues
    },
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pattern = new RegExp(/^\d{1,10}$/);

  const handledRegister = async () => {
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else if (!pattern.test(phoneNo)) {
      setPhoneError("Please enter valid Phone Number");
    } else {
      setEmailError("");
      try {
        const id = Math.floor(Math.random() * 90 + 10);
        let data = {
          id: id,
          name: name,
          age: age,
          email: email,
          addr: address,
          phno: phoneNo,
          psw: password,
        };
        await store.dispatch(addClientUser(data)).then((res: any) => {
        });
        await router.push("/login");
      } catch (error) {
        console.log(error,'error at register')
      }
    }
  };
  const onSubmit: SubmitHandler<any> = (data) => {
    // console.log(data);
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
            width: 420,
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6">Register Quantum Pharma Tech</Typography>
          <Box sx={{ mt: 3, display: "grid", width: 360 }}>
            <TextField
              required
              id="full name"
              label="Full Name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ margin: "10px" }}
            />
            <TextField
              required
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailError)}
              helperText={emailError}
              sx={{ margin: "10px" }}
            />
            <TextField
              required
              id="password"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ margin: "10px" }}
            />
            <TextField
              required
              id="phone number"
              label="Phone Number"
              name="phone number"
              type="number"
              value={phoneNo}
              onChange={(e: any) => setPhoneNo(e.target.value)}
              sx={{ margin: "10px" }}
            />
            <TextField
              required
              id="age"
              label="Age"
              name="age"
              type="number"
              value={age}
              onChange={(e: any) => setAge(e.target.value)}
              sx={{ margin: "10px" }}
            />
            <TextField
              required
              id="addres"
              label="Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ margin: "10px" }}
            />
            <Button
              variant="contained"
              disabled={
                !name || !email || !password || !age || !phoneNo || !address
              }
              sx={{ mt: 3, mb: 3 }}
              onClick={handledRegister}
            >
              Register
            </Button>
            <Grid justifyContent="center">
              <Link href="/login" style={{ fontSize: 13 }}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Box>
        </Container>
      </Box>
    </form>
  );
};

export default Register;
