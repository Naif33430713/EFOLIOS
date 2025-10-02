<template>
  <div style="max-width:640px;margin:40px auto;font-family:system-ui,Arial">
    <h1 style="text-align:center;margin-bottom:18px">Book Counter & Manager</h1>

    <!-- ADD BOOK -->
    <section style="border:1px solid #ddd;border-radius:12px;padding:16px;margin-bottom:18px">
      <h2 style="margin:0 0 12px">Add Book</h2>

      <form @submit.prevent="addBook" style="display:grid;gap:10px">
        <label>
          Title
          <input v-model="title" required placeholder="e.g. first book" style="width:100%;padding:8px"/>
        </label>

        <label>
          Author
          <input v-model="author" required placeholder="e.g. author a" style="width:100%;padding:8px"/>
        </label>

        <label>
          ISBN
          <input v-model="isbn" required placeholder="e.g. 100" style="width:100%;padding:8px"/>
        </label>

        <button type="submit" style="padding:10px 14px;cursor:pointer">Add to Firestore</button>
      </form>

      <p v-if="status" style="margin-top:10px">{{ status }}</p>
    </section>

    <!-- RETRIEVE: COUNT (Cloud Function) -->
    <section style="border:1px solid #ddd;border-radius:12px;padding:16px;margin-bottom:18px">
      <h2 style="margin:0 0 12px">Retrieve Count</h2>
      <button @click="getBookCount" style="padding:10px 14px;cursor:pointer">Get Book Count</button>

      <p v-if="count !== null" style="margin-top:10px">
        Total number of books: {{ count }}
      </p>
      <p v-else-if="error" style="margin-top:10px;color:#b00020">
        {{ error }}
      </p>
    </section>

    <!-- RETRIEVE: LIST (direct from Firestore) -->
    <section style="border:1px solid #ddd;border-radius:12px;padding:16px">
      <h2 style="margin:0 0 12px">Retrieve Books</h2>
      <button @click="getBooks" style="padding:10px 14px;cursor:pointer">Get Books</button>

      <ul v-if="books.length" style="margin-top:12px;line-height:1.8">
        <li v-for="b in books" :key="b.id">
          <strong>{{ b.name || b.title || '(no name)' }}</strong>
          <span v-if="b.author"> — {{ b.author }}</span>
          <span v-if="b.isbn"> (ISBN: {{ b.isbn }})</span>
        </li>
      </ul>

      <p v-else style="margin-top:10px;color:#666">No books loaded yet.</p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { app } from '../firebase'
import {
  getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit
} from 'firebase/firestore'

const db = getFirestore(app)

export default {
  data() {
    return {
      // form fields
      title: '',
      author: '',
      isbn: '',
      // UI state
      status: '',
      count: null,
      error: null,
      books: []
    }
  },
  methods: {
    // --- ADD ---
    async addBook() {
      this.status = 'Saving...'
      this.error = null
      try {
        await addDoc(collection(db, 'books'), {
          
          name: this.title,
          author: this.author,
          isbn: this.isbn,
          createdAt: serverTimestamp()
        })
        this.status = 'Wait for three secods, then fetch count and list again.'
        // clear inputs
        this.title = ''
        this.author = ''
        this.isbn = ''
      } catch (e) {
        console.error(e)
        this.status = ''
        this.error = 'Failed to add book.'
      }
    },

    async getBookCount() {
      try {
        const response = await axios.get(
          "https://countbooks-f33eca4a2a-uc.a.run.app"   
        )
        this.count = response.data.count
        this.error = null
      } catch (err) {
        console.error("Error fetching book count:", err)
        this.error = "Error fetching book count"
        this.count = null
      }
    },


    async getBooks() {
      this.error = null
      this.books = []
      try {
       
        const q = query(collection(db, 'books'), orderBy('createdAt', 'desc'), limit(10))
        const snap = await getDocs(q)
        this.books = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      } catch (e) {
        console.error(e)
        
        try {
          const snap = await getDocs(collection(db, 'books'))
          this.books = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        } catch (e2) {
          console.error(e2)
          this.error = 'Failed to fetch books.'
        }
      }
    }
  }
}
</script>