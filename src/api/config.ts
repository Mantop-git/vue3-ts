// const BASE_URL='http:/mantop.org/dev'
// const BASE_NAME="mantop"

let BASE_URL = "";
const TIME_OUT = 5000;
//通过process.env.NODE_ENV区分项目处于什么状态，决定用什么模式的网络
//开发环境:development
//生产环境:production
//测试环境:test

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://mantop.org/dev";
} else {
  BASE_URL = "http://mantop.org/dev";
}
export { BASE_URL, TIME_OUT };
