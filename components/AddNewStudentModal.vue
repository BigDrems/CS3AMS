<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
  >
    <div class="bg-white p-6 rounded shadow-lg max-w-lg w-full">
      <h2 class="text-lg font-bold mb-4">Add New Student</h2>
      <form @submit.prevent="submitForm">
        <!-- School ID Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">School ID</label>
          <input
            type="text"
            v-model="localStudent.schoolId"
            placeholder="Enter school ID"
            class="px-4 py-2 border rounded w-full"
            required
          />
        </div>

        <!-- Name Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            v-model="localStudent.name"
            placeholder="Enter name"
            class="px-4 py-2 border rounded w-full"
            required
          />
        </div>

        <!-- Email Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            v-model="localStudent.email"
            placeholder="Enter email"
            class="px-4 py-2 border rounded w-full"
            required
          />
        </div>

        <!-- Year Level Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Year Level</label>
          <select
            v-model="localStudent.yearLevel"
            class="px-4 py-2 border rounded w-full"
            required
          >
            <option value="" disabled>Select year level</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
        </div>

        <!-- Attendance Field -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Attendance</label>
          <select
            v-model="localStudent.attendance"
            class="px-4 py-2 border rounded w-full"
            required
          >
            <option value="" disabled>Select attendance</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div class="flex gap-2">
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Record
          </button>
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    showModal: Boolean,
    newStudent: {
      type: Object,
      default: () => ({
        schoolId: "", // Added schoolId here
        name: "",
        email: "",
        yearLevel: "",
        attendance: "",
      }),
    },
  },
  emits: ["close", "addRecord"],
  setup(props, { emit }) {
    const localStudent = ref({ ...props.newStudent });

    watch(
      () => props.newStudent,
      (newStudent) => {
        localStudent.value = { ...newStudent };
      }
    );

    function submitForm() {
      emit("addRecord", { ...localStudent.value });
      closeModal();
    }

    function closeModal() {
      emit("close");
      localStudent.value = { ...props.newStudent }; // Reset the localStudent to the initial prop value
    }

    return {
      localStudent,
      submitForm,
      closeModal,
    };
  },
};
</script>
