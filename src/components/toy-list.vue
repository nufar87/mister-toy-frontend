<template>
    <section>
        <ul class="toy-list clean-list grid gap-1">
    <toy-preview @removeToy="removeToy" v-for="toy in toys" :toy="toy" :key="toy._id" />
        </ul>
    </section>
  </template>
  
  <script>
  import toyPreview from "./toy-preview.vue";
  export default {
    name: "toy-list",
    props: {
      toys: Array,
      required: true,
    },
    methods: {
      removeToy(toyId) {
      this.$emit('removeToy', toyId)
    },
    },
    components: {
      toyPreview
    }
  };
  </script>
  