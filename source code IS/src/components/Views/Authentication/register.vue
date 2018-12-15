<template>
  <b-container>
    <br>
    <br>
    <b-card>
      <b-container>
        <br>
        <b-form-group label="Register">
          <br>
          <b-form-radio-group
            v-model="selected"
            :options="options"
            name="radiosStacked"/>
        </b-form-group>
        <br>
        <b-container>
          <register-lecturer v-if="selected === 'lecturer'"/>
          <register-teacher v-else-if="selected === 'teacher'"/>
          <register-student v-else-if="selected === 'student'"/>

        </b-container>
      </b-container>
    </b-card>
  </b-container>
</template>


<script>
import registerStudent from '@/components/Views/Authentication/registerStudent'
import registerTeacher from '@/components/Views/Authentication/registerTeacher'
import registerLecturer from '@/components/Views/Authentication/registerLecturer'

export default {
  components: {
    'register-lecturer' : registerLecturer,
    'register-teacher' : registerTeacher,
    'register-student' : registerStudent
  },

  data () {
    return {
      selected: 'lecturer',
      options: [
        { text: 'Register as an Lecturer', value: 'lecturer' },
        { text: 'Register as a Teacher', value: 'teacher' },
        { text: 'Register as a Student', value: 'student' }
      ]
    }
  }
}

</script>
