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
              'name': 'View Grades',
              'to': '/grades/view-all'
            }
          ]
        }
    }
  }
</script>
