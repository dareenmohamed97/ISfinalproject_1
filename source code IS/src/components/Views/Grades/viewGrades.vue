<template>
  <b-container>
    <h3> View All Grades Of Students! </h3>
    <div>
      <br>
      <br>
      <b-form-input
        type="text"
        v-model="vname"
        placeholder="Student Name"/>
      <br>
      <b-button
        variant="outline-primary"
        @click="onClick" >Search Here!</b-button>
    </div>
    <br>
    <b-card>
      <table
        class = "table"
        style="width:100%">
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Course</th>
          <th>Grade</th>
        </tr>
        <tr
          v-for="grades in grades.data"
          :key="grades._id">
          <td>{{ grades.studentId }}</td>
          <td>{{ grades.name }}</td>
          <td>{{ grades.Course }}</td>
          <td>{{ grades.Grade }}</td>
        </tr>
      </table>
      <br>
    </b-card>
  </b-container>
</template>
<script>
import axios from 'axios'
export default {
  components: {
  },
  data () {
    return {
      vname: '',
      grades: [],
      errors: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // view all grades
    async getData () {
      await axios.get('/grades/getGrades')
        .then(response => {
          this.grades = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    async onClick () {
      if (this.vname) {
        await axios.get('/grades/searchGrades/' + this.vname)
          .then(response => {
            this.grades = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        this.getData()
      }
    }
  }
}
</script>
