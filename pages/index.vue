<template>
  <div class="grid w-full gap-4">
    <header class="flex items-start justify-between">
      <div class="grow">
        <p>Hi, welcome back officer</p>
        <h1>Dashboard</h1>
      </div>
      <div class="bg-neutral-200 w-[120px] h-[36px]"></div>
    </header>

    <main class="grid gap-4">
      <Tabs default-value="account" class="w-[400px]">
        <TabsList>
          <TabsTrigger
            v-for="(items, index) in list"
            :key="index"
            :value="items.title"
          >
            {{ items.title }}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          v-for="(item, index) in list"
          :key="index"
          :value="item.title"
        >
          <highchart :options="option" />
        </TabsContent>
      </Tabs>
    </main>
    <!-- <div class="flex flex-row gap-5">
        <div
          v-for="(item, index) in 3"
          :key="index"
          class="bg-neutral-200 w-[120px] h-[36px]"
        ></div>
      </div>
    <section class="grow">
        <div class="w-full h-[320px] bg-neutral-200"></div>
      </section> -->

    <footer class="grid gap-4">
      <div class="flex items-center justify-between gap-4">
        <div
          v-for="(item, index) in 3"
          :key="index"
          class="bg-neutral-200 w-full h-[260px]"
        ></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const list = ref([
  {
    title: "Latest Event",
    component: resolveComponent("TabsLatestEvents"),
  },
  {
    title: "Previous Event",
    component: resolveComponent("TabsPreviousEvents"),
  },
]);
const option = computed(() => ({
  chart: {
    type: "spline",
  },
  title: {
    text: "Monthly Average Temperature",
  },
  subtitle: {
    text:
      "Source: " +
      '<a href="https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature" ' +
      'target="_blank">Wikipedia.com</a>',
  },
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    accessibility: {
      description: "Months of the year",
    },
  },
  yAxis: {
    title: {
      text: "Temperature",
    },
    labels: {
      format: "{value}°",
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: "#666666",
        lineWidth: 1,
      },
    },
  },
  series: [
    {
      name: "Tokyo",
      marker: {
        symbol: "square",
      },
      data: [
        5.2,
        5.7,
        8.7,
        13.9,
        18.2,
        21.4,
        25.0,
        {
          y: 26.4,
          marker: {
            symbol: "url(https://www.highcharts.com/samples/graphics/sun.png)",
          },
          accessibility: {
            description:
              "Sunny symbol, this is the warmest point in the " + "chart.",
          },
        },
        22.8,
        17.5,
        12.1,
        7.6,
      ],
    },
    {
      name: "Bergen",
      marker: {
        symbol: "diamond",
      },
      data: [
        {
          y: 1.5,
          marker: {
            symbol: "url(https://www.highcharts.com/samples/graphics/snow.png)",
          },
          accessibility: {
            description:
              "Snowy symbol, this is the coldest point in the " + "chart.",
          },
        },
        1.6,
        3.3,
        5.9,
        10.5,
        13.5,
        14.5,
        14.4,
        11.5,
        8.7,
        4.7,
        2.6,
      ],
    },
  ],
}));
</script>

<style></style>
