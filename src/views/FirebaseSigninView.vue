<template>
  <div class="signin container my-4" style="max-width: 480px">
    <h1 class="mb-3">Sign in</h1>
    <p>
      <input 
        type="text" 
        placeholder="Email" 
        v-model="email" 
        class="form-control mb-2"
      />
    </p>
    <p>
      <input 
        type="password" 
        placeholder="Password" 
        v-model="password" 
        class="form-control mb-2"
      />
    </p>
    <p>
      <button @click="signin" class="btn btn-primary">
        Sign in via Firebase
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Firebase Login Successful!")
      console.log("Current user:", auth.currentUser) // show signed-in user
      router.push("/") // redirect to home after login
    })
    .catch((error) => {
      console.log("Login failed:", error.code, error.message)
      alert("Login failed: " + error.message) // show popup for feedback
    })
}
</script>