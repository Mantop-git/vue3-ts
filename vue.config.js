const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
      },
    },
  },
  lintOnSave: false, //关闭eslint
});
