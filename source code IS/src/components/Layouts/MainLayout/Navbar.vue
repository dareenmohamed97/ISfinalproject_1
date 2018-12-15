<template>
  <b-navbar
    toggleable="md"
    type="light"
    variant="primary">

    <b-navbar-toggle target="nav_collapse"/>

    <b-navbar-brand to="/">Intranet</b-navbar-brand>

    <b-collapse
      is-nav
      id="nav_collapse">

      <b-navbar-nav
        v-for="link in links"
        :key="link.name">
        <b-nav-item
          v-if="!link.isDropdown"
          :to="link.to"
        >{{ link.name }}</b-nav-item>
        <b-nav-item-dropdown v-else>
          <!-- Using button-content slot -->
          <template slot="button-content">
            {{ link.name }}
          </template>
          <div
            v-for="dropdownLink in link.dropdown"
            :key="dropdownLink.name">
            <b-dropdown-item :to="dropdownLink.to">{{ dropdownLink.name }}</b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown
          right
          v-if="isLoggedIn">
          <!-- Using button-content slot -->
          <template slot="button-content">
            Hello, {{ name }}
          </template>
          <b-dropdown-item
            @click="logout">Signout</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-navbar-nav v-else>
          <b-nav-item to="/register">Register</b-nav-item>
          <b-nav-item to="/login">Login</b-nav-item>
        </b-navbar-nav>

    </b-navbar-nav></b-collapse>
  </b-navbar>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    links: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      name: 'getName',
      isLoggedIn: 'isLoggedIn'
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('LOGOUT')
        .then(()=> {
          this.$router.push('/')
        })
    }
  }
}
</script>
