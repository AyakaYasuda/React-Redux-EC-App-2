import React, { useEffect } from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import { getProductsInCart, getUserId } from "../../reducks/users/selectors";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase/index";
import { fetchProductsInCart } from "../../reducks/users/operations";
import { push } from "connected-react-router";

const HeaderMenus = props => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  let productsInCart = getProductsInCart(selector);
  const uid = getUserId(selector);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change => {
          const product = change.doc.data();
          const changeType = change.type;

          switch (changeType) {
            case "added":
              productsInCart.push(product);
              break;
            case "modified":
              const index = productsInCart.findIndex(
                product => product.cartId === change.doc.id
              );
              productsInCart[index] = product;
              break;
            case "removed":
              productsInCart = productsInCart.filter(
                product => product.cartId !== change.doc.id
              );
              break;
            default:
              break;
          }
        });
        dispatch(fetchProductsInCart(productsInCart));
      });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <IconButton onClick={() => dispatch(push("/cart"))}>
        <Badge badgeContent={productsInCart.length} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton onClick={event => props.handleDrawerToggle(event)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default HeaderMenus;
