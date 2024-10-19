<template>
  <div class="lg:flex h-screen">
    <!-- Sidebar (Sticky on large screens) -->
    <div class="sticky top-0 lg:w-[250px] h-full">
      <Sidebar />
    </div>

    <!-- Main Content (Scrollable) -->
    <div class="p-8 w-full overflow-auto">
      <slot />
    </div>
  </div>
</template>
