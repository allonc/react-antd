import { post,get } from "../utils/request";

export function loginApi(user) {
    return post("/Login",user)
}

export function captchas() {
    return get("/Captchas/1")
}