<template>
  <div class="mt-4">
    <h3>All Books (Editable)</h3>

    <ul v-if="books.length" class="list-unstyled">
      <li v-for="b in books" :key="b.id" class="mb-2">
        <div v-if="editId !== b.id">
          <strong>{{ b.name }}</strong> — ISBN: {{ b.isbn }}
          <button class="btn btn-sm btn-outline-secondary ms-2" @click="startEdit(b)">Edit</button>
          <button class="btn btn-sm btn-outline-danger ms-1" @click="deleteBook(b.id)">Delete</button>
        </div>

        <div v-else class="d-flex gap-2 align-items-center">
          <input class="form-control form-control-sm" v-model="editName" placeholder="Name" style="max-width: 220px;" />
          <input class="form-control form-control-sm" v-model.number="editIsbn" placeholder="ISBN (number)" style="max-width: 160px;" />
          <button class="btn btn-sm btn-primary" @click="saveEdit(b.id)">Save</button>
          <button class="btn btn-sm btn-secondary" @click="cancelEdit">Cancel</button>
        </div>
      </li>
    </ul>

    <p v-else class="text-muted">No books yet.</p>
    <pre v-if="error" class="text-danger mt-3">{{ error }}</pre>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import db from '../Firebase/init.js' // match your folder case
import {
  collection, orderBy, onSnapshot,
  doc, updateDoc, deleteDoc, query
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const error = ref('')
    let unsub = null

    // edit state
    const editId = ref(null)
    const editName = ref('')
    const editIsbn = ref(null)

    onMounted(() => {
      try {
        // 👇 ALL books, ordered by name (change to orderBy('isbn','asc') if you prefer)
        const q = query(collection(db, 'books'), orderBy('name', 'asc'))
        unsub = onSnapshot(q, (snap) => {
          books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          if (editId.value && !books.value.find(x => x.id === editId.value)) cancelEdit()
        }, (err) => { error.value = String(err) })
      } catch (e) {
        error.value = String(e)
      }
    })

    onBeforeUnmount(() => unsub && unsub())

    const startEdit = (b) => { editId.value = b.id; editName.value = b.name; editIsbn.value = b.isbn }
    const cancelEdit = () => { editId.value = null; editName.value = ''; editIsbn.value = null }

    const saveEdit = async (id) => {
      try {
        const isbnNum = Number(editIsbn.value)
        if (isNaN(isbnNum)) { alert('ISBN must be a number'); return }
        await updateDoc(doc(db, 'books', id), { name: editName.value, isbn: isbnNum })
        cancelEdit()
        alert('Updated successfully!')
      } catch (e) { console.error(e); alert('Update failed (see console)') }
    }

    const deleteBook = async (id) => {
      if (!confirm('Delete this book?')) return
      try { await deleteDoc(doc(db, 'books', id)); alert('Deleted.') }
      catch (e) { console.error(e); alert('Delete failed (see console)') }
    }

    return { books, error, editId, editName, editIsbn, startEdit, cancelEdit, saveEdit, deleteBook }
  }
}
</script>