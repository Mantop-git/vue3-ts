export interface ILoginRequest{
  name:string
  password:string
}
//对网络请求的结果进行约束
export interface IDataType<T = any> {
  code: number
  data: T
}

//又对data约束
export interface ILoginRes{
  id:number
  name:string
  token:string
}
//对getuserInfoReq的结果的data约束
export interface IUserInfo{
  id: number
  name:string
  cellphone:number
  role:any
}
