<script setup>
import logo from "@/assets/images/svgs/vue.svg";
</script>

<template class="w-full">
  <nav class="bg-green-700 border-b border-green-500 w-full">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between w-full">
        <div
          class="flex items-center justify-center md:items-stretch md:justify-start"
        >
          <a class="flex flex-shrink-0 items-center mr-4" href="/">
            <img :src="logo" class="h-10 w-auto" alt="Vue Jobs" />
            <span class="text-2xl hidden md:block font-bold ml-2 text-white"
              >Vue Jobs</span
            >
          </a>
        </div>
        <div class="md:ml-auto">
          <div class="flex space-x-2">
            <a
              href="/"
              class="text-white hover:bg-green-900 hover:text-white rounded-md px-3 py-2"
              >Home</a
            >
            <a
              href="/jobs"
              class="text-white hover:bg-green-900 hover:text-white rounded-md px-3 py-2"
              >Jobs</a
            >
            <a
              href="/job/add"
              class="text-white hover:bg-green-900 hover:text-white rounded-md px-3 py-2"
              >Add Job</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
