import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsInCart } from "../reducks/users/selectors";
import { makeStyles } from "@mui/styles";
import { CartListItem } from "../components/Products";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { PrimaryButton, TextDetail } from "../components/UI";
import { orderProducts } from "../reducks/products/operations";

const useStyles = makeStyles(theme => ({
  detailBox: {
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      width: 512,
    },
  },
  orderBox: {
    border: "1px solid rgba(0,00,0,0.2)",
    borderRadius: 4,
    boxShadow: "0 4px 2px 2px rgba(0,0,0,0.2)",
    height: 256,
    margin: "24px auto 16px auto",
    padding: 16,
    width: 288,
  },
}));

const OrderConfirm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const productsInCart = getProductsInCart(selector);

  const subtotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => {
      return (sum += product.price);
    }, 0);
  }, [productsInCart]);

  const shippingFee = subtotal >= 10000 ? 0 : 210;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingFee + tax;

  const order = useCallback(() => {
    dispatch(orderProducts(productsInCart, total));
  }, [productsInCart, total]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">Confirm Your Order</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
            {productsInCart.length > 0 &&
              productsInCart.map(product => (
                <CartListItem key={product.cartId} product={product} />
              ))}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail
            label={"Subtotal"}
            value={"¥" + subtotal.toLocaleString()}
          />
          <TextDetail label={"Tax"} value={"¥" + tax.toLocaleString()} />
          <TextDetail
            label={"Shipping Fee"}
            value={"¥" + shippingFee.toLocaleString()}
          />
          <Divider light />
          <TextDetail label={"Total"} value={"¥" + total.toLocaleString()} />
          <PrimaryButton label={"Order"} onClick={order} />
        </div>
      </div>
    </section>
  );
};

export default OrderConfirm;
