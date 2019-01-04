<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/esource">eSource</router-link>
    </nav>
    <div v-if="isAuthenticated" id="app">
      <img src="./assets/logo.png">
      <router-view/>
      <h2><a href="#" v-on:click.stop="logOut()">Log out {{ userName }}</a></h2>
    </div>
    <div v-else id="app">
      <h2><a href="#" v-on:click="logIn()">Log In</a></h2>
    </div>
  </div>
</template>

<script>
import authentication from './authentication'
export default {
  name: 'app',
  computed: {
    isAuthenticated() {
      return authentication.isAuthenticated();
    }
  },
  methods: {
    logOut() {
      authentication.signOut();
    },
    logIn() {
      authentication.signIn();
    }
  },
  data () {
    return {
      userName: authentication.isAuthenticated() ? authentication.getUser().userName : ''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
