<script setup>
import { onMounted, onUpdated } from 'vue';
import { useCartApi } from '@/composables/useCartApi';
import LayoutNavbar from '@/components/LayoutNavbar.vue';
import LayoutFooter from '@/components/LayoutFooter.vue';

const { getCartData } = useCartApi();
onMounted(() => {
  getCartData();
});
onUpdated(() => {
  getCartData();
});
</script>
<template>
  <LayoutNavbar />
  <router-view></router-view>
  <LayoutFooter />
</template>
<style></style>
