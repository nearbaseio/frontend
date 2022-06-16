<template>
  <section id="featured" class="divcol">
    <!-- <aside class="center sectionmobile">
      <h2 class="relative font1 h5_emmobile" style="letter-spacing: 0.21em">FEATURED
        <div class="controls">
          <v-btn v-for="(item, index) in dataControls" :key="index"
            icon class="buttons-icon" :class="{inactive: item.inactive}"
            @click="ChangeSlides(item)">
            <v-icon class="vermobile" :class="{rotate: item.rotate}">{{ item.icon }}</v-icon>
            <img class="eliminarmobile" :class="{rotate: item.rotate}" :src="item.img" :alt="item.alt">
          </v-btn>
        </div>
      </h2>
    </aside> -->

    <!-- v-if="sliderMobile" -->
    <v-carousel
      v-model="slidesFeatured"
      hide-delimiters
      :show-arrows="false"
      v-touch="{
        left: () => swipe('left'),
        right: () => swipe('right'),
      }"
    >
      <template v-for="(item, index) in sliderFeatured">
        <v-carousel-item
          v-if="(index + 1) % columnsFeatured === 1 || columnsFeatured === 1"
          :key="index"
        >
          <v-row class="fill_height center padd2 relative sectionmobile">
            <template v-for="(n,i) in columnsFeatured">
              <template v-if="(+index + i) < sliderFeatured.length">
                <v-card color="transparent" class="cardFeatured divcol jstart" :key="i">
                  <img :src="sliderFeatured[+index + i].img" alt="Featured Images">
                  <aside class="divcol">
                    <span class="font2 h11_em normal">
                      {{ sliderFeatured[+index + i].subtitle }}
                    </span>
                    <h4 class="font2 h7_em bold p">
                      {{ sliderFeatured[+index + i].title }}
                    </h4>
                  </aside>
                </v-card>
              </template>
            </template>
          </v-row>
        </v-carousel-item>
      </template>
    </v-carousel>

    <!-- <v-carousel
      v-else
      v-model="slidesFeatured"
      hide-delimiters
      :show-arrows="false"
      v-touch="{
        left: () => swipe('left'),
        right: () => swipe('right'),
      }"
    >
      <template v-for="(item, index) in sliderFeatured">
        <v-carousel-item :key="index">
          <v-row class="fill_height center padd2 relative sectionmobile">
            <template v-for="(n,i) in 1">
              <template v-if="(+index + i) < sliderFeatured.length">
                <v-card color="transparent" class="cardFeatured divcol jstart" :key="i">
                  <img :src="sliderFeatured[+index + i].img" alt="Featured Images">
                  <aside class="divcol">
                    <span class="font2 h11_em normal">
                      {{ sliderFeatured[+index + i].subtitle }}
                    </span>
                    <h4 class="font2 h7_em bold p">
                      {{ sliderFeatured[+index + i].title }}
                    </h4>
                  </aside>
                </v-card>
              </template>
            </template>
          </v-row>
        </v-carousel-item>
      </template>
    </v-carousel> -->
  </section>
</template>

<script>
export default {
  name: "featured",
  data() {
    return {
      // dataControls: [
      //   {
      //     key: "prev",
      //     icon: "mdi-arrow-left",
      //     img: require("@/assets/icons/arrow-buttons.png"),
      //     alt: "slide button left",
      //     rotate: true,
      //     inactive: true,
      //   },
      //   {
      //     key: "next",
      //     icon: "mdi-arrow-right",
      //     img: require("@/assets/icons/arrow-buttons.png"),
      //     alt: "slide button right",
      //     inactive: true,
      //   },
      // ],
      slidesFeatured: 0,
      sliderFeatured: [
        {
          img: require("@/assets/images/featured.png"),
          subtitle: "SUBTITLE",
          title: "TITLE"
        },
        {
          img: require("@/assets/images/featured.png"),
          subtitle: "SUBTITLE",
          title: "TITLE"
        },
        {
          img: require("@/assets/images/featured.png"),
          subtitle: "SUBTITLE",
          title: "TITLE"
        },
        {
          img: require("@/assets/images/featured.png"),
          subtitle: "SUBTITLE",
          title: "TITLE"
        },
        {
          img: require("@/assets/images/featured.png"),
          subtitle: "SUBTITLE",
          title: "TITLE"
        },
        {
          img: require("@/assets/images/featured.png"),
          subtitle: "SUBTITLE",
          title: "TITLE"
        },
        {
          img: require("@/assets/images/featured.png"),
          subtitle: "SUBTITLE",
          title: "TITLE"
        },
      ],
      // sliderMobile: true,
    }
  },
  computed: {
    columnsFeatured() {
      if (this.$vuetify.breakpoint.xl) {
        return 3;
      } else
      if (this.$vuetify.breakpoint.lg) {
        return 3;
      } else
      if (this.$vuetify.breakpoint.md) {
        return 3;
      } else
      if (this.$vuetify.breakpoint.sm) {
        return 2;
      } else
      return 1;
    },
  },
  // mounted() {
  //   // window.addEventListener('resize', this.getDimensions);
  //   this.ShowSliderMobile()
  // },
  // unmounted() {
  //   // window.addEventListener('resize', this.getDimensions);
  //   this.ShowSliderMobile()
  // },
  methods: {
    // getDimensions() {
    //   this.ShowSliderMobile();
    // },
    // ShowSliderMobile() {
    //   if (window.innerWidth <= 600) {
    //     this.sliderMobile = false;
    //   }
    // },
    swipe (direction) {
      if (direction == "right") {
        this.$parent.$refs.hero.dataControls[0].inactive = false;
        this.$parent.$refs.hero.dataControls[1].inactive = true;
      }
      if (direction == "left") {
        this.$parent.$refs.hero.dataControls[1].inactive = false;
        this.$parent.$refs.hero.dataControls[0].inactive = true;
      }
    },
    // ChangeSlides(item) {
    //   if (item.key == "prev") {
    //     this.dataControls[1].inactive = true;
    //     item.inactive = false;
    //     this.slidesFeatured--
    //   }
    //   if (item.key == "next") {
    //     this.dataControls[0].inactive = true;
    //     item.inactive = false;
    //     this.slidesFeatured++
    //   }
    // }
  }
};
</script>

<style src="./Featured.scss" lang="scss" />
