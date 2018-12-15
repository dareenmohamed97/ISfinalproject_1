<template>
  <b-container>
    <h1><b>Registration if you are a student </b></h1>
    <br>
    <h5><font color="red"><b>Insert All The Fields</b></font> </h5>
    <br>
    <b-form>
      <b-form-input
        type="text"
        v-model="username"
        placeholder="Username"/>
      <br>
      <b-form-input
        type="text"
        v-model="firstName"
        placeholder="Firstname"/>

      <br>
      <b-form-input
        type="text"
        v-model="lastName"
        placeholder="Lastname"/>

      <br>
      <b-form-input
        type="text"
        v-model="email"
        placeholder="Email"/>

      <br>
      <b-form-input
        type="text"
        v-model="ID"
        placeholder="ID"/>

      <br>
      <b-form-input
        type="password"
        v-model="password"
        :state="passwordState"
        aria-describedby="inputLiveFeedback"
        placeholder="Password"/>
      <b-form-invalid-feedback id="passwordLiveFeedback">
        <!-- This will only be shown if the preceeding input has an invalid state -->
        Enter at least 8 characters
      </b-form-invalid-feedback>

      <br>

      <b-button
        type="button"
        class="btn btn-danger"
        @click="register">Register</b-button>

    </b-form>
  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      ID: '',
      password: '',
      errors: []
    }
  },
  computed: {
    passwordState () {
      return this.password.length >= 8 ? true : false
    }
  },
  methods: {
    // Pushes posts to the server when called.
    register () {
      axios.post('/student/registerStudent', {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        ID: this.ID,
        password: this.password
      })
        .then(response => {
          if (response.status === 200) {
            this.username = response.data.data
          }
          this.notify(response.status, response.data.msg)
          this.$router.push('/login')
        })
        .catch(error => {
          module.status = error.response.data.msg;
          this.notify(422 ,module.status)
        });
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
  }
}
</script>
