import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { ElLoading } from "element-plus";
// import { ElementLoading } from "element-plus/es/components/loading/src/directive";
//定义一个接口用于对请求拦截和响应拦截进行规则限制
interface requestInterface {
  //接口实际也是一个类。类就必然包括属性和方法
  //接口也可以当做类型申明使用
  //接口的属性都不能有实际的值
  //接口在定义类的时候去限制类的结构
  requestIntercepter?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  //这些都是当成定义的类型使用
  requestError?: (err: any) => any;
  responseIntercepter?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  responseError?: (err: any) => any;
}

interface axionsConfig extends AxiosRequestConfig {
  //继续定义一个类型，继承自AxiosRequestConfig并添加自己的规则
  //这个接口的属性值interceptors必须符合接口requestInterface的规则
  interceptors?: requestInterface;
  showLoading?: boolean;

}

class Request {
  instance: AxiosInstance;
  showLoading?: boolean;
  loading?: any;
  /**构造函数， config在初始化new这个类的时候必须传  config类型被限制成了axios中的
 *AxiosRequestConfig类型，所有在new的时候必须是ta的类型
instance现在是instance=axios.create({
 aseURL: baseURL
timeout: timeout
})
*并将axios.create(你传的config传给类的属性instance)*/
  interceptor?: requestInterface;
  constructor(config: axionsConfig) {
    this.instance = axios.create(config);
    this.interceptor = config.interceptors;
    //将你输入的loading传给构造函数中
    // this.loading= config.showLoading

    //是否需要展示loading ----------实例不传时默认不展示loading==false
    this.showLoading = config.showLoading ?? true;
    //请求拦截 相当于给use中的config参数进行了限制(config=>{},error=>{})
    this.instance.interceptors.request.use(
      this.interceptor?.requestIntercepter,
      this.interceptor?.requestError
    );
    //响应拦截
    this.instance.interceptors.response.use(
      this.interceptor?.responseIntercepter,
      this.interceptor?.responseError
    );

    //所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log(config, "config in AllStance");

        if (this.showLoading === true) {
          this.loading = ElLoading.service({
            lock: true,
            text: "loading for data...",
            background: "rgba(0, 0, 0, 0.7)",
          });
        } else {
          // console.log("I do not need loading!!");
        }
        return config;
      },
      (err) => {
        return err;
      }
    );
    //实例的响应拦截
    this.instance.interceptors.response.use(
      (config) => {
        // console.log(config,'xiangyinglanjie ');
        if (config.status == 200) {
          var { data } = config;
        }
        setTimeout(() => {
          this.loading?.close();
        }, 3000);
        return data;
      },
      (err) => {
        return err;
      }
    );
  }
  request<T>(config: axionsConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      //q请求拦截
      if (config.interceptors?.requestIntercepter) {
        config = config.interceptors.requestIntercepter(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // console.log(res, 'from request');
          //把resolve传出去
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
      //对showLoading进行处理 那个main.ts中的showloading只是传给了当前类，main调用request方法时里面并没有对showloading进行操作
      this.showLoading = config.showLoading ?? false;
    });
  }
  //封装 get post delete请求方式
  get<T>(config: axionsConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: axionsConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: axionsConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  // get<T>(config:axionsConfig):Promise<T>{
  //   return this.request<T>({...config,method:"GET"})
  // }
}
export default Request;
