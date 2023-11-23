<template>
  <a-space direction="vertical" :size="12">
    <DatePicker picker="year" :value="year" @change="handleChangeYear" />
  </a-space>
  <Bar :data="chartData" :options="chartOptions" />
</template>
<script setup lang="ts">
import adminService from "@/services/admin-service";
import { DatePicker } from "ant-design-vue";
import type { ChartData, ChartOptions } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { computed, onMounted, ref } from "vue";
import { Bar } from "vue-chartjs";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const year = ref<Dayjs | string>(dayjs(new Date()));

function handleChangeYear(value: string | Dayjs, dateString: string) {
  year.value = value;
  fetchChart(dateString);
}

const chartOptions = computed(
  (): ChartOptions<"bar"> => ({
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Biểu đồ hiển thị doanh thu theo năm ${moment(
          new Date(year.value as string),
        ).format("YYYY")}`,
      },
      tooltip: {
        callbacks: {
          label: (item) => `${item.dataset.label}: $${item.formattedValue} `,
        },
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
  }),
);

const labels = ref<string[]>([
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
]);

const data = ref<number[]>([]);

const chartData = computed(
  (): ChartData<"bar"> => ({
    labels: labels.value,
    datasets: [
      {
        label: "Doanh thu",
        data: data.value,
        backgroundColor: [
          "#864F85", // Tháng 1
          "#b46bb2", // Tháng 2
          "#5680E9", // Tháng 3
          "#84C0E8", // Tháng 4
          "#5AC8B1", // Tháng 5
          "#3B6978", // Tháng 6
          "#BE7C5E", // Tháng 7
          "#425B76", // Tháng 8
          "#D0A555", // Tháng 9
          "#848C76", // Tháng 10
          "#6B5348", // Tháng 11
          "#A07E4E", // Tháng 12
        ],
      },
    ],
  }),
);

function fetchChart(value = "2023") {
  adminService
    .getChartRevenue({ key: "year", value: value })
    .then((res) => {
      console.log(res);
      if (res.status == 200) {
        data.value = [...res.data.data!];
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

onMounted(() => {
  fetchChart();
});
</script>