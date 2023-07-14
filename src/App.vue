<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import ShopLayout from '@/components/ShopLayout';



export default {
  name: 'App',
  components: {
    ShopLayout,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
}
</style>
