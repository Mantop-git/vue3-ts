//封装一个本地存储，获取，清除的类并导出
class LocalStorage{
  //存储
  setStorage(key:string,value:any){
    window.localStorage.setItem(key,JSON.stringify(value))
  }
  //获取
  getStorage(key:string){
    const value=window.localStorage.getItem(key)
    if(value){
      return JSON.parse(value)
    }
  }
  //清除
  deleteStorage(key:string){
    window.localStorage.removeItem(key)
  }
  //清空
  cleanStroage(){
    window.localStorage.clear()
  }
}

export default new LocalStorage()