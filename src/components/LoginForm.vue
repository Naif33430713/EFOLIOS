<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center mb-4">User Information Form</h1>

        <!-- Form -->
        <form @submit.prevent="submitForm">
          <!-- Row 1: Username + Password -->
          <div class="row mb-3">
            <div class="col-6">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': !!errors.username }"
                v-model="formData.username"
                placeholder="Enter your username"
                @blur="validateName(true)"
                @input="validateName(false)"
              />
              <div v-if="errors.username" class="text-danger mt-1">{{ errors.username }}</div>
            </div>

            <div class="col-6">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': !!errors.password }"
                v-model="formData.password"
                placeholder="Enter a strong password"
                @blur="validatePassword(true)"
                @input="validatePassword(false)"
              />
              <div v-if="errors.password" class="text-danger mt-1">{{ errors.password }}</div>
            </div>
          </div>

          <!-- Row 2: Confirm Password + Gender -->
          <div class="row mb-3">
            <div class="col-6">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                class="form-control"
                :class="{ 'is-invalid': !!errors.confirmPassword }"
                v-model="formData.confirmPassword"
                placeholder="Re-enter your password"
                @blur="validatePasswordMatch(true)"
                @input="validatePasswordMatch(false)"
              />
              <div v-if="errors.confirmPassword" class="text-danger mt-1">{{ errors.confirmPassword }}</div>
            </div>

            <div class="col-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                :class="{ 'is-invalid': !!errors.gender }"
                v-model="formData.gender"
                @change="validateGender(true)"
              >
                <option disabled value="">Select…</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger mt-1">{{ errors.gender }}</div>
            </div>
          </div>

          <!-- Row 3: Resident + Reason -->
          <div class="row mb-3">
            <div class="col-6">
              <div class="form-check mt-4">
                <input
                  id="isAustralian"
                  type="checkbox"
                  class="form-check-input"
                  :class="{ 'is-invalid': !!errors.resident }"
                  v-model="formData.isAustralian"
                  @change="validateResident(true)"
                />
                <label class="form-check-label" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
              <div v-if="errors.resident" class="text-danger mt-1">{{ errors.resident }}</div>
            </div>

            <div class="col-6">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                id="reason"
                rows="3"
                class="form-control"
                :class="{ 'is-invalid': !!errors.reason }"
                v-model="formData.reason"
                placeholder="Tell us why you're joining (min 10 chars)"
                @blur="validateReason(true)"
                @input="validateReason(false)"
              ></textarea>
              <div v-if="errors.reason" class="text-danger mt-1">{{ errors.reason }}</div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="row g-2 mt-4">
            <div class="col-6">
              <button type="submit" class="btn btn-primary w-100">Submit</button>
            </div>
            <div class="col-6">
              <button type="button" class="btn btn-secondary w-100" @click="clearForm">
                Clear
              </button>
            </div>
          </div>
        </form>

        <!-- PrimeVue DataTable -->
        <DataTable
          v-if="submittedCards.length"
          :value="submittedCards"
          class="mt-5"
          tableStyle="min-width: 48rem"
        >
          <Column field="username" header="Username" />
          <Column field="password" header="Password" />
          <Column header="Resident">
            <template #body="slotProps">
              {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
            </template>
          </Column>
          <Column field="gender" header="Gender" />
          <Column field="reason" header="Reason" />
        </DataTable>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null
})

/* 1 & 2) Username: length + allowed chars */
const validateName = (blur) => {
  const u = (formData.value.username || '').trim()
  const msgs = []
  if (u.length < 3) msgs.push('Name must be at least 3 characters')
  if (u && !/^[A-Za-z0-9_]+$/.test(u)) msgs.push('Username can only contain letters, numbers, and underscores')
  if (msgs.length) {
    if (blur) errors.value.username = msgs.join('. ')
  } else {
    errors.value.username = null
  }
}

/* 3) Password strength */
const validatePassword = (blur) => {
  const p = formData.value.password || ''
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(p)
  const hasLowercase = /[a-z]/.test(p)
  const hasNumber = /\d/.test(p)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(p)

  const problems = []
  if (p.length < minLength) problems.push(`at least ${minLength} characters`)
  if (!hasUppercase) problems.push('one uppercase letter')
  if (!hasLowercase) problems.push('one lowercase letter')
  if (!hasNumber) problems.push('one number')
  if (!hasSpecialChar) problems.push('one special character')

  if (problems.length) {
    if (blur) errors.value.password = `Password must contain ${problems.join(', ')}`
  } else {
    errors.value.password = null
  }
}

/* 4) Confirm password matches */
const validatePasswordMatch = (blur) => {
  const p1 = formData.value.password || ''
  const p2 = formData.value.confirmPassword || ''
  if (p1 !== p2) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = null
  }
}

/* 5) Gender required */
const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select a gender'
  } else {
    errors.value.gender = null
  }
}

/* 6) Reason length */
const validateReason = (blur) => {
  const r = (formData.value.reason || '').trim()
  if (r.length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters'
  } else {
    errors.value.reason = null
  }
}

/* Optional: resident as an extra */
const validateResident = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.resident = 'Please confirm residency'
  } else {
    errors.value.resident = null
  }
}

const submittedCards = ref([])

const submitForm = () => {
  // Trigger all validators for submission
  validateName(true)
  validatePassword(true)
  validatePasswordMatch(true)
  validateGender(true)
  validateReason(true)
  validateResident(true)

  if (Object.values(errors.value).some(Boolean)) return

  // Add to table
  submittedCards.value.push({ ...formData.value })
  clearForm()
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    resident: null,
    gender: null,
    reason: null
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