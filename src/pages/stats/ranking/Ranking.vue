<template>
  <section class="contRanking divcol">
    <section class="headerMobile divcol vermobile gap2 section">
      <img class="align" :src="`${$store.state.baseURL}themes/${$store.state.theme}/ranking-mobile.png`" alt="ranking background">

      <v-card color="var(--clr-card-4)" class="controlsMobile h9_em align fill_w">
        <v-btn v-for="(item, index) in dataFilterRanking" :key="index" class="h12_em font2 bold"
          :class="{active:item.active}" @click="dataFilterRanking.forEach(element => {element.active = false});item.active=true">
          <v-select
            v-model="item.title"
            :items="item.items"
            solo
            background-color="transparent"
            hide-details
            :menu-props="{ bottom: true, offsetY: true }"
            class="h11_em"
          >
            <template v-slot:item="slotProps">
              <span class="h12_em font2 semibold" style="letter-spacing: 0.07em !important">
                {{ slotProps.item }}
              </span>
            </template>
          </v-select>
        </v-btn>
      </v-card>
    </section>

    <section class="contlist divcol">
      <div v-for="(item, index) in dataRanking" :key="index"
        class="listRanking space relative">
        <aside class="wrapper-left divrow">
          <div class="wrapperCard">
            <v-card color="var(--clr-card-5)" class="end" style="display:flex" :class="{active: item.active}" @click="item.active = !item.active">
              <span class="number normal">{{ item.number }}</span>
              <img :src="item.img" alt="referencial image">
            </v-card>
          </div>

          <div class="contText divcol jcenter font2">
            <h3 class="font1 h6_em p not_typography eliminarmobile">{{ item.title }}</h3>
            <h3 class="font1 h5_em p not_typography vermobile">{{ item.name }}</h3>

            <span class="h11_em eliminarmobile">
              by <a href="#" class="bold">{{ item.deployer }}</a><br>
              Sale ends <strong>{{ item.date }}</strong> at <strong>{{ item.hour }}pm</strong> CET
            </span>
            <a :href="item.more" class="h10_em vermobile bold">+MORE</a>
          </div>
        </aside>

        <aside class="wrapper-right relative divcol font2">
          <div class="mobileRight divcol tend vermobile">
            <span class="h11_em">{{ item.price }}</span>
            <span class="percent h11_em" :class="{green_:item.rise, red_:!item.rise}">
              {{ item.percent }}%
            </span>
          </div>

          <div class="divcol eliminarmobile">
            <span class="h11_em">Current price <br>NEAR</span>
            <div class="contPrice">
              <span class="h8_em semibold" style="margin-right: clamp(.5em, 1vw, 1em);">{{ item.near }}</span>
              <span class="h11_em">(${{ item.dollar }})</span>
            </div>
          </div>

          <div class="contButtons divrow aend eliminarmobile">
            <v-btn v-for="(item2, index) in item.buttons" :key="index"
              :class="{buyBtn:item2.buy, offerBtn: item2.offer}" class="h12_em">
              {{ item2.title }}
            </v-btn>
          </div>
        </aside>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "ranking",
  data() {
    return {
      dataFilterRanking: [
        {
          title: "LAST 7 DAYS",
          active: false,
          items: ['LAST 1 DAY', 'LAST 7 DAYS',
          ],
        },
        {
          title: "ALL CATEGORIES",
          active: false,
          items: ['ALL CATEGORIES', 'POPULAR',
          ],
        },
      ],
      dataRanking: [
        {
          active: false,
          number: 1,
          img: require("@/assets/images/cat.png"),
          name:"MURI",
          title: "MURI.NEAR",
          deployer: "Muri.Deployer",
          date: "April 2, 2022",
          hour: "1:41",
          near: "0,08",
          dollar: "249,37",
          price: "37.199.9",
          percent: "+15,8",
          rise: true,
          buttons: [
            {
              buy: true,
              title: "BUY NOW"
            },
            {
              offer: true,
              title: "MAKE OFFER"
            }
          ]
        },
        {
          active: false,
          number: 2,
          img: require("@/assets/images/bear.png"),
          name:"TERRY",
          title: "MURI.NEAR",
          deployer: "Muri.Deployer",
          date: "April 2, 2022",
          hour: "1:41",
          near: "0,08",
          dollar: "249,37",
          price: "37.199.9",
          percent: "+15,8",
          rise: true,
          buttons: [
            {
              buy: true,
              title: "BUY NOW"
            },
            {
              offer: true,
              title: "MAKE OFFER"
            }
          ]
        },
        {
          active: false,
          number: 3,
          img: require("@/assets/images/polar-bear.png"),
          name:"P.S",
          title: "MURI.NEAR",
          deployer: "Muri.Deployer",
          date: "April 2, 2022",
          hour: "1:41",
          near: "0,08",
          dollar: "249,37",
          price: "37.199.9",
          percent: "+15,8",
          rise: true,
          buttons: [
            {
              buy: true,
              title: "BUY NOW"
            },
            {
              offer: true,
              title: "MAKE OFFER"
            }
          ]
        },
        {
          active: false,
          number: 4,
          img: require("@/assets/images/gorilla.png"),
          name:"BYN",
          title: "MURI.NEAR",
          deployer: "Muri.Deployer",
          date: "April 2, 2022",
          hour: "1:41",
          near: "0,08",
          dollar: "249,37",
          price: "37.199.9",
          percent: "-15,8",
          rise: false,
          buttons: [
            {
              buy: true,
              title: "BUY NOW"
            },
            {
              offer: true,
              title: "MAKE OFFER"
            }
          ]
        },
        {
          active: false,
          number: 5,
          img: require("@/assets/images/weasel.png"),
          name:"MNM",
          title: "MURI.NEAR",
          deployer: "Muri.Deployer",
          date: "April 2, 2022",
          hour: "1:41",
          near: "0,08",
          dollar: "249,37",
          price: "37.199.9",
          percent: "+15,8",
          rise: true,
          buttons: [
            {
              buy: true,
              title: "BUY NOW"
            },
            {
              offer: true,
              title: "MAKE OFFER"
            }
          ]
        },
      ]
    }
  },
  mounted() {
    this.$parent.title = 'RANKING'
    this.$parent.dataNavigationExplore.forEach(element => {
      element.show = true;
    });
    this.$parent.dataNavigationExplore[0].show = false;
  },
  methods: {
  }
};
</script>

<style src="./Ranking.scss" lang="scss" />
