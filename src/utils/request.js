import axios from "axios";
import { getToken } from "./auth";
const instance = axios.create({
  baseURL: "https://adminv1.shuixiongkeji.net",
  timeout: 5000
});

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.headers["authorization"] = "Bearer " + getToken();
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function(res) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (res.data.status === 200) {
      return Promise.resolve(res.data);
    }else if(res.data&&!res.data.status){
      return Promise.resolve(res.data);
    }else {
      return Promise.reject(res.data);
    }
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('err')

    return Promise.reject(error);
  }
);

export function get(url, params) {
  return instance.get("/seller" + url, {
    params
  });
}

export function post(url, data) {
  return instance.post("/seller" + url, data);
}

export function put(url, data) {
  return instance.put(url, data);
}

export function del(url) {
  return instance.delete(url);
}
