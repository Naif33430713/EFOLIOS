<template>
  <div class="register container my-4" style="max-width: 480px">
    <h2 class="mb-3">Firebase Register</h2>
    <form @submit.prevent="registerUser" class="vstack gap-3">
      <input v-model="email" type="email" class="form-control" placeholder="Email" required />
      <input v-model="password" type="password" class="form-control" placeholder="Password" required />
      <button type="submit" class="btn btn-success">Register</button>
    </form>

    <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-success mt-2">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const auth = getAuth();

const registerUser = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    successMessage.value = "User registered successfully!";
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = error.message;
    successMessage.value = "";
  }
};
</script>