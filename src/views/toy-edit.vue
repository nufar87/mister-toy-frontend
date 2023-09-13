<template>
  <section class="py-2">
    <form @submit.prevent="saveToy" class=" toy-edit container flex row" v-if="toy">
      <div class="form-control">
          <label for="txt" class="form-label">Toy Name</label>
          <input
            required
            v-model="toy.name" 
            id="txt"
            type="text"
            class="form-input" 
          />
        </div>

      <input type="number" v-model.number="toy.price" />
  
      <select v-model="toy.type">
        <option value="Educational">edu</option>
        <option value="Funny">funny</option>
        <option value="Adult">adult</option>
      </select>
      <label class="in-stock flex space-between align-center">inStock
        <input type="checkbox" class="custom-checkbox" v-model="toy.inStock" />
      </label>
      <button class="btn">save</button>
      <input type="file" @change="uploadImg" />
    </form>
  </section>
</template>

<script>
import { toyService } from '@/services/toy-service.js'

export default {
  name: 'toy-edit',
  data() {
    return {
      toy: null,
      isLoading: false,
    }
  },
  created() {
    var toyId = this.$route.params.id
    if (toyId) {
      this.getToyById(toyId)
    } else {
      this.toy = toyService.getEmptyToy()
    }
  },
  methods: {
    async getToyById(toyId) {
      this.toy = await this.$store.dispatch({ type: 'getToyById', toyId })
    },
    async saveToy() {
      await this.$store.dispatch({ type: 'saveToy', toy: this.toy })
      this.$router.push('/')
    },
  },
  components: {},
}
</script>
