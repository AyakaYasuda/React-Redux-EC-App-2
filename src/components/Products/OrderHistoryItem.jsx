import React from "react";
import { Divider } from "@mui/material";
import { TextDetail } from "../UI";
import { OrderedProducts } from ".";

const dateTimeToString = date => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2)
  );
};

const dateToString = date => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2)
  );
};

const OrderHistoryItem = props => {
  const order = props.order;
  const orderedDate = dateTimeToString(order.updated_at.toDate());
  const shippingDate = dateToString(order.shipping_date.toDate());
  const price = "¥" + order.amount.toLocaleString();

  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetail label={"Order ID"} value={order.id} />
      <TextDetail label={"Order date"} value={orderedDate} />
      <TextDetail label={"Estimated shipping date"} value={shippingDate} />
      <TextDetail label={"Order total"} value={price} />
      <Divider light />
      {order.products.length > 0 && (
        <OrderedProducts products={order.products} />
      )}
      <div className="module-spacer--extra-extra-small" />
    </div>
  );
};

export default OrderHistoryItem;
