<!-- <template>
  <section v-if="toyToEdit" class="toy-edit py-2">
    <form @submit.prevent="saveToy" class="form">
      <div class="form-control">
        <label for="txt" class="form-label">Toy Name</label>
        <input
          required
          v-model="toyToEdit.name"
          id="txt"
          type="text"
          class="form-input"
          placeholder="Enter your toy name here..."
        />
      </div>
      <div class="form-control">
        <label for="inStock" class="form-label">Toy Price</label>

        <input
          required
          v-model.number="toyToEdit.price"
          id="inStock"
          type="number"
          class="form-input"
        />
      </div>
      <div class="btn-group">
        <button @click="saveToy" class="btn btn-info">save</button>
        <button @click="goBack" class="btn btn-danger-text">go back</button>
      </div>
    </form>
  </section>
</template>

<script>
import { toyService } from '../services/toy-service'

export default {
  name: 'toy-edit',
  data() {
    return {
      toyToEdit: null,
    }
  },
  created() {
    const { _id } = this.$route.params
    if (_id) {
      toyService.getById(_id).then((toy) => {
        this.toyToEdit = toy
      })
    } else this.toyToEdit = toyService.getEmptyToy()
  },
  methods: {
    goBack() {
      this.$router.push('/toy')
    },
    saveToy() {
      this.$store
        .dispatch({ type: 'saveToy', toy: this.toyToEdit })
        .then(() => {
          this.$router.push('/toy')
        })
    },
  },
}
</script> -->

<template>
  <form @submit.prevent="saveToy" class="toy-edit-container container flex column" v-if="toy">
    <input type="text" v-model="toy.name" />

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
</template>

<script>
import { toyService } from '@/services/toy-service.js'
// import { uploadImg } from '@/services/cloudinary.service.js'

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
    // async uploadImg(ev) {
    //   this.isLoading = true
    //   const file = ev.target.files[0]
    //   const res = await uploadImg(file)
    //   this.toy.imgUrl = res.url
    //   this.isLoading = false
    // },
  },
  components: {},
}
</script>
