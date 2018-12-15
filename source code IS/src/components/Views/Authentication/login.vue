
<template>
  <b-container>
    <br>
    <br>
    <b-card>
      <br>

      <b-form-group label="Login">
        <br>
        <b-form-radio-group
          id="login"
          v-model="selected"
          :options="options"
          name="login"/>
      </b-form-group>
      <br>
      <login-lecturer v-if="selected === 'lecturer'"/>
      <login-teacher v-else-if="selected === 'teacher'"/>
      <login-student v-else-if="selected === 'student'"/>
    </b-card>
  </b-container>
</template>

<script>
import loginStudent from '@/components/Views/Authentication/loginStudent'
import loginTeacher from '@/components/Views/Authentication/loginTeacher'
import loginLecturer from '@/components/Views/Authentication/loginLecturer'

export default {

  components: {
    'login-lecturer' : loginLecturer,
    'login-teacher' : loginTeacher,
    'login-student' : loginStudent
  },

  data () {
    return {
      selected: 'lecturer',
      options: [
        { text: 'Login as an Lecturer', value: 'lecturer' },
        { text: 'Login as a Teacher', value: 'teacher' },
        { text: 'Login as a Student', value: 'student' }
      ]
    }
  }
}

</script>
