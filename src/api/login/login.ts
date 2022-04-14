//引入网络请求
import requestURL from '../index'
//引入数据类型
import {ILoginRequest,IDataType,ILoginRes,IUserInfo} from '../login/type'
//login
export function accountLoginReq(account:ILoginRequest){
  return requestURL.post<IDataType<ILoginRes>>({
    url:'/login',
    data:account
  })
}
//userInfo
export function getUserInfoReq(id:number){
  return requestURL.get<IDataType<IUserInfo>>({
    url: '/users/'+id
  })
}
//菜单权限Role
export function getRoleReq(id:number) {
  return requestURL.get<IDataType<IUserInfo>>({
    url: `/role/${id}/menu`
  })
}