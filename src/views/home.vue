<template>
  <section class="py-4 flex flex-col gap-2">
    <h1 class="welcome">Welcome to our store</h1>
    <img class="home-img" src="https://i.pinimg.com/564x/dd/45/30/dd4530a194c43f854276dcd9a9d71491.jpg" alt="">
  </section>
</template>

<script>
import customCard from '../components/custom-card.vue'
import notificationHandler from '../components/notification-handler.vue'
import customButton from '../components/custom-button.vue'

export default {
  name: 'home',
  components: {
    customCard,
    notificationHandler,
    customButton,
  },
}
</script>
