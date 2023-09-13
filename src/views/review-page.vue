<template>
  <section>
    <h3>All the reviews</h3>
    <review-list :reviews="reviews" />
  </section>
</template>

<script>
  import reviewList from '../components/review-list.vue'
  
  export default {
    async created() {
      await this.$store.dispatch({ type: 'getReviews' })
    },
    computed: {
      reviews() {
        return this.$store.getters.getReviews
      },
    },
    components: {
      reviewList,
    },
  }
</script>
  