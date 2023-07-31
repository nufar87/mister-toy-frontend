<template>
    <div style="display: inline-block; margin-left: 20px">
      <p style="margin-left: 10px">choose labels</p>
      <el-select
        v-model="value"
        multiple
        collapse-tags
        placeholder="Select"
        style="width: 240px"
        @change="test"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        
        />
      </el-select>
    </div>
  </template>
  
  <script>
  export default {
data() {
    return {
        value: [],
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
methods:{
  updateLabels(value){
          console.log(value)
            this.$emit('labels', value)
        }
    }
  }
  </script>
  