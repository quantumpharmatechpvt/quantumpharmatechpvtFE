"use client";
import React from "react";
import Image from "next/image";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <main style={{ background: "#8f8f87", minHeight: "100vh" }}>
      <Container maxWidth="lg">
      <Grid
          container
          alignItems="center"
          sx={{
            height: "calc(100vh - 100px)",
          }}
        >
          <Grid item sm={12} md={4}>
            <Stack direction="column" spacing={3}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "white" }}>
                Quantum Pharma Technology
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "white" }}>
                Quantum Pharma Technology provides ecommerce services and leading
                company in pharma industry
              </Typography>
              <Stack direction="row" spacing={3}>
                <Button
                  sx={{
                    color: "black",
                    borderRadius: "5px",
                    fontWeight: 700,
                  }}
                  variant="contained"
                  onClick={()=>router.push("/register")}
                >
                Start With Us
                </Button>
                <Link href="">
                  <Button
                    sx={{
                      color: "white",
                      border: "1px solid white",
                      borderRadius: "5px",
                      fontWeight: 700,
                    }}
                    variant="outlined"
                  >
                    Learn more
                  </Button>
                </Link>
              </Stack>
            </Stack>
          </Grid>
          {/* <Grid item md={8} sm={12}>
            <Image
              src={""}
              alt="QPT Logo"
              width={800}
              height={600}
              layout="responsive"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Grid> */}
        </Grid>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          height={100}
        >
          <Link href="">
          </Link>
          <Stack direction="row">
            <Button
              variant="outlined"
              sx={{
                color: "white",
                px: 5,
                fontWeight: "bold",
                border: "1px solid white",
              }}
              onClick={()=>router.push("/login")}
              color="primary"
            >
              Log In
            </Button>
          </Stack>
        </Stack>
   
      </Container>
    </main>
  );
};

export default Home;
