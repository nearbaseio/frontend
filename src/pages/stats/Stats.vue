<template>
  <section id="stats" class="subparent divcol gap2 scroll_h">
    <aside class="contup space eliminarmobile">
      <h2>{{ title }}</h2>
      <div class="divrow gap2 h9_em">
        <template v-for="(item, index) in dataNavigationExplore">
          <a class="h8_em" v-if="item.show" :key="index" :href="item.to" @click="ShowItems(item)">
            {{ item.name }}
          </a>
        </template>
      </div>
    </aside>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "stats",
  data() {
    return {
      title: "RANKING",
      dataNavigationExplore: [
        {
          name: "RANKING",
          to: "#/stats/ranking",
          show: false
        },
        {
          name: "ACTIVITY",
          to: "#",
          show: false
        },
      ],
    }
  },
  methods: {
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

<style src="./Stats.scss" lang="scss" />
