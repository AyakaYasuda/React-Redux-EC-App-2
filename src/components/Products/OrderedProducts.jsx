import React, { useCallback } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PrimaryButton } from "../UI";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  list: {
    background: "#FFF",
    height: "auto",
  },
  image: {
    objectFit: "cover",
    margin: "8px 16px 8px 0",
    height: 96,
    width: 96,
  },
  text: {
    width: "100%",
  },
});

const OrderedProducts = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = props.products;

  const goToProductDetail = useCallback(id => {
    dispatch(push("/product/" + id));
  }, []);

  return (
    <List>
      {products.map(product => (
        <>
          <ListItem className={classes.list} key={product.id}>
            <ListItemAvatar>
              <img
                className={classes.image}
                src={product.images[0].path}
                alt={product.name}
              />
            </ListItemAvatar>
            <div className={classes.text}>
              <ListItemText
                primary={product.name}
                secondary={"size: " + product.size}
              />
              <ListItemText primary={"¥" + product.price.toLocaleString()} />
            </div>
            <PrimaryButton
              label={"View the details"}
              onClick={() => goToProductDetail(product.id)}
            />
          </ListItem>
          <Divider light />
        </>
      ))}
    </List>
  );
};

export default OrderedProducts;
