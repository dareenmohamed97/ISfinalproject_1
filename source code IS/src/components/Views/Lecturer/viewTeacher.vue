<template>
  <b-container>
    <div class="table">
      <h3><b>All Teachers</b></h3>
      <br>
      <br>
      <div class="card1"/>
      <div class="card">
        <table style="width:100%">
          <tr>
            <th>Teacher's Name</th>
            <th>Email</th>
          </tr>
          <tr
            v-for="teacher in this.teachers.data"
            :key="teacher">
            <td>{{ teacher.firstName }}</td>
            <td>{{ teacher.email }}</td>
          </tr>
        </table>
      </div>
    </div>
  </b-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      teachers: [],
      errors: []
    }
  },
  // Fetches teachers when the component is created.
  created () {
    this.getData()
  },
  methods: {
    // gets all teachers from the db
    async getData () {
      await axios.get('/teacher/getTeachers')
        .then(response => {
          // JSON responses are automatically parsed.
          this.teachers = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
