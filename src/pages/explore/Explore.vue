<template>
  <section id="explore" class="subparent sectionmobile divcol gap2">
    <aside class="contup space eliminarmobile">
      <h2>{{ title }}</h2>
      <div class="divrow gap2 h9_em">
        <template v-for="(item, index) in dataNavigationExplore">
          <a v-if="item.show" :key="index" :href="item.to" @click="ShowItems(item)">
            {{ item.name }}
          </a>
        </template>
      </div>
    </aside>
    <aside class="contup divcol vermobile gap2">
      <img class="align" :src="`${$store.state.baseURL}themes/${$store.state.theme}/explore-mobile.png`" alt="explore background">
      <v-card color="var(--clr-card-4)" class="h9_em align fill_w">
        <v-btn v-for="(item, index) in dataNavigationExplore" :key="index" :href="item.to"
          class="h12_em font2 bold" :class="{buttonsMobile:item.active}"
          @click="to(item)">
          {{ item.name }}
        </v-btn>
      </v-card>
    </aside>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "explore",
  data() {
    return {
      title: "MARKET",
      dataNavigationExplore: [],
      /*
      dataNavigationExplore: [
        {
          name: "MARKET",
          to: "#/explore/market",
          active: false,
          show: false
        },
        {
          name: "TRENDING",
          to: "#/explore/trending",
          active: false,
          show: false
        },
      ],*/
    }
  },
  methods: {
    to(item) {
      this.dataNavigationExplore.forEach(element => {
        element.active = false
      });
      item.active = true
    },
    ShowItems(item) {
      this.title = item.name;
      this.dataNavigationExplore.forEach(element => {
        element.show = true;
      });
      item.show = false;
    }
  }
};
</script>

<style src="./Explore.scss" lang="scss" />
