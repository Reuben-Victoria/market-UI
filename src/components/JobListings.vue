<script setup lang="ts">
import { ref, defineProps } from "vue";
import jobsData from "@/jobs.json";
import JobListing from "./JobListing.vue";

const jobs = ref(jobsData);
defineProps({
    showButton: Boolean,
    limit: Number
})


</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
        Browse Jobs
      </h2>
      <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
        <JobListing v-for="job in jobs.jobs.slice(0, limit || jobs.jobs.length)" :key="job.id" :job="job" />
      </div>
    </div>
  </section>

  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <a
      class="block bg-black hover:text-white text-white text-center py-4 px-6 rounded-md hover:bg-gray-700"
      >View All Jobs</a
    >
  </section>
</template>
