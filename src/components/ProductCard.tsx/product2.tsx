import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import prod from "../data/products2.json";
import { Box, Container } from "@mui/material";
import { setCartProducts2 } from "../slices/productsSlice";
import { store } from "../redux/store";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Products() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let prodArr: any = [];
  const addCartItems = (e: any) => {
    const addedProduct = prod.products2.find((item: any) => item.title === e);
    if (addedProduct) {
      prodArr = [...prodArr, addedProduct];
    }
    store.dispatch(setCartProducts2(prodArr));
  };
  return (
    <>
      <Box>
        {prod.products2.map((item, index) => (
          <Container key={index} style={{ display: "flex", overflowY: "auto" }}>
            <Card sx={{ maxWidth: 345, margin: "10px",maxHeight: 445 }} key={item.title}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={item.title}
              />
              <CardMedia
                component="img"
                height="194"
                image={item.img}
                alt={item.title}
                sx={{
                  width: 500,
                }}
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing key={item.title}>
                <IconButton
                  aria-label="add to favorites"
                  key={item.title}
                  onClick={(e) => addCartItems(item.title)}
                >
                  <FavoriteIcon />
                </IconButton>
                <Typography>MRP : ₹ {item.mrp} </Typography>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
            </Card>
          </Container>
        ))}
      </Box>
    </>
  );
}
