<template>
  <section id="wallets" class="divcol">
    <section class="seccionControls divcol">
      <aside class="contControls">
        <v-btn v-for="(item,i) in $store.state.dataControls" :key="i" @click="SelectItem(item)"
          class="not_clr" :class="{active: item.active}">
          {{item.name}}
        </v-btn>
      </aside>
      
      <v-select
        v-if="$store.state.filterState"
        v-model="filterWallets.title"
        :items="filterWallets.by"
        background-color="transparent"
        hide-details
        :menu-props="{ bottom: true, offsetY: true }"
        class="filtro h11_em font2"
        v-on:change="select(filterWallets.title)"
      >
        <template v-slot:prepend-inner>
          <img src="@/assets/icons/filtrar.svg" alt="filter">
        </template>
        <template v-slot:append>
          <v-btn icon class="buttons-icon">
            <v-icon x-small>mdi-arrow-down</v-icon>
          </v-btn>
        </template>
        <template v-slot:item="slotProps">
          <span class="h11_em font2 semibold" style="letter-spacing: 0.07em !important">
            {{ slotProps.item }}
          </span>
        </template>
      </v-select>
    </section>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: "wallets",
  i18n: require("../i18n"),
  data() {
    return {
      filterWallets: {
        title: "filter by recent",
        by: ['filter by recent', 'filter by last'],
      },
    }
  },
  async mounted () {
    this.$store.state.user.filter = 'filter by recent'
  },
  methods: {
    SelectItem(item) {
      console.log(item)
      this.$router.push(item.to)
      this.$store.dispatch('NavigateWallets', {key: item.key})
      this.$store.dispatch('FilterState', {key: 'active'})
      this.$parent.publishBtn = true;
    },
    select(item){
      this.$store.state.user.filter = item
      console.log(this.$store.state.user.filter)
    }
  },
};
</script>

<style src="./Wallets.scss" lang="scss"></style>
