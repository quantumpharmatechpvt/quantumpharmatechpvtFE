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
import { Box, Button, Container, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { setOrders } from "@/components/slices/productsSlice";
import { store } from "@/components/redux/store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function AlignItemsList() {
  const router = useRouter();
  const { cartProducts, cardProducts1, cardProducts2 } = useSelector(
    (state: any) => state.cartSlice
  );
  let [arrProd1, setArrProd1] = React.useState([
    ...cartProducts,
    ...cardProducts1,
    ...cardProducts2,
  ]);
  const [fetch, setFetch] = React.useState(false);
  let arrProd = [...cartProducts, ...cardProducts1, ...cardProducts2];
  const totalMrp = arrProd1.reduce((accumulator, currentValue) => {
    const mrpValue = parseFloat(currentValue.mrp);
    return accumulator + mrpValue;
  }, 0);
  const orderConfimr = () => {
    store.dispatch(setOrders(arrProd));
  };
  const deleteCartItems = (e: any) => {
    const getIndex = arrProd1.findIndex((item) => item.title === e);
    arrProd1.splice(getIndex, 1);
    setFetch((p) => !p);
  };
  React.useEffect(() => {
    setArrProd1(arrProd1);
  }, [fetch]);
  return (
    <Container
      sx={{ alignItems: "center", justifyContent: "center", display: "flex" }}
    >
      {" "}
      {arrProd1.length ? (
        <Box>
          <List
            sx={{ width: "100%", maxWidth: 960, bgcolor: "background.paper" }}
          >
            <Typography variant="h5">My Cart</Typography>
            {arrProd1?.map((item: any) => (
              <>
                <Box sx={{ display: "flex" }}>
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
                  <IconButton
                    aria-label="settings"
                    key={item.title}
                    sx={{ marginTop: "30px" }}
                    onClick={() => deleteCartItems(item.title)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
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
            onClick={() => {
              router.push("/orders");
              orderConfimr();
            }}
          >
            <Button variant="contained" color="success">
              Procceed with Payment
            </Button>
            <Typography
              variant="h5"
              sx={{ marginLeft: "15px", marginTop: "10px" }}
            >
              Total Price : ₹ {totalMrp}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5">My Cart</Typography>
          <Typography variant="h6" sx={{ margin: "20px" }}>
            Your cart is empty
          </Typography>
        </Box>
      )}
    </Container>
  );
}
