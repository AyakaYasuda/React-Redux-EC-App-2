import React from "react";
import {
  Divider,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { getUserId } from "../../reducks/users/selectors";
import { db } from "../../firebase/index";

const useStyles = makeStyles({
  list: {
    height: 128,
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96,
  },
  text: {
    width: "100%",
  },
});

const CartListItem = props => {
  const classes = useStyles();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);

  const image = props.product.images[0].path;
  const name = props.product.name;
  const size = props.product.size;
  const price = props.product.price.toLocaleString();

  const removeProductFromCart = id => {
    return db.collection("users").doc(uid).collection("cart").doc(id).delete();
  };

  return (
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img className={classes.image} src={image} alt="product image" />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText primary={name} secondary={"size: " + size} />
          <ListItemText primary={price} secondary={size} />
        </div>
        <IconButton onClick={() => removeProductFromCart(props.product.cartId)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider light />
    </>
  );
};

export default CartListItem;
