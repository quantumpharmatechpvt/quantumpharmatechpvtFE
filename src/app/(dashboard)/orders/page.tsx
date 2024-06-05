/* eslint-disable react/no-unescaped-entities */
"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function AlignItemsList() {
  const router = useRouter();
  const { cartProducts, cardProducts1, cardProducts2, orders } = useSelector(
    (state: any) => state.cartSlice
  );
  let arrProd = [...cartProducts, ...cardProducts1, ...cardProducts2];
  const totalMrp = arrProd.reduce((accumulator, currentValue) => {
    const mrpValue = parseFloat(currentValue.mrp);
    return accumulator + mrpValue;
  }, 0);
  return (
    <Container
      sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}
    >
      {" "}
      {orders.length ? (
        <Box>
          <List
            sx={{ width: "100%", maxWidth: 960, bgcolor: "background.paper" }}
          >
            <Typography variant="h5">My Orders</Typography>
            {orders?.map((item: any) => (
              <>
                <ListItem alignItems="flex-start" sx={{ width: 460 }}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={item.img} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <React.Fragment>
                        <Box sx={{ display: "grid" }}>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            MRP : ₹ {item.mrp}
                          </Typography>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.description}
                          </Typography>
                        </Box>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            ))}
          </List>
          <Box
            sx={{
              position: "fixed",
              bottom: 60,
              display: "flex",
            }}
            onClick={() => router.push("/orders")}
          >
            <Button variant="contained" color="success" disabled>
              Your Order Placed Succusessfly
            </Button>
            <Typography
              variant="h5"
              sx={{ marginLeft: "15px", marginTop: "10px" }}
            >
              Amount Paid : ₹ {totalMrp}
            </Typography>
            <Box sx={{ marginTop: "14px", marginLeft: "10px" }}>
              <CheckCircleRoundedIcon />
            </Box>
          </Box>
          <Typography
            variant="h5"
            sx={{ marginLeft: "15px", marginTop: "40px" }}
          >
            Estimated Delivery 3 days
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5">My Orders</Typography>
          <Typography variant="h6" sx={{ margin: "20px" }}>
            Your don't have Orders
          </Typography>
        </Box>
      )}
    </Container>
  );
}
