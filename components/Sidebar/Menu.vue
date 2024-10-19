<template>
  <div>
    <header
      class="flex items-center p-4 hover:scale-[101%] transition cursor-pointer"
    >
      <Logo />
      <p class="font-bold text-white text-2xl">CS<sup>3</sup>AMS</p>
    </header>
    <div class="px-4 grow">
      <div class="grid gap-2 py-5">
        <NuxtLink
          :href="item.path"
          v-for="(item, index) in items"
          :key="index"
          class="flex items-center gap-2 px-2 py-3 transition rounded cursor-pointer hover:bg-[#d7900b]"
          :class="{ 'bg-[#d7900b]': isActive(item.path) }"
        >
          <Icon :name="item.icon" size="22" style="color: white" />
          <span class="text-white text-m font-bold">{{ item.title }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const items = ref([
  {
    title: "Dashboard",
    path: "/",
    icon: "ri:dashboard-line",
  },
  {
    title: "Members",
    path: "/members",
    icon: "tdesign:member",
  },
  {
    title: "Events",
    path: "/events",
    icon: "mdi:events",
  },
]);

const route = useRoute();

// Function to check if the current route matches the link
const isActive = (path) => {
  return route.path === path;
};
</script>

<style></style>
