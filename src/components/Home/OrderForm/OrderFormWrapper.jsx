import React from "react";
import OrderForm from "./OrderForm";
import PropTypes from "prop-types";
const OrderFormWrapper = ({ Side }) => {
  return <OrderForm />;
};

OrderFormWrapper.propTypes = {
  Side: PropTypes.string,

  isMobile: PropTypes.bool
};
export default OrderFormWrapper;
