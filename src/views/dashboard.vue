<template>
 <section class="dashboard" v-if="toys">
    <h3>Averege Price of Product Category</h3>
    <DoughnutChart :chartData="getDataPriceAvg" />
    <h3>Percentage of Yoys That Are In Stock by Label</h3>
    <BarChart :chartData="getDataLabelStock" :options="options" />
  </section>
</template>

<script>
import { DoughnutChart } from "vue-chart-3";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "toy-chart",
  components: { DoughnutChart, BarChart },
  data() {
    return {
      labels: ["Doll", "Battery Powered", "Baby"],
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  async created() {
    await this.$store.dispatch({ type: 'loadToys' })
  },
  methods: {},
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
    getDataPriceAvg() {
      const data = this.labels.map(label => {
        const filteredToys = this.toys.filter(toy =>
          toy.labels.includes(label)
        )
        return filteredToys.reduce(
          (avgPrice, toy) => avgPrice + (toy.price / filteredToys.length),
          0
        )
      })
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Price Avg',
            borderRadius: 6,
            //should be an array:
            data,
            backgroundColor: ["#FFE6F7", "#C689C6", "#937DC2"],
          },
        ],
      }
    },
    getDataLabelStock() {
      const data = this.labels.map(label => {
        return this.toys.reduce(
          (acc, toy) =>
            toy.labels.includes(label) && toy.inStock
              ? acc + 1
              : acc,
          0
        )
      })
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Stock Data',
            borderRadius: 6,
            data,
            backgroundColor: ["#FFE6F7", "#C689C6", "#937DC2"]
          },
        ],
      }
    }
  },
};
</script>