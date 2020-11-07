<template>
  <div id="app">
    <app-nav-bar></app-nav-bar>
    <router-view/>
  </div>
</template>

<script>
import AppNavBar from '../components/AppNavBar.vue'

export default {
  name: 'app',
  components: {
    AppNavBar
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    wood: function (val) {
      this.$store.dispatch('ADD_WOOD', val)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
