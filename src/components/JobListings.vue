<script setup lang="ts">
import { RouterLink } from "vue-router";
import { defineProps, onMounted, reactive } from "vue";
import JobListing from "./JobListing.vue";

interface JobCompanyType {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

export interface JobType {
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: JobCompanyType;
  id: string;
}

const state = reactive({
  jobs: <JobType[]>[],
  isLoading: <boolean>true,
});
defineProps({
  showButton: Boolean,
  limit: Number,
});

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:5000/jobs");
    state.jobs = await response.json();
  } catch (error) {
    alert(error);
    console.log(error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        <JobListing
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job="job"
        />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/jobs"
      class="block bg-black hover:text-white text-white text-center py-4 px-6 rounded-md hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
