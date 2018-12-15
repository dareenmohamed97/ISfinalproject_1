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
          'name': 'view my grades',
          'to': '/grades/viewMyGrades'
        }
          ]
        }
    }
  }
</script>
