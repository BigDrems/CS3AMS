<template>
  <div>
    <!-- Sidebar for Mobile (with a hamburger menu) -->
    <div class="bg-[#140e6c] w-[190px] lg:h-full">
      <div
        class="z-50 flex flex-row items-end justify-between w-full h-full p-4 lg:hidden"
      >
        <Logo />
        <Icon
          name="iconamoon:menu-burger-horizontal"
          class="z-50 cursor-pointer left-2 top-2"
          size="30"
          @click="open = true"
        />
        <div
          v-if="open"
          class="absolute top-0 left-0 z-[999] w-full h-[320px] bg-[#501610]"
        >
          <Icon
            name="ic:outline-close"
            class="absolute z-50 cursor-pointer right-4 top-4"
            size="30"
            color="white"
            @click="open = false"
          />
          <SidebarMenu />
        </div>
      </div>

      <!-- Sidebar for Desktop (fixed) -->
      <div
        class="hidden lg:flex w-[190px] h-screen flex flex-col justify-between border-r"
      >
        <SidebarMenu />
        <div>UserItem</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const open = ref(false);
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
