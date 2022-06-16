<template>
  <section id="notifications" class="divcol gap2">
    <v-card v-for="(item, i) in dataNotifications" :key="i" :ripple="true"
      style="display:flex" class="relative" color="rgba(236, 235, 255, 0.3)">
      <v-chip v-if="item.new" class="h10_em font2">NEW</v-chip>
      <div class="divcol">
        <span class="titulo h8_em">{{item.title}}</span>
        <p class="h11_em p font2">
          {{item.textTitle}}<br v-if="item.textTitle">
          <span v-if="!item.link">{{item.text}}</span>
          <a v-if="item.link" :href="item.link" target="_blank">{{item.text}}</a>
        </p>
      </div>
      <span class="date h11_em font2">{{item.date}}</span>
    </v-card>
  </section>
</template>

<script>
export default {
  name: "notifications",
  i18n: require("../i18n"),
  data() {
    return {
      dataNotifications: [
        {
          new: true,
          title: "new sale",
          text: "your wallet miura.near has been sold yesterday at 23:45 by 0,008 ETH",
          date: "12 MAY",
        },
        {
          new: false,
          title: "successfull purchase",
          textTitle: "You have successfull purchased the wallet",
          text: "http://jnahhdfbeb.qbfhwbuybwbfwoj.nauibd",
          link: "http://jnahhdfbeb.qbfhwbuybwbfwoj.nauibd",
          date: "13 MAY",
        },
        {
          new: false,
          title: "new offer",
          textTitle: "for you wallet:",
          text: "http:mwunnuvnme.5252d952wmjhijj//Own",
          link: "http:mwunnuvnme.5252d952wmjhijj//Own",
          date: "13 MAY",
        },
        {
          new: false,
          title: "successfull purchase",
          textTitle: "You have successfull purchased the wallet",
          text: "http://jnahhdfbeb.qbfhwbuybwbfwoj.nauibd",
          link: "http://jnahhdfbeb.qbfhwbuybwbfwoj.nauibd",
          date: "13 MAY",
        },
      ],
    }
  },
  methods: {
  },
};
</script>

<style src="./Notifications.scss" lang="scss"></style>
