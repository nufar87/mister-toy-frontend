import { reviewService } from '../../services/review-service.js';
import router from '../../router';

export default {
  state: {
    reviews: null,
  },
  getters: {
    getReviews(state) {
      return state.reviews;
    },
  },
  mutations: {
    setReviews(state, { reviews }) {
      state.reviews = reviews;
    },
    addReview(state, { review }) {
      state.reviews.push(review);
    },
  },
  actions: {
    async getReviews({ commit }, { filterBy }) {
      try {
        // if (!filterBy) filterBy = {};
        const reviews = await reviewService.query(filterBy);
        commit({
          type: 'setReviews',
          reviews,
        });
        console.log('reviews', reviews);
      } catch (err) {
        console.error('cannot load reviews error:', err);
        console.log(err);
      }
    },

    async addReview(context, { content, toyId }) {
      const user = context.rootGetters.getUser;
      if (!user) return router.push('/login');
      const review = {
        content,
        userId: user._id,
        toyId,
      };
      await reviewService.addReview(review);
      context.commit({
        type: 'addReview',
        review: addedReview,
      });
    },
    async removeReview(context, { reviewId }) {
      try {
        console.log(reviewId);
        await reviewService.remove(reviewId);
        context.commit({ type: 'removeReview', reviewId });
      } catch (err) {
        console.log('reviewStore: Error in removeReview', err);
        throw err;
      }
    },
  },
};
