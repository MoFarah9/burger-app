import * as actionTypes from "./actionTypes";
import axios from "axios";

const URL = process.env.REACT_APP_DATA_URL;

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error: error
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = (orderData, token) => dispatch => {
  dispatch(purchaseBurgerStart());
  axios
    .post(`${URL}/orders.json?auth=${token}`, orderData)
    .then(response =>
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    )
    .catch(error => dispatch(purchaseBurgerFail(error)));
};

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error: error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => dispatch => {
  dispatch(fetchOrdersStart());
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  axios
    .get(`${URL}/orders.json${queryParams}`)
    .then(res => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => dispatch(fetchOrdersFail(err)));
};
