<template>
  <b-navbar v-if="loggedIn" toggleable="lg" type="dark" variant="info">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="./wood">Dřevo</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="./users">Změna údajů zaměstnanců</b-nav-item>
        <b-nav-item @click="signOut">Odhlásit se</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import store from '../app/store'

export default {
  name: 'AppNavBar',
  data: () => ({
    appTitle: 'Awesome App',
    sidebar: false,
    menuItems: [
      { title: 'Home', path: '/home', icon: 'home' },
      { title: 'Sign Up', path: '/signup', icon: 'face' },
      { title: 'Sign In', path: '/signin', icon: 'lock_open' }
    ]
  }),
  computed: {
  },
  methods: {
  }
}
</script>
