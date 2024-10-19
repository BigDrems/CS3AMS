<template>
  <div class="grid w-full gap-4 overflow-auto">
    <!-- Header Section -->
    <header class="flex items-start justify-between">
      <div class="grow m-0 p-0">
        <p>Members</p>
        <h1>Records</h1>
      </div>
      <!-- Placeholder for additional UI like profile or settings -->
      <div class="bg-neutral-200 w-[120px] h-[36px]"></div>
    </header>

    <!-- Button to Add New Record -->
    <button
      class="py-2 bg-blue-500 text-white rounded w-[190px]"
      @click="openModal"
    >
      Add New Record
    </button>

    <!-- Add New Record Modal -->
    <AddNewStudentModal
      v-if="showModal"
      :showModal="showModal"
      :newStudent="newStudent"
      @close="closeModal"
      @addRecord="addRecord"
    />

    <!-- Search and Filters Component -->
    <SearchAndFilter
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
      :total="totalPages"
      :sibling-count="2"
      show-edges
      :default-page="currentPage"
      @update:page="updatePage"
    >
      <template v-slot="{ page }">
        <PaginationList class="flex items-center gap-1">
          <PaginationFirst />
          <PaginationPrev />
          <template v-for="(item, index) in page.items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-10 h-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
                @click="updatePage(item.value)"
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
      </template>
    </Pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import AddNewStudentModal from "@/components/AddNewStudentModal.vue"; // Adjust the path as needed
import SearchAndFilter from "@/components/SearchAndFilter.vue"; // Adjust the path as needed
import DataTable from "@/components/DataTable.vue"; // Adjust the path as needed
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

import { columns } from "./column"; // Column definition

interface Student {
  schoolId: string;
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
const showModal = ref(false);
const newStudent = ref<Omit<Student, "studentId">>({
  schoolId: "",
  name: "",
  email: "",
  yearLevel: "",
  attendance: "",
});

const itemsPerPage = 10;
const currentPage = ref(1);

// Filter and paginate data
const filteredData = computed(() => {
  return data.value.filter((student: any) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      student.schoolId.toLowerCase().includes(searchQuery.value.toLowerCase());
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
  const endIndex = startIndex + itemsPerPage;
  return filteredData.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage);
});

// Methods to handle UI interactions
function openModal() {
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}
function addRecord(studentData: Omit<Student, "schoolId">) {
  const newStudentRecord: Student = {
    schoolId: "S" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    ...studentData, // Use the student data received from the event
  };

  data.value.push(newStudentRecord);

  // Reset the newStudent object if needed
  newStudent.value = {
    schoolId: "",
    name: "",
    email: "",
    yearLevel: "",
    attendance: "",
  };

  // Close the modal (optional if handled elsewhere)
  closeModal();
}

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

// Generate random data for testing
onMounted(() => {
  data.value = generateRandomStudentData(10);
});

function generateRandomStudentData(numStudents: number): Student[] {
  const names = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Michael Lee",
  ];
  const emails = ["gmail.com", "example.com", "school.edu"];
  const yearLevels = ["1", "2", "3", "4"];
  const attendanceStatus = ["Present", "Absent"];

  const randomStudents: Student[] = [];

  for (let i = 0; i < numStudents; i++) {
    const schoolId =
      "S" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const name = names[Math.floor(Math.random() * names.length)];
    const email =
      name.toLowerCase().replace(" ", ".") +
      "@" +
      emails[Math.floor(Math.random() * emails.length)];
    const yearLevel = yearLevels[Math.floor(Math.random() * yearLevels.length)];
    const attendance =
      attendanceStatus[Math.floor(Math.random() * attendanceStatus.length)];

    randomStudents.push({
      schoolId,
      name,
      email,
      yearLevel,
      attendance,
    });
  }

  return randomStudents;
}
</script>

<style scoped>
/* Add styles for the page */
</style>
