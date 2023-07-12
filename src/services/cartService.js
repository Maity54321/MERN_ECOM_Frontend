import http from "./httpService";
import { link } from "./link";

export function createCart(cart) {
  http.post(
    `${link}/api/v1/cart`,
    { cartItems: cart },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
}

export function getCartItems() {
  return http.get(`${link}/api/v1/cart`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}

export function deleteItem(id) {
  return http.delete(`${link}/api/v1/cart/${id}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}
