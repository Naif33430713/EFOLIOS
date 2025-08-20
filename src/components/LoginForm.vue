<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center mb-4">User Information Form</h1>

        <!-- Form -->
        <form @submit.prevent="submitForm">
          <!-- Row 1: Username + Password (2 columns at all widths) -->
          <div class="row mb-3">
            <div class="col-6">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                type="text"
                class="form-control"
                v-model="formData.username"
                placeholder="Enter your username"
              />
            </div>

            <div class="col-6">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                v-model="formData.password"
                placeholder="Enter a password"
              />
            </div>
          </div>

          <!-- Row 2: Checkbox + Gender (2 columns at all widths) -->
          <div class="row mb-3">
            <div class="col-6">
              <div class="form-check mt-4">
                <input
                  id="isAustralian"
                  type="checkbox"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
            </div>

            <div class="col-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
              >
                <option disabled value="">Select…</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <!-- Reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              id="reason"
              rows="3"
              class="form-control"
              v-model="formData.reason"
              placeholder="Tell us why you're joining"
            ></textarea>
          </div>

          <!-- Buttons: side by side at all widths -->
          <div class="row g-2 mt-4">
            <div class="col-6">
              <button type="submit" class="btn btn-primary w-100">Submit</button>
            </div>
            <div class="col-6">
              <button
                type="button"
                class="btn btn-secondary w-100"
                @click="clearForm"
              >
                Clear
              </button>
            </div>
          </div>
        </form>

        <!-- Submitted Cards -->
        <div class="row mt-5" v-if="submittedCards.length">
          <div class="d-flex flex-wrap justify-content-start">
            <div
              v-for="(card, index) in submittedCards"
              :key="index"
              class="card m-2"
              style="width: 18rem;"
            >
              <div class="card-header">
                User Information
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Username: {{ card.username }}</li>
                <li class="list-group-item">Password: {{ card.password }}</li>
                <li class="list-group-item">
                  Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
                </li>
                <li class="list-group-item">Gender: {{ card.gender }}</li>
                <li class="list-group-item">Reason: {{ card.reason }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Reactive form data
const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

// Stores submitted card data
const submittedCards = ref([])

// Submit form → add a copy of data to cards
const submitForm = () => {
  submittedCards.value.push({ ...formData.value })
  clearForm()
}

// Clear form fields
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275FDA;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>