<template>
  <div id="app">
    <b-container
      tag="default-nav"
      v-if="!isLoggedIn"
      fluid/>
    <b-container
      tag="lecturer-nav"
      v-else-if="type === 'lecturer'"
      fluid/>
    <b-container
      tag="teacher-nav"
      v-else-if="type === 'teacher'"
      fluid/>
    <b-container
      tag="student-nav"
      v-else-if="type === 'student'"
      fluid/>
    <br>

    <notifications
      position="right"/>

    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DefaultNavBar from '@/components/UIComponents/Navigation/DefaultNavbar'
import LecturerNavbar from '@/components/UIComponents/Navigation/LecturerNavbar'
import StudentNavbar from '@/components/UIComponents/Navigation/StudentNavbar'
import TeacherNavbar from '@/components/UIComponents/Navigation/TeacherNavbar'

export default {

  name: 'App',
  components: {
    'default-nav': DefaultNavBar,
    'lecturer-nav': LecturerNavbar,
    'teacher-nav': TeacherNavbar,
    'student-nav': StudentNavbar
  },
  computed: {
    ...mapGetters({
      type: 'getType',
      isLoggedIn: 'isLoggedIn'
    })
  }
}
</script>

<style lang="scss">
@import './assets/styles/intranet-base.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
