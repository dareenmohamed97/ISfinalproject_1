<template>
  <nav-bar :links="links"/>
</template>

<script>
import NavBar from '@/components/Layouts/MainLayout/Navbar'
export default {
  components: {
    'nav-bar': NavBar
  },
  data: function () {
    return {
      links: [
        {
          'name': 'View Teachers',
          'isDropdown': false,
          'to': '/view/Teacher'
        },
        {
          'name': 'Update Grades',
          'isDropdown': false,
          'to': '/grades/updateGrades'
        },
        {
          'name': 'Insert Grade',
          'to': '/grades/create'
        }
      ]
    }
  }
}
</script>
