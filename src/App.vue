<script lang="ts">
export default {
  data() {
    return {
      name: "Reuben Victoria",
      // status: true
      status: "pending",
      tasks: ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"],
      link: "https://www.google.com",
    };
  },
  methods: {
    toggleStatus() {
      if (this.status === "active") {
        this.status = "pending";
      } else if (this.status === "pending") {
        this.status = "active";
      } else {
        this.status = "active";
      }
    },
  },
};
</script>

<template>
  <div>
    <p>This is {{ name }}'s first attempt with Vue</p>
    <!-- <p v-if="status">Hello Universe</p>
    <p v-else>User is inactive</p> -->
    <p v-if="status === 'active'">The Status is active</p>
    <p v-else-if="status === 'pending'">The Status is Pending</p>
    <p v-else>The Status is Unknown</p>

    <div>
      <h3>Tasks:</h3>
      <ul>
        <li v-for="task in tasks" v-bind:key="task">{{ task }}</li>
      </ul>
    </div>
    <a v-bind:href="link">Click me to open google</a>
    <button @click="toggleStatus">Change Status</button>
  </div>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vitu + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
