<template>
  <li class="toy-preview">
    <custom-card>
      <template class="toy-info" #header>
        <p class="toy-name"><span class="fw-bold"></span> {{ toy.name }}</p>
        <p class="toy-price"><span class="fw-bold">Price:</span> ${{ toy.price }}</p>
        <p ><span class="fw-bold">In stock:</span> {{ toy.inStock }}</p>
      </template>

      <template #footer>
        <div class="btn-group">
          <button @click="goToEdit" class="btn btn-primary">edit</button>
          <button @click="goToDetail" class="btn btn-info">details</button>
          <button @click="removeToy(toy._id)" class="btn btn-danger">delete</button>
        </div>
      </template>
    </custom-card>
  </li>
</template>

<script>
import customCard from './custom-card.vue'

export default {
  name: 'toy-preview',
  props: {
    toy: Object,
  },
  components: {
    customCard,
  },
  methods: {
    goToDetail() {
      this.$router.push(`/toy/${this.toy._id}`)
    },
    goToEdit() {
      this.$router.push(`/toy/edit/${this.toy._id}`)
    },
    removeToy(toyId) {
      this.$emit('removeToy', toyId)
    },
  },
}
</script>
