// import TOPRequest from './topRequest'
import Request from "./request";
import { BASE_URL, TIME_OUT } from "./config";
import LocalStorage from '@/util/storage'

const requestURL = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestIntercepter: (config) => {
      let token = LocalStorage.getStorage('token')?? ''
      // if(token){
      //   config.headers.Authorization = token
      // }
      config.headers!.Authorization = `Bearer ${token}`
      return config;
    },
    requestError: (err) => {
      // console.log(err, "请求拦截失败");
      return err;
    },
    responseIntercepter: (config) => {
      // console.log(config, "响应拦截！");

      return config;
    },
    responseError: (err) => {
      // console.log(err, "响应拦截失败！");
      return err;
    },
  },
});
// const request2 = new Request({
//   baseURL:'2'
// });
export default requestURL;
