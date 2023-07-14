<template>
  <div id="app">
    <OneMore/>
    <!-- <page1/> -->
    <!-- <viewTabs></viewTabs> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import page1 from './components/page1.vue'
import viewTabs from './components/viewTabs.vue'
import OneMore from './components/oneMore.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    page1,
    viewTabs,
    OneMore
  }
}
</script>

<style>

</style>
