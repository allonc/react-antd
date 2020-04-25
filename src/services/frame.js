import { get } from "../utils/request";

export function infoApi() {
  return get("/AdminInfo");
}
