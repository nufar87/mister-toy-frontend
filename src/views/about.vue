<template>
    <section class="about">
        <h1>About Us</h1>
        <p>TOYS is a family business started at 1920.  we started of as a kids only store, and expended to adults and all family toys at 1989. we are proud to deliver classic toys and new special ones that keep our customers satisfied and always curious for our next release. We're shore that you could find something that you would find some toy for your taste.</p>
        <h4>find the nearest shop to you:</h4>
        <div>
          <toy-map/>
        </div>
    </section>
  </template>
  
  <script>
  import toyMap from '../components/toy-map.vue';
  export default {
    name: 'about',
    components: {
      toyMap,
    },
  }
  </script>