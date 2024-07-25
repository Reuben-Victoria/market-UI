<script setup lang="ts">
import HomeCards from "@/components/HomeCards.vue";
import HeroSection from "@/components/HeroSection.vue";
import JobListings from "@/components/JobListings.vue";
</script>

<template>
  <HeroSection
    title="Become a Vue Dev"
    subtitle=" Find the Vue job that fits your skills and needs"
  />

  <HomeCards />
  <JobListings :limit="9" :showButton="true" />
</template>
