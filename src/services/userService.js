import http from "./httpService";
import { link } from "./link";

export function registerUser(datas) {
  return http.post(`${link}/api/v1/users/`, datas, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
}

export function loginUser(datas) {
  return http.post(`${link}/api/v1/auth/`, datas);
}
