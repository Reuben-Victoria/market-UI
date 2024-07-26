<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
import Card from "./Card.vue";

defineProps({
  //   backgroundColor: {
  //     type: "bg-gray-100",
  //     default: "bg-gray-100",
  //   },
  //   buttonBackgroundColor: {
  //     type: "bg-gray-100",
  //     default: "bg-gray-100",
  //   },
  title: {
    type: String,
    default: "For developers",
  },
  subtitle: {
    type: String,
    default: "Browse our Vue jobs and start your career today",
  },
});
</script>

<template>
  <section class="py-4 w-full">
    <div class="container-xl lg:container m-auto w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg w-full">
        <Card>
          <h2 class="text-2xl font-bold">
            {{ title }}
          </h2>
          <p class="mt-2 mb-2">{{ subtitle }}</p>
          <RouterLink
            to="/jobs"
            class="inline-block bg-black hover:text-white text-white rounded-lg px-4 py-2 hover:bg-gray-700"
          >
            Browse Jobs
          </RouterLink>
        </Card>

        <Card bg="bg-green-100">
          <h2 class="text-2xl font-bold">
            {{ title }}
          </h2>
          <p class="mt-2 mb-2">
            List your jobs to find the perfect developer for the role
          </p>
          <RouterLink
            to="job/add"
            class="inline-block bg-green-500 hover:text-white text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            Add Job
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>
