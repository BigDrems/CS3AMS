<template>
  <div class="grid w-full gap-4">
    <!-- Other UI elements like header, buttons, etc. -->

    <!-- Search and Filters Component -->
    <SearchAndFilters
      :searchQuery="searchQuery"
      :attendanceFilter="selectedAttendanceFilter"
      :yearFilter="selectedYearFilter"
      @updateSearchQuery="updateSearchQuery"
      @updateAttendanceFilter="updateAttendanceFilter"
      @updateYearFilter="updateYearFilter"
    />

    <!-- Data Table -->
    <DataTable :columns="columns" :data="paginatedData" />

    <!-- Pagination Controls -->
    <Pagination
      v-slot="{ page }"
      :total="totalPages"
      :sibling-count="2"
      show-edges
      :default-page="currentPage"
      @update:page="updatePage"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst />
        <PaginationPrev />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis
            v-else
            :index="index"
            :key="'ellipsis-' + index"
          />
        </template>

        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SearchAndFilters from "@/components/SearchAndFilters.vue"; // Adjust the path accordingly
import { columns } from "./column";
import {
  Pagination,
  PaginationList,
  PaginationFirst,
  PaginationLast,
  PaginationPrev,
  PaginationNext,
  PaginationListItem,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface Student {
  studentId: string;
  name: string;
  email: string;
  yearLevel: string;
  attendance: string;
}

// Data and filters
const data = ref<Student[]>([]);
const searchQuery = ref("");
const selectedAttendanceFilter = ref("");
const selectedYearFilter = ref("");
const itemsPerPage = 5;
const currentPage = ref(1);

// Filter and paginate data
const filteredData = computed(() => {
  return data.value.filter((student: any) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesAttendanceFilter = selectedAttendanceFilter.value
      ? student.attendance === selectedAttendanceFilter.value
      : true;
    const matchesYearFilter = selectedYearFilter.value
      ? student.yearLevel === selectedYearFilter.value
      : true;
    return matchesSearch && matchesAttendanceFilter && matchesYearFilter;
  });
});

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filteredData.value.slice(startIndex, startIndex + itemsPerPage);
});

// Methods to handle updates
function updateSearchQuery(value: string) {
  searchQuery.value = value;
}

function updateAttendanceFilter(value: string) {
  selectedAttendanceFilter.value = value;
}

function updateYearFilter(value: string) {
  selectedYearFilter.value = value;
}

function updatePage(page: number) {
  currentPage.value = page;
}
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage);
});
</script>
