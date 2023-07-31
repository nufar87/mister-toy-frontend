<template>
  <div class="toy-details-container container" v-if="toy">
    <div class="toy-details flex align-center">
      <div class="toy-info">
        <h2>{{ toy.name }}</h2>
        <h3>Price: ${{ toy.price }}</h3>
        <h3>Type: {{ toy.type }}</h3>
        <h3>{{ toyInStock }}</h3>
        <h4>The toy was created at: {{ date }}</h4>
      </div>
      <div class="img-container">
        <img v-if="toy.imgUrl" :src="toy.imgUrl" alt="toy-img" />
        <img v-else src="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
          alt="image placeholder" />
      </div>
    </div>
    <div class="review-container">
      <div class="review-add flex">
        <input type="text" v-model="review" placeholder="Write your review" />
        <button @click="addReview" class="btn">Save</button>
      </div>
      <details v-if="reviews" class="review-list">
        <summary>Reviews</summary>
        <div v-for="review in reviews" :key="review._id" class="review-preview">
          <h4>By {{ review.user.username }}</h4>
          <p>{{ review.content }}</p>
        </div>
      </details>
    </div>
    <chat-room @close="toggleChat" v-if="isChat" :msgHistory="toy.msgs || []" :toyId="toy._id" @loadToy="loadToy" />
    <img v-else title="Click to open chat" @click="toggleChat" class="chat-icon"
      src="https://res.cloudinary.com/airbnb22/image/upload/v1690795165/chat-icon_e2mzjt.jpg"
      alt="chat icon" />
  </div>
</template>

<script>
import chatRoom from '../components/chat-room.vue'

export default {
  data() {
    return {
      toy: null,
      review: '',
      isChat: false,
    }
  },
  created() {
    var toyId = this.$route.params._id
    this.getToyById(toyId)
    this.getReviews(toyId)
  },
  computed: {
    toyInStock() {
      return this.toy.inStock
        ? 'Toy is in stock'
        : 'Toy is not available in stock'
    },
    date() {
      return new Date(this.toy.createdAt).toLocaleDateString()
    },
    reviews() {
      return this.$store.getters.getReviews
    },
  },
  methods: {
    async getToyById(toyId) {
      this.toy = await this.$store.dispatch({
        type: 'getToyById',
        toyId,
      })
    },
    async addMsg(msg) {
      this.toy.msgs.push(msg)
      await this.$store.dispatch({
        type: 'updateToy',
        toy: this.toy,
      })
    },
    async loadToy() {
      this.toy = await this.$store.dispatch({
        type: 'getToyById',
        toyId: this.toy._id,
      })
    },
    async getReviews(toyId) {
      await this.$store.dispatch({
        type: 'getReviews',
        filterBy: { toyId },
      })
    },
    async addReview() {
      await this.$store.dispatch({
        type: 'addReview',
        toyId: this.toy._id,
        content: this.review,
      })
      this.review = ''
      this.getReviews(this.toy._id)
      this.getToyById(this.toy._id);
    },
    saveChatHistory(msgs) {
      console.log('save history')
      if (!this.toy.msgs) this.toy.msgs = []
      this.toy.msgs.push(...msgs)
      this.$store.dispatch({ type: 'saveToy', toy: this.toy })
    },
    toggleChat() {
      this.isChat = !this.isChat
    },
  },
  components: {
    chatRoom,
  },
}
</script>
