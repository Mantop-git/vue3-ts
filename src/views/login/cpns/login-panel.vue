<template>
  <div class="login_panel">
    <div class="login_body_bg">
      <div class="login_title">后台管理系统</div>
      <div class="login_box">
        <el-tabs type="border-card" stretch class="demo-tabs" v-model='currentTab'>
          <el-tab-pane label="账号登录" name='account'>
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><user-filled /></el-icon>
                <span>账号登录</span>
              </span>
            </template>
            <!--引入account组件 -->
            <loginAccount ref="accountRef"></loginAccount>
          </el-tab-pane>
          <el-tab-pane label="手机登录" name='phone'>
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><phone /></el-icon>
                <span>手机登录</span>
              </span>
            </template>
            <!--引入loginPhone组件 -->
            <loginPhone ref="phoneRef"></loginPhone>
          </el-tab-pane>
        </el-tabs>

        <div class="login_footer">
          <div class="remenber">
            <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
          </div>
          <div class="forget"><el-link type="primary">忘记密码</el-link></div>
        </div>
        <el-button type="primary" style="width: 100%" @click="handleClick"
          >立即登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import loginAccount from "./login-account.vue";
import loginPhone from "./login-phone.vue";

export default defineComponent({
  components: {
    loginAccount,
    loginPhone,
  },
  setup() {
    //保存密码是否true
    const isKeepPassword = ref(true);
    //当前tab是手机登录还是账号登录
    const currentTab= ref<string>('account')

    //拿子组件login-account中的对象，或方法
    const accountRef = ref<InstanceType<typeof loginAccount>>();
    //拿子组件login-phone中的对象，或方法
    const phoneRef = ref<InstanceType<typeof loginPhone>>();
    //随便拿loginAcoutn里 的一个方法
    //点击立即登录后的函数
    const handleClick = () => {
      if(currentTab.value==='account'){
      //调用login-account中的登录请求-----只有在login-account中有这个方法的时候才调用
      accountRef.value?.accountLogin(isKeepPassword.value);
      console.log("dlognging...");
      }else{
        phoneRef.value?.phoneLogin()
      }

    };
    return {
      isKeepPassword,
      handleClick,
      accountRef,
      phoneRef,
      currentTab
    };
  },
});
</script>

<style scoped lang="less">
.login_panel {
  width: 100%;
  height: 100%;
  .login_body_bg {
    // display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    // align-items: center;
    // justify-content: center;
    background: url("@/assets/imgs/login/login-bg.svg");
    .login_title {
      position: absolute;
      left: 41%;
      bottom: 93%;
      font-size: 42px;
      font-weight: 600;
    }
    .login_box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 210px;
      width: 350px;
    }
  }
  .login_footer {
    position: relative;
    padding: 0% 10px;
    .remenber {
      width: 10%;
    }
    .forget {
      position: absolute;
      // float: right;
      right: 3%;
      bottom: 7px;
    }
  }
}

//对icon进行样式调整
.el-icon {
  top: 2px;
  margin-right: 3px;
}

.el-tabs {
  height: 85%;
}
</style>
