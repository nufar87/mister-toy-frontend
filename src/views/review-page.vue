<!-- <template>
    <div class="review-page-container">
      <h1>All the reviews</h1>
      <div
        v-for="review in reviews"
        :key="review._id"
        class="review-preview flex column align-center"
      >
        <h4>About: {{ review.toy.name }}</h4>
        <h4>By: {{ review.user.username }}</h4>
        <p>Review: {{ review.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'review-page',
    computed: {
      reviews() {
        return this.$store.getters.getReviews;
      },
    },
    created() {
      this.$store.dispatch({
        type: 'getReviews',
      });
    },
  };
  </script>
  
  <style lang="scss">
  .review-page-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    h1 {
      margin-bottom: 10px;
    }
    .review-preview:not(:last-child) {
      border-bottom: 1px solid #a06c6c;
    }
  }
  </style> -->

  <template>
    <section>
      <h2>All the reviews</h2>
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
  