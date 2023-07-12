import http from "./httpService";
import { link } from "./link";

export function deleteUser(id) {
  return http.delete(`${link}/api/v1/users/${id}`);
}
