<template>
  <section class="app-container container">
    <app-header />
    <router-view />
    <!-- <footer class="main-app-footer flex center-center">
      <h5>copyright</h5>
    </footer> -->
  </section>
</template> 

<script>
import appHeader from './components/app-header.vue'
import { socketService } from './services/socket-service'

export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadToys' })
    // socketService.on('something-changed', this.alertSomethingChanged)
  },
  methods: {
    clicked() {
      alert('I got clicked!')
    },
  },
  components: {
    appHeader,
  },
}
</script>