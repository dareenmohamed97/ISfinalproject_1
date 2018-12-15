<template>
  <b-container>
    <br>
    <h1><font><b>Teacher Login</b></font></h1>
    <br>
    <h5><b>Please Insert your Username and Password</b></h5>
    <br>
    <b-form-input
      type="text"
      v-model="username"
      placeholder="Username"/>
    <br>
    <b-form-input
      type="password"
      v-model="password"
      placeholder="Password"/>
    <br>
    <br>
    <b-button
      type="button"
      class="btn btn-danger"
      @click="login">Login</b-button>
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  methods: {
    // Pushes posts to the server when called.
    login () {
      this.$store.dispatch('LOGIN', {
        username: this.username,
        password: this.password,
        type: 'teacher'
        }).then(() => {
          this.$router.push('/')
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
      }
    }
  }
  </script>
