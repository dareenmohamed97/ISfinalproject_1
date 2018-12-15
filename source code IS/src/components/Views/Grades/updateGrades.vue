<template>
  <b-container>
    <h3><b>Grades of students </b></h3>
    <b-card>
      <table style="width:100%">
        <tr>
          <th>Student Id</th>
          <th>Student Name</th>
          <th>Course</th>
          <th>Grade</th>
          <th>Update Grade</th>
        </tr>
        <tr
          v-for="grades in this.grades.data"
          :key="grades">
          <td>{{ grades.studentId }}</td>
          <td>{{ grades.name }}</td>
          <td>{{ grades.Course }}</td>
          <td>{{ grades.Grade }}</td>

          <td>  <b-form-input
            type="text"
            v-model="vgrade"
            placeholder="Update Grade"/>
          <br></td>
          <td><b-button
            type="button"
            class="btn btn-primary"
            @click="onUpdate(grades._id)">Update Grade</b-button></td>
        </tr>
      </table>
    </b-card>
  </b-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      grades: [],
      errors: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // gets all grades
    async getData () {
      await axios.get('/grades/getGrades')
        .then(response => {
          // JSON responses are automatically parsed.
          this.grades = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    Profile (_id) {
      axios.get('/teacher/searchTeacher/' + _id)
        .then(response => {
          if (response.status === 200) {
            console.log(response)
            this.getData()
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    // update grades
    onUpdate (_id) {
      axios.patch('/grades/updateGrades/' + _id, {
        Grade: this.vgrade
      })
        .then(response => {
          if (response.status === 200) {
            console.log(response)
            this.getData()
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
