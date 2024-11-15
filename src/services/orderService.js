import http from "./httpService";
import { devLink } from "./link";
export function myOrder(order) {
  return http.post(`${devLink}/api/v1/orders/new`, order, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}

export function myAllOrders() {
  return http.get(`${devLink}/api/v1/orders`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}

export function getUserOrderDetails(id) {
  return http.get(`${devLink}/api/v1/orders/singleOrder/${id}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}
