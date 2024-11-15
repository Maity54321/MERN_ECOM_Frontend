import http from "./httpService";
import { devLink } from "./link";

export function checkout(amount) {
  return http.post(`${devLink}/api/v1/payment/checkout`, { amount });
}

export function apiKey() {
  return http.get(`${devLink}/api/v1/payment/getKey`);
}
