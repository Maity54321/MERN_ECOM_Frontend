import http from "./httpService";
import { link } from "./link";

export function checkout(amount) {
  return http.post(`${link}/api/v1/payment/checkout`, { amount });
}

export function apiKey() {
  return http.get(`${link}/api/v1/payment/getKey`);
}
