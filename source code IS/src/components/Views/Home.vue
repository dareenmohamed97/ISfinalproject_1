<template>
  <b-container>
    <h1 style="text-align: center;"><img
      src = "static/img/34251774-illustration-of-white-and-orange-icon-for-intranet.jpg"
      height=40
      width=40>{{ msg }}</h1>
    <br>

    <b-carousel
      id="carousel1"
      style="text-shadow: 1px 1px 2px #333;"
      controls
      indicators
      :interval="3000"
      v-model="slide"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >

      <!-- Text slides with image -->
      <b-carousel-slide
        img-src="static/img/welcome-2-1030x397.jpg"
      />

      <!-- Slides with custom text -->
      <b-carousel-slide
        img-src="static/img/shutterstock_173732543-800x450.jpg"/>

      <!-- Slides with image only -->
      <b-carousel-slide
        img-src="static/img/WhatsApp Image 2018-12-15 at 2.42.33 PM.jpeg"/>

      <!-- Slides with image only -->
      <b-carousel-slide
        img-src="static/img/cyber-security.png"/>

    </b-carousel>
    <br>
    <b-card>
      <h5 class="mt-0">About Us</h5>
      <p>
        Intranet is an online software platform that helps users gain access control and have access to certain features in the website.
      </p>
    </b-card>

  </b-container>
</template>
<script>
import bCarousel from 'bootstrap-vue/es/components/carousel/carousel'

export default {
  name: 'Homepage',
  components: {
    bCarousel
  },
  data () {
    return {
      msg: ' Welcome to Intranet!',
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
