import { get,post,put,del } from "../utils/request";

export function listApi(page=1) {
    return get("",page)
}
export function createApi(data) {
    return post("",data)
}
export function modifyOne(id,data) {
    return put("",data)
}
export function delOne(id) {
    return del("")
}