<template>
    <section class="review-list">
      <!-- <h2>Reviews</h2> -->
      <ul class="clean-list">
        <li
          v-for="review in reviews"
          class="review-container flex justify-between items-center"
          :key="review._id"
        >
          <review-preview :review="review" />
          <button
            v-if="user?.isAdmin"
            @click="remove(review._id)"
            class="btn-dark-small"
          >
            X
          </button>
        </li>
      </ul>
    </section>
  </template>
  
  <script>
  import reviewPreview from './review-preview.vue'
  export default {
    props: {
      reviews: Array,
    },
    components: {
      reviewPreview,
    },
    methods: {
      remove(reviewId) {
        this.$emit('removed', reviewId)
      },
    },
    computed: {
      user() {
        return this.$store.getters.loggedInUser
      },
    },
  }
  </script>