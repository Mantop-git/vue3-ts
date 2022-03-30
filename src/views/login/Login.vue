<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginPanel from "./cpns/login-panel.vue";
export default defineComponent({
  components: {
    LoginPanel,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
}
</style>
