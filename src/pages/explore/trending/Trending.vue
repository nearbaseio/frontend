<template>
  <section class="contTrending">
    <v-card v-for="(item, index) in dataTrending" :key="index"
      color="var(--clr-card-3)" class="cartas divrowmobile">
      <aside class="end">
        <v-card
          color="#ECEBFF"
          style="display: flex"
          class="divcol acenter"
          :class="{active:item.active}"
          @click="ActiveClass(item)"
        >
          <img :src="item.img" alt="Top images">
          <h4 class="h8_em">{{ item.initials }}</h4>
        </v-card>
      </aside>

      <aside class="jstart divcol font2 semibold" style="gap: clamp(1em, 1.5vw, 1.5em); line-height: 1.5625em">
        <div class="divcol">
          <h3 class="font1 h5_em p">{{ item.title}}</h3>
          <span class="h10_em">by <a :href="item.toBy">{{ item.by }}</a></span>
        </div>

        <div class="divcol h10_em">
          <span>Explore the collection</span>
          <a :href="item.link">{{ item.link }}</a>
          <p v-if="textMobile" class="h11_em p">{{ item.textMobile }}</p>
        </div>

        <p v-if="textDesktop" class="h10_em">{{ item.text }}</p>
      </aside>
    </v-card>
  </section>
</template>
<script>
export default {
  name: "trending",
  data() {
    return {
      dataTrending: [
        {
          active: false,
          img: require("@/assets/images/cat.png"),
          initials: "J.D",
          title: "MURI",
          by: "Muri.Deployer",
          toBY: "#",
          link: "htt://linkmd.ee/TTSdesployer.com",
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ...",
          textMobile: "Muri Despoyer is a collection deve..."
        },
        {
          active: false,
          img: require("@/assets/images/bear.png"),
          initials: "D.M",
          title: "MURI",
          by: "Muri.Deployer",
          toBY: "#",
          link: "htt://linkmd.ee/TTSdesployer.com",
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ...",
          textMobile: "Muri Despoyer is a collection deve..."
        },
        {
          active: false,
          img: require("@/assets/images/polar-bear.png"),
          initials: "P.B",
          title: "MURI",
          by: "Muri.Deployer",
          toBY: "#",
          link: "htt://linkmd.ee/TTSdesployer.com",
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ...",
          textMobile: "Muri Despoyer is a collection deve..."
        },
        {
          active: false,
          img: require("@/assets/images/gorilla.png"),
          initials: "W.V",
          title: "MURI",
          by: "Muri.Deployer",
          toBY: "#",
          link: "htt://linkmd.ee/TTSdesployer.com",
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ...",
          textMobile: "Muri Despoyer is a collection deve..."
        },
        {
          active: false,
          img: require("@/assets/images/weasel.png"),
          initials: "A.L",
          title: "MURI",
          by: "Muri.Deployer",
          toBY: "#",
          link: "htt://linkmd.ee/TTSdesployer.com",
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and ...",
          textMobile: "Muri Despoyer is a collection deve..."
        },
      ],
      textDesktop: true,
      textMobile: false,
    }
  },
  mounted() {
    window.addEventListener('resize', this.TextMobile);
    this.TextMobile();
    this.$parent.title = 'TRENDING'
    this.$parent.dataNavigationExplore.forEach(element => {
      element.show = true;
      element.active = false;
    });
    this.$parent.dataNavigationExplore[0].show = false;
    this.$parent.dataNavigationExplore[0].active = true;
  },
  unmounted() {
    window.addEventListener('resize', this.TextMobile);
  },
  methods: {
    ActiveClass(item) {
      if (item.active == false) {
        this.dataTrending.forEach(element => {
          element.active = false
        });
        item.active = true
      } else {
        this.dataTrending.forEach(element => {
          element.active = false
        });
      }
    },
    TextMobile() {
      if (window.innerWidth <= 880) {
        this.textDesktop = false;
        this.textMobile = true;
      } else {
        this.textDesktop = true;
        this.textMobile = false;
      }
    }
  }
};
</script>

<style src="./Trending.scss" lang="scss" />
