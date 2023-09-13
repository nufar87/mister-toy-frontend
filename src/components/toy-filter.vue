<template>
  <section class="toy-filter">
    <input
      v-model="filterBy.name"
      @input="setFilter"
      type="text"
      class="form-input"
      placeholder="Search name..."
    />
    <el-select
      v-model="filterBy.label"
      @change="setFilter"
      multiple
      placeholder="Select"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <select @change="setFilter" v-model="filterBy.sort">
      <option value="name">name</option>
      <option value="price">price</option>
      <option value="createdAt">created</option>
    </select>
    <label>
      Show only toys in stock
      <input name="inStock" @change="setFilter" type="checkbox" />
    </label>
  </section>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'toy-filter',
  data() {
    return {
      filterBy: {
        name: '',
        label: [],
        sort: 'name',
        inStock: true,
      },
      value1: ref([]),
      options: [
        {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Doll',
    label: 'Doll',
  },
  {
    value: 'Battery Powered',
    label: 'Battery Powered',
  },
  {
    value: 'Baby',
    label: 'Baby',
  },
  {
    value: 'On Wheels',
    label: 'On Wheels',
  },
    {
    value: 'Art',
    label: 'Art',
  },
    {
    value: 'Box Game',
    label: 'Box Game',
  },
    {
    value: 'Puzzle',
    label: 'Puzzle',
  },
    {
    value: 'Outdoor',
    label: 'Outdoor',
  },
]
    }
  },
  methods: {
    setFilter() {
      console.log('filterBy', this.filterBy)
      this.$emit('setFilter', { ...this.filterBy })
    },
}
}
</script>