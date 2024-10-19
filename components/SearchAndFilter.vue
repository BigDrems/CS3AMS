<template>
  <div class="mt-4 flex gap-4 items-center">
    <!-- Search Input -->
    <input
      type="text"
      v-model="localSearchQuery"
      placeholder="Search by name or email"
      class="px-4 py-2 border rounded"
      @input="emitSearchQuery"
    />

    <!-- Attendance Filter -->
    <select
      v-model="localAttendanceFilter"
      class="px-4 py-2 border rounded"
      @change="emitAttendanceFilter"
    >
      <option value="">All Attendance</option>
      <option value="Present">Present</option>
      <option value="Absent">Absent</option>
    </select>

    <!-- Year Level Filter -->
    <select
      v-model="localYearFilter"
      class="px-4 py-2 border rounded"
      @change="emitYearFilter"
    >
      <option value="">All Year Levels</option>
      <option value="1">Year 1</option>
      <option value="2">Year 2</option>
      <option value="3">Year 3</option>
      <option value="4">Year 4</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";

// Props to receive initial filter values
const props = defineProps({
  searchQuery: String,
  attendanceFilter: String,
  yearFilter: String,
});

// Local state for filters
const localSearchQuery = ref(props.searchQuery);
const localAttendanceFilter = ref(props.attendanceFilter);
const localYearFilter = ref(props.yearFilter);

// Emit events to update filters in the parent component
const emit = defineEmits([
  "updateSearchQuery",
  "updateAttendanceFilter",
  "updateYearFilter",
]);

function emitSearchQuery() {
  emit("updateSearchQuery", localSearchQuery.value);
}

function emitAttendanceFilter() {
  emit("updateAttendanceFilter", localAttendanceFilter.value);
}

function emitYearFilter() {
  emit("updateYearFilter", localYearFilter.value);
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
