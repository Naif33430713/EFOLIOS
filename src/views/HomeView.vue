<template>
  <div class="container my-4">
    <h1 class="mb-3">Library Registration (Week 5)</h1>

    <form @submit.prevent="submitForm" class="row g-3">
      <!-- Username -->
      <div class="col-md-6 col-sm-6">
        <label for="username" class="form-label">Username</label>
        <input
          id="username"
          type="text"
          class="form-control"
          v-model="formData.username"
          @blur="() => validateUsername(true)"
          @input="() => validateUsername(false)"
        />
        <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
      </div>

      <!-- Password -->
      <div class="col-md-6 col-sm-6">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          type="password"
          class="form-control"
          v-model="formData.password"
          @blur="() => validatePassword(true)"
          @input="() => validatePassword(false)"
        />
        <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
      </div>

      
      <div class="col-md-6 col-sm-6">
        <label for="confirm-password" class="form-label">Confirm password</label>
        <input
          id="confirm-password"
          type="password"
          class="form-control"
          v-model="formData.confirmPassword"
          @blur="() => validateConfirmPassword(true)"
        />
        <div v-if="errors.confirmPassword" class="text-danger">
          {{ errors.confirmPassword }}
        </div>
      </div>

      
      <div class="col-md-6 col-sm-6 d-flex align-items-end">
        <div class="form-check">
          <input
            id="resident"
            type="checkbox"
            class="form-check-input"
            v-model="formData.isAustralian"
          />
          <label class="form-check-label" for="resident">I am an Australian resident</label>
        </div>
      </div>

      <div class="col-md-6 col-sm-6">
        <label class="form-label">Gender</label>
        <select class="form-select" v-model="formData.gender">
          <option value="">Select…</option>
          <option>Female</option>
          <option>Male</option>
          <option>Non-binary</option>
          <option>Prefer not to say</option>
        </select>
        <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
      </div>

     
      <div class="col-12">
        <label for="reason" class="form-label">Reason for joining</label>
        <textarea
          id="reason"
          class="form-control"
          rows="2"
          v-model="formData.reason"
          @input="checkFriendHint"
        ></textarea>
        <div v-if="friendHint" class="text-success mt-1">Great to have a friend!</div>
        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
      </div>

     
      <div class="col-md-6">
        <label for="suburbOneWay" class="form-label">
          Suburb (one-way with v-bind:value)
        </label>
        <input
          id="suburbOneWay"
          type="text"
          class="form-control"
          :value="formData.suburb"
        />
        <div class="form-text">
          Try typing here & check Vue DevTools → model won’t update (one-way).
        </div>
      </div>

      <div class="col-md-6">
        <label for="suburbTwoWay" class="form-label">
          Suburb (two-way with v-model)
        </label>
        <input
          id="suburbTwoWay"
          type="text"
          class="form-control"
          v-model="formData.suburb"
        />
        <div class="form-text">
          This one updates the model live (two-way).
        </div>
      </div>

      <!-- Buttons -->
      <div class="col-12 d-flex gap-2">
        <button type="submit" class="btn btn-primary">Create Account</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
      </div>

      <div class="col-12">
        <pre class="bg-light p-2 rounded small">{{ formData }}</pre>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton'
})

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  gender: null,
  reason: null
})

const friendHint = ref(false)

const validateUsername = (blur) => {
  if (!formData.value.username || formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Username must be at least 3 characters.'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  if (!formData.value.password || formData.value.password.length < 6) {
    if (blur) errors.value.password = 'Password must be at least 6 characters.'
  } else {
    errors.value.password = null
  }
}


const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const checkFriendHint = () => {
  const txt = formData.value.reason || ''
  friendHint.value = /friend/i.test(txt)
}

const validateRequireds = () => {
  if (!formData.value.gender) errors.value.gender = 'Please select a gender option.'
  else errors.value.gender = null

  if (!formData.value.reason) errors.value.reason = 'Please write a short reason.'
  else errors.value.reason = null
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    suburb: 'Clayton'
  }
  errors.value = {
    username: null,
    password: null,
    confirmPassword: null,
    gender: null,
    reason: null
  }
  friendHint.value = false
}

const submitForm = () => {
  validateUsername(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateRequireds()

  const hasErrors = Object.values(errors.value).some(Boolean)
  if (hasErrors) {
    alert('Please fix the errors and try again.')
    return
  }
  alert('Form submitted (demo).')
}
</script>

<style scoped></style>