<template>
  <v-app id="layout">
    <Header style="z-index: 20" ref="header" />
    <v-main class="wrapperSpace" :class="{delWrapperSpacerapperMobile: wrapperSpace}">
      <router-view></router-view>
    </v-main>
    <Footer ref="footer" />
  </v-app>
</template>

<script>
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "./Layout.scss";

export default {
  name: "layout",
  components: { Footer, Header },
  data() {
    return {wrapperSpace: false}
  },
  methods: {
    AdjustWrapperSpace(key) {
      if (key == 'active') {this.wrapperSpace = true}
      if (key == 'inactive') {this.wrapperSpace = false}
    }
  }
}
</script>
