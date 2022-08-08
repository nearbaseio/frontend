<template>
  <section id="home">
    <Hero ref="hero"></Hero>
    <!-- <Featured ref="featured"></Featured> -->
    <Top ref="top"></Top>
    <MeetNear ref="meetnear"></MeetNear>
  </section>
</template>

<script>
import Featured from './featured/Featured'
import Hero from './hero/Hero'
import MeetNear from './meetNear/MeetNear'
import Top from './top/Top'

export default {
  name: "home",
  components: {
    Hero,
    Featured,
    Top,
    MeetNear
  },
  data() {
    return {
    }
  },
  methods: {
  }
};
</script>

<style scoped>
#home {
  font-size: 16px;
}
</style>
