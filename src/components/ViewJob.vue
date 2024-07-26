<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import Card from "./Card.vue";
import { JobType } from "./JobListings.vue";
import BackButton from "./BackButton.vue";

const state = reactive({
  job: <JobType>{},
  isLoading: true,
  isDeleting: false,
});

const route = useRoute();
const router = useRouter();
const jobId = route.params.id;

const deleteJob = async () => {
  try {
    state.isDeleting = true;
    await fetch(`http://localhost:5000/jobs/${jobId}`, { method: "DELETE" });
  } catch (error) {
    console.error(error);
  } finally {
    state.isDeleting = false;
    router.push(`/jobs`);
  }
};

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:5000/jobs/${jobId}`);
    state.job = await response.json();
  } catch (error) {
    alert(error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <BackButton />
  <main class="bg-green-100 w-full min-h-[calc(100vh-130px)] py-4 m-auto">
    <section
      v-if="!state.isLoading"
      class="container-xl h-full px-1 m-auto lg:container"
    >
      <div class="grid md:grid-cols-70/30 gap-6 px-4 md:px-16 lg:px-20">
        <div class="grid gap-4 h-fit">
          <Card bg="bg-white">
            <div class="grid gap-3">
              <p class="text-sm text-gray-400 font-medium">
                {{ state.job?.type }}
              </p>
              <h3 class="text-2xl font-bold">{{ state.job?.title }}</h3>
              <p class="text-red-400 text-sm">{{ state.job?.location }}</p>
            </div>
          </Card>

          <Card bg="bg-white">
            <div class="grid gap-3">
              <p class="text-green-900 font-bold">Job Description</p>
              <h3 class="text-sm">
                {{ state.job.description }}
              </h3>
              <p class="text-green-900 font-bold">Salary</p>
              <p class="text-balck text-sm">{{ state.job?.salary }} / Year</p>
            </div>
          </Card>
        </div>
        <div>
          <div class="grid gap-4">
            <Card bg="bg-white">
              <h3 class="font-bold mb-3">Company Info</h3>
              <div class="grid gap-3">
                <h4 class="text-xl font-medium">
                  {{ state.job?.company?.name }}
                </h4>
                <p>
                  {{ state.job?.company?.description }}
                </p>
                <hr class="border-b border-gray-100" />
                <div class="grid gap-2">
                  <h4 class="font-medium">Contact Email:</h4>
                  <div class="p-2 bg-green-100 font-bold">
                    {{ state.job?.company?.contactEmail }}
                  </div>
                  <h4 class="font-medium">Contact Phone:</h4>
                  <div class="p-2 bg-green-100 font-bold">
                    {{ state.job?.company?.contactPhone }}
                  </div>
                </div>
              </div>
            </Card>

            <Card bg="bg-white">
              <h3 class="font-bold mb-3">Manage Job</h3>
              <div class="grid gap-3">
                <button
                @click="router.push(`/job/edit/${jobId}`)"
                  class="bg-green-500 rounded-full border-0 text-white font-bold p-2"
                >
                  Edit Job
                </button>

                <button
                  @click="deleteJob"
                  class="bg-red-500 focus:outline-none rounded-full text-center grid place-content-center border-0 text-white font-bold p-2"
                >
                  <span v-if="!state.isDeleting">Delete Job</span>
                  <div v-else="!!state.isDeleting" class="text-white w-4 h-4">
                    <ClipLoader />
                  </div>
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
    <div
      v-else="!!state.isLoading"
      class="w-full h-full grid place-content-center"
    >
      <PulseLoader />
    </div>
  </main>
</template>
