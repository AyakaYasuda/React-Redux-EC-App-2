import React, { useCallback } from "react";
import { List } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import { CartListItem } from "../components/Products";
import { PrimaryButton, GreyButton } from "../components/UI";
import { push } from "connected-react-router";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
});

const CartList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const productsInCart = getProductsInCart(selector);

  const goToOrder = useCallback(() => {
    dispatch(push("/order/confirm"));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push("/"));
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text_headerline">Shopping Cart</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 &&
          productsInCart.map(product => (
            <CartListItem key={product.cartId} product={product} />
          ))}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <PrimaryButton label={"Go to checkout"} onClick={goToOrder} />
        <div className="module-spacer--extra-extra-small" />
        <GreyButton label={"Continue shopping"} onClick={backToHome} />
      </div>
    </section>
  );
};

export default CartList;
