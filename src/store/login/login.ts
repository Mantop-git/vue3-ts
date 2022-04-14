import { Module } from "vuex";
import { ILoginState } from "./type"
import { IRootState } from '../types'
import { accountLoginReq, getUserInfoReq, getRoleReq } from '@/api/login/login'
import LocalStorage from '@/util/storage'

const loginMoudle: Module<ILoginState, IRootState> = {
  state() {
    return {
      token: '',
      userInfo: {},
      roleArr:[]
    }
  },
  mutations: {
    LOGINTOKEN(state,token:string){
      state.token=token
    },
    USERINFO(state,userInfo:any){
      state.userInfo=userInfo
    },
    ROLEMENU(state, roleData:any){
      state.roleArr=roleData
    }
  },
  actions: {
    //用户登录
    async accountLoginAction({ commit },params:any) {
      //登录
      let res = await accountLoginReq(params);
      console.log(res);
      const { code, data } = res //上面这个res是unknown给它一个接口约束
      if (code == 0 && data.token) {  //成功后的返回值
        //存储到本地
        LocalStorage.setStorage('token', data.token)
        commit("LOGINTOKEN", data.token)
      }

      //拿用户数据
      const id = res.data.id
      let userInfoRes = await getUserInfoReq(id)
      LocalStorage.setStorage('userInfo', userInfoRes.data)
      commit('USERINFO', userInfoRes.data)
      console.log(userInfoRes, 'userInfoRes');
      //拿role Id
      let roleId=userInfoRes.data.role.id
      let RoleRes = await getRoleReq(roleId)
      console.log(RoleRes,'RoleRes');
      commit('ROLEMENU', RoleRes.data)
    }
    //获取useInfo
    // async (P)

  }
}
export default loginMoudle