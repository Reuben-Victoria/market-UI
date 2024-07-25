<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";

const x = ref(0);
const y = ref(0);

const name = ref("John");
const tasks = ref(["Task 1", "Task 2", "Task 3", "Task 4"]);
const status = ref("active");
const newTask = ref("");

watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

const toggleStatus = () => {
  if (status.value === "active") {
    status.value = "pending";
  } else if (status.value === "pending") {
    status.value = "active";
  } else {
    status.value = "active";
  }
};

const addTask = () => {
  if (!!newTask.value.trim()) {
    tasks.value.push(newTask.value);
    newTask.value = "";
  }
};

const deleteTask = (index: number) => {
  tasks.value.splice(index, 1);
};

onMounted(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    tasks.value = data.map((item: { title: string }) => item?.title);
  } catch (error) {
    console.log("Error fetching tasks", error);
  }
});
</script>
<template>
  <Navbar />
  <RouterView />

  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">Status is Active</p>
  <p v-else-if="status === 'pending'">Status is Pending</p>
  <form @submit.prevent="addTask">
    <label for="newTask">Add Task</label>
    <input v-model="newTask" id="newTask" name="newTask" />
    <button type="submit">Submit</button>
  </form>

  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span> {{ task }} </span>
      <button @click="deleteTask(index)">Delete</button>
    </li>
  </ul>
  <button @click="toggleStatus">Change Status</button>
</template>
