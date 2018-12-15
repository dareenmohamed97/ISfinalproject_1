<template>
  <b-container>
    <div class="table">
      <h3><b>Teachers list </b></h3>
      <div class="card1"/>
      <div class="card">
        <table style="width:100%">
          <tr>
            <th><font color="blue">firstName</font></th>
          </tr>
          <tr>
            <ul>
              <li
                v-for="teacher in this.teachers.data"
                :key="teacher">
                <td>{{ teacher.firstName }}</td> 
                <td><router-link :to="'/view/teacher/profile/'+ teacher._id">View profile</router-link></td>
                <br>
              </li>
            </ul>
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
      await axios.get('/teacher/viewTeachers')
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
