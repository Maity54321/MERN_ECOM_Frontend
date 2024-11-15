import http from "./httpService";
import { devLink } from "./link";

export function deleteUser(id) {
  return http.delete(`${devLink}/api/v1/users/${id}`);
}
