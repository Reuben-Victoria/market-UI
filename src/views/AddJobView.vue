<script setup lang="ts">
import { useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import router from "@/router";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { JobType } from "@/components/JobListings.vue";

const routes = useRoute();
const jobId = routes.params.id;

const isEdit = jobId !== undefined;

const state = reactive({
  job: <JobType>{},
  isLoadingForm: true,
});

const form = reactive({
  title: "",
  isLoading: false,
  type: "",
  location: "",
  description: "",
  salary: "",
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  },
});

const handleSubmit = async () => {
  form.isLoading = true;
  const newJob = {
    title: form.title,
    type: form.type,
    location: form.location,
    description: form.description,
    salary: form.salary,
    company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone,
    },
  };

  try {
    const response = await fetch("http://localhost:5000/jobs", {
      method: "POST",
      body: JSON.stringify(newJob),
    });

    const data: JobType = await response.json();
    router.push(`/jobs/${data.id}`);
  } catch (error) {
    console.log(error, "FORM");
  } finally {
  }
};

const handleUpdate = async () => {
  form.isLoading = true;
  const newJob = {
    title: form.title,
    type: form.type,
    location: form.location,
    description: form.description,
    salary: form.salary,
    company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone,
    },
  };

  try {
    const response = await fetch(`http://localhost:5000/jobs/${jobId ?? ""}`, {
      method: "PUT",
      body: JSON.stringify(newJob),
    });

    router.push(`/jobs/${jobId}`);
    console.log(response);
  } catch (error) {
    console.log(error, "FORM");
  } finally {
  }
};

onMounted(async () => {
  state.isLoadingForm = true;
  try {
    const response = await fetch(`http://localhost:5000/jobs/${jobId ?? ""}`);
    state.job = await response.json();

    form.title = state?.job?.title;
    (form.isLoading = false), (form.type = state.job?.type);
    form.location = state.job?.location;
    form.description = state.job?.description;
    form.salary = state.job?.salary;
    form.company = {
      name: state.job.company?.name,
      description: state.job?.company?.description,
      contactEmail: state.job?.company?.contactEmail,
      contactPhone: state.job?.company?.contactPhone,
    };
  } catch (error) {
    alert(error);
  } finally {
    state.isLoadingForm = false;
  }
});
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <form @submit.prevent="isEdit ? handleUpdate() : handleSubmit()">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Job Type</label
            >
            <select
              id="type"
              name="type"
              v-model="form.type"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"
              >Job Listing Name</label
            >
            <input
              type="text"
              id="name"
              name="name"
              v-model="form.title"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2"
              >Description</label
            >
            <textarea
              id="description"
              name="description"
              v-model="form.description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add any job duties, expectations, requirements, etc"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Salary</label
            >
            <select
              id="salary"
              v-model="form.salary"
              name="salary"
              class="border rounded w-full py-2 px-3"
              required
            >
              <option value="Under $50K">under $50K</option>
              <option value="$50K - $60K">$50 - $60K</option>
              <option value="$60K - $70K">$60 - $70K</option>
              <option value="$70K - $80K">$70 - $80K</option>
              <option value="$80K - $90K">$80 - $90K</option>
              <option value="$90K - $100K">$90 - $100K</option>
              <option value="$100K - $125K">$100 - $125K</option>
              <option value="$125K - $150K">$125 - $150K</option>
              <option value="$150K - $175K">$150 - $175K</option>
              <option value="$175K - $200K">$175 - $200K</option>
              <option value="Over $200K">Over $200K</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Location </label>
            <input
              type="text"
              id="location"
              name="location"
              v-model="form.location"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Company Location"
              required
            />
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2"
              >Company Name</label
            >
            <input
              type="text"
              id="company"
              name="company"
              v-model="form.company.name"
              class="border rounded w-full py-2 px-3"
              placeholder="Company Name"
            />
          </div>

          <div class="mb-4">
            <label
              for="company_description"
              class="block text-gray-700 font-bold mb-2"
              >Company Description</label
            >
            <textarea
              id="company_description"
              name="company_description"
              v-model="form.company.description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="What does your company do?"
            ></textarea>
          </div>

          <div class="mb-4">
            <label
              for="contact_email"
              class="block text-gray-700 font-bold mb-2"
              >Contact Email</label
            >
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              v-model="form.company.contactEmail"
              class="border rounded w-full py-2 px-3"
              placeholder="Email address for applicants"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="contact_phone"
              class="block text-gray-700 font-bold mb-2"
              >Contact Phone</label
            >
            <input
              type="tel"
              id="contact_phone"
              name="contact_phone"
              v-model="form.company.contactPhone"
              class="border rounded w-full py-2 px-3"
              placeholder="Optional phone for applicants"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              <span v-if="!(form.isLoading || state.isLoadingForm)">
                {{ isEdit ? "Update Job" : "Add Job" }}</span
              >
              <ClipLoader
                class="text-white"
                v-else="!!(form.isLoading || state.isLoadingForm)"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
