import { createApp } from "vue";
import App from "./App.vue";
//路由
import router from "./router";
//集中式状态管理仓库
import store from "./store";
//element plus 插件
import "./plugins/element";
//对项目样式的初始化
import "normalize.css";
import requestURL from "@/api/index";
interface DataType {
  data: any;
  returnCode: number;
  success: string;
}

requestURL
  .get<DataType>({
    url: "/home/multidata",
    // method:'GET',
    interceptors: {
      requestIntercepter: (config) => {
        console.log(config, "single instance config");
        return config;
      },
    },
  })
  .then((res) => {
    console.log(res.data);
    console.log(res.returnCode);
    console.log(res.success);
  });
// requestURL
// request()
//引入element-plus插件
// import {elementPlus} from './plugins'
// //引入element-plus样式
// import "element-plus/theme-chalk/base.css";
//全局引入
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
const app = createApp(App);
// 注册element plus中的icon
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(store).use(router).use(ElementPlus).mount("#app");
