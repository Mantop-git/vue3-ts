<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent,reactive } from "vue";

export default defineComponent({
  setup() {
    const fuck=reactive({
      name:'he'
    })
    return {
fuck
    };
  },
});
</script>

<style scoped lang="less"></style>
