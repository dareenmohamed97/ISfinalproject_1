<template>
  <b-container>
    <h1> Insert Grade </h1>
    <br>
    <b-card
      img-top>

      <b-form-input
        type="text"
        b-input-group
        v-model="vId"
        placeholder="Student ID"/>
      <br>

      <b-form-input
        type="text"
        v-model="vname"
        placeholder="Name"/>
      <br>

      <b-form-input
        type="text"
        v-model="vCourse"
        placeholder="Course"/>
      <br>
      <b-form-input
        type="text"
        v-model="vGrade"
        placeholder="Grade"/>
      <br>

    </b-card>
    <br>
    <b-container>
      <b-button
        variant="outline-primary"
        @click="onSubmit">Create now</b-button>
      <b-button
        variant="outline-primary"
        @click="goBack" >Cancel</b-button>
    </b-container>
  </b-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      vId: '',
      vname: '',
      vCourse: '',
      vGrade: '',
      errors: []
    }
  },
  methods: {
    onSubmit () {
      axios.post('/grades/createGrades', {
        studentId: this.vId,
        name: this.vname,
        Course: this.vCourse,
        Grade: this.vGrade
      })
        .then(response => {
          if (response.status === 200) {
            this.username = response.data.data
          }
          this.notify(response.status, response.data.msg)
          this.$router.push('/grades/create')
        })
        .catch(error => {
          module.status = error.response.data.msg
          this.notify(422, module.status)
        })
    },
    notify (status, msg) {
      let type = ''
      if (status >= 422) {
        type = 'error'
      } else {
        type = 'success'
      }
      this.$notify({
        title: (type === 'success') ? 'Success': 'Error',
        text: msg,
        type: type
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
