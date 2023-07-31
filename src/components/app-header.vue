<template>
    <header class="main-header flex items-center justify-between">
      <div @click="goHome" class="logo uppercase">
        <h2 >Toys</h2>
      </div>
      <nav class="flex gap-1">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/about">About Us</router-link>
        <router-link class="link" to="/toy">Toys</router-link>
        <router-link class="link" to="/dashboard">Dashboard</router-link>
        <router-link class="link" to="/review">Reviews</router-link>
        <router-link v-if="!user" class="link" to="/login"
          >Login</router-link
        >
        <template v-else>
          <router-link class="link" to="/User">User</router-link>
          <button class="link" @click="logout">Logout</button>
        </template>
      </nav>
    </header>
  </template>

  
<script>
export default {
  name: "app-header",
  methods: {
    goHome() {
      this.$router.push("/")
    },
    logout() {
      this.$store.dispatch("logout")
    },
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
}
</script>
  