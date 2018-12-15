<template>
  <b-container>
    <h1> Your Current Grades </h1>
    <div>
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
          <th>Student ID </th>
          <th>Name   </th>
          <th>Course   </th>
          <th>Grade  </th>
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
import { mapGetters } from 'vuex'

export default {
computed: {
  ...mapGetters({
    name: 'getName',
    isLoggedIn: 'isLoggedIn'
  })
},
  components: {
  },
  data () {
    return {
      vname: '',
      grades: [],
      errors: []
    }
  },
  // Fetches grades when the component is created.
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      if (this.name) {
        await axios.get('/grades/searchGrades/' + this.name)
          .then(response => {
            this.grades = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        this.getData()
      }
    },
    async onClick () {
    if (!(this.vname === this.name) )
    {
    this.notify(422 ,module.status)
    }
      else if (this.vname === this.name ) {
        await axios.get('/grades/searchGrades/' + this.vname)
          .then(response => {
            this.grades = response.data
          })
          .catch(e => {
          module.status = error.response.data.msg;
          this.notify(422 ,module.status)
          })
      } else {
        this.getData()
      }
    },
    notify (status, msg) {
      let type = ''
      if (status > 200) {
        type = 'error'
      } else {
        type = 'success'
      }
      this.$notify({
        title: (type === 'success') ? 'Success': 'Error Access Denied',
        text: msg,
        type: type
      })
    },
  }
}
</script>
<style>
</style>
