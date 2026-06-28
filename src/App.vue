<template>
  <nav style="padding:14px; background:#f0f0f0; margin-bottom:30px;">
    <router-link to="/home" style="margin:0 12px; font-size:16px;">首页</router-link>
    <router-link to="/list" style="margin:0 12px; font-size:16px;">列表</router-link>
    <router-link to="/publish" style="margin:0 12px; font-size:16px;">发布</router-link>
    <router-link to="/message" style="margin:0 12px; font-size:16px;">消息</router-link>
    <router-link to="/profile" style="margin:0 12px; font-size:16px;">我的</router-link>
    <router-link to="/board" style="margin:0 12px; font-size:16px;">看板</router-link>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
</script>

<style scoped>
.router-link-active {
  color: #2563eb;
  font-weight: bold;
}
</style>