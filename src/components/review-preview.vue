<template>
    <article class="m-1">
      <span v-for="i in review.rate">
        <font-awesome-icon
          :style="{ color: '#f8cc2d' }"
          icon="fa-solid fa-star"
        />
      </span>
      <p>About: {{ review.toy.name }}</p>
      <p>By: {{ review.user.username }}</p>
      <p>Review: {{ review.content }}</p>
    </article>
  </template>

  <script>
  export default {
    props: {
      review: Object,
    },
  }
  </script>