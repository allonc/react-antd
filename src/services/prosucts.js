import { get,post,put } from "../utils/request";

export function listApi(params) {
    return get("/FreightTemplatesList",params)
}
export function createApi(params) {
    return post("/UpdateUser",params)
}
export function getDetail(id) {
    return get("/ProductsDetail",id)
}
export function modifyOne(id,data) {
    return put("",data)
}
export function delOne(id) {
    return post("/DelFreightTemplate",id)
}