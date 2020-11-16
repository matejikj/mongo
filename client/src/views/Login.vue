<template>
  <div>
      <h2>Login</h2>
      <form v-on:submit="login">
        <input type="text" name="email" /><br>
        <input type="password" name="password" /><br>
        <input type="submit" value="Login" />
      </form>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Login',
  components: {
  },
  methods: {
  }
}

</script>
