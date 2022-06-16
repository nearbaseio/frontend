<template>
  <section id="alerts">
    <v-snackbar
      v-for="(item, index) in dataAlerts" :key="index"
      v-model="item.model"
      centered
      right
      transition="slide-x-reverse-transition"
      color="var(--clr-btn)"
    >
      <template v-slot:action="{ attrs }">
        <v-btn class="h10_em semibolbold" color="red" text rounded v-bind="attrs" @click="item.model=false">
          {{$t('close')}}
        </v-btn>
      </template>

      <aside class="alert-content divcol">
        <div class="divrow acenter">
          <v-icon :style="`color: ${item.color} !important`" size="2.5rem">{{ item.icon }}</v-icon>
          <h3 class="h8_em p bold" :style="`color: ${item.color} !important`">{{ $t(item.key) }}</h3>
        </div>

        <span class="h11_em semibold">{{ $t(item.desc) }}</span>
      </aside>
    </v-snackbar>
  </section>
</template>

<script>
export default {
  name: "alerts",
  i18n: require("./i18n"),
  data() {
    return {
      alert: true,
      dataAlerts: [
        {
          key: "success",
          desc: "textSuccess",
          icon: "mdi-check-circle",
          color: "#A4FDDF",
          model: false,
        },
        {
          key: "cancel",
          desc: "textCancel",
          icon: "mdi-close-circle",
          color: "rgb(200, 0, 0)",
          model: false,
        }
      ]
    };
  },
  methods: {
    Alerts(key) {
      const index = this.dataAlerts.findIndex(data=>data.key==key);
      this.dataAlerts[index].model = true
    },
  }
};
</script>

<style src="./Alerts.scss" lang="scss"></style>
