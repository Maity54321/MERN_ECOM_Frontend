import http from "./httpService";
import { devLink } from "./link";

export function createCart(cart) {
  http.post(
    `${devLink}/api/v1/cart`,
    { cartItems: cart },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
}

export function getCartItems() {
  return http.get(`${devLink}/api/v1/cart`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}

export function deleteItem(id) {
  return http.delete(`${devLink}/api/v1/cart/${id}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
}
