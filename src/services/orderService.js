import http from "./httpService";
import { link } from "./link";
export function myOrder(order) {
  return http.post(`${link}/api/v1/orders/new`, order, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}

export function myAllOrders() {
  return http.get(`${link}/api/v1/orders`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}

export function getUserOrderDetails(id) {
  return http.get(`${link}/api/v1/orders/singleOrder/${id}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}
