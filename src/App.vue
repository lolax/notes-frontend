<template>
  <div id="main">
    <div id="nav">
      <router-link to="/notes" exact>Notes</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "app"
  }
</script>

<style>
#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
