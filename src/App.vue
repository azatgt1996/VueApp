<script setup>
import AppNav from '@/components/AppNav.vue';

</script>

<template>
  <AppNav />
  <div class="back-panel">
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss">
@import '@/css/style.scss';

.back-panel {
  width: 100%;
  background: $bg-color;

  .content {
    margin: 7px 7px 0 7px;
    background: white;
    border-radius: 10px 10px 0 0;
    height: calc(100% - 38px);
    padding: 15px;
  }
}
</style>
