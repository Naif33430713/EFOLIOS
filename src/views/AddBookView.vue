<template>
  <div class="container py-4">
    <h1 class="mb-3">Add Book</h1>

    <form @submit.prevent="addBook" class="mb-4">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input id="isbn" v-model="isbn" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input id="name" v-model="name" type="text" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <BookList />
    <QueryShowcase />
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../Firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'
import QueryShowcase from '../components/QueryShowcase.vue'

export default {
  components: { BookList, QueryShowcase },
  setup() {
    const isbn = ref('')
    const name = ref('')
    const addBook = async () => {
      const num = Number(isbn.value)
      if (isNaN(num)) { alert('ISBN must be a valid number'); return }
      await addDoc(collection(db, 'books'), {
  isbn: num,
  name: name.value.trim(),
  nameUpper: name.value.trim().toUpperCase()
})
      isbn.value = ''; name.value = '';
    }
    return { isbn, name, addBook }
  }
}
</script>