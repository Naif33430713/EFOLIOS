<!-- src/components/QueryShowcase.vue -->
<template>
  <div class="mt-4">
 
    <section class="mb-4">
      <h3>Books with ISBN > 1000</h3>
      <ul v-if="q1.length">
        <li v-for="b in q1" :key="b.id">{{ b.name }} — ISBN: {{ b.isbn }}</li>
      </ul>
      <p v-else class="text-muted">No results.</p>
    </section>

    <hr class="my-4" />

   
    <section class="mb-4">
      <h5>Q2: orderBy(name, asc) + limit(5)</h5>
      <ul v-if="q2.length">
        <li v-for="b in q2" :key="b.id">{{ b.name }} — {{ b.isbn }}</li>
      </ul>
      <p v-else class="text-muted">No results.</p>
    </section>

   
    <section class="mb-4">
      <h5>Q3: names starting with "M" </h5>
      <ul v-if="q3.length">
        <li v-for="b in q3" :key="b.id">{{ b.name }} — {{ b.isbn }}</li>
      </ul>
      <p v-else class="text-muted">No results.</p>
    </section>

    <section class="mb-4">
      <h5>Q4: Top 5 by highest ISBN </h5>
      <ul v-if="q4.length">
        <li v-for="b in q4" :key="b.id">{{ b.name }} — {{ b.isbn }}</li>
      </ul>
      <p v-else class="text-muted">No results.</p>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../Firebase/init.js' 
import {
  collection, query, where, orderBy, limit, getDocs
} from 'firebase/firestore'

export default {
  setup() {
    const q1 = ref([]) 
    const q2 = ref([]) 
    const q3 = ref([]) 
    const q4 = ref([]) 

    onMounted(async () => {
    
      {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn', 'asc')
        )
        const snap = await getDocs(q)
        q1.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      }

      
      {
        const q = query(
          collection(db, 'books'),
          orderBy('name', 'asc'),
          limit(5)
        )
        const snap = await getDocs(q)
        q2.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      }

      
      {
        const q = query(
          collection(db, 'books'),
          orderBy('nameUpper', 'asc'),
          where('nameUpper', '>=', 'M'),
          where('nameUpper', '<=', 'M\uf8ff')
        )
        const snap = await getDocs(q)
        q3.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      }

     
      {
        const q = query(
          collection(db, 'books'),
          orderBy('isbn', 'desc'),
          limit(5)
        )
        const snap = await getDocs(q)
        q4.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      }
    })

    return { q1, q2, q3, q4 }
  }
}
</script>