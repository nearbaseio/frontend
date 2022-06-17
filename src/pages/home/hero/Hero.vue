<template>
  <section id="hero" class="divcol gap2 scroll_h" ref="hero">
    <div class="contup center relative">
      <div class="cursor eliminarmobile" ref="cursor" />
      <aside class="sectleft divcol divcol_invmobile centermobile">
        <div class="divcol aend gap2mobile" ref="parallax_target">
          <h1 class="tend tstartmobile font1" ref="heroText" data-depth="0.5">DISCOVER, COLLECT, AND SELL WALLETs</h1>
        </div>
        <v-btn class="buttons font2 h11_em parallaxBtn" >KNOW MORE
          <v-icon medium>mdi-arrow-right</v-icon>
        </v-btn>
      </aside>

      <v-spacer class="v-spacer vermobile"></v-spacer>

      <aside class="contHeroImg centermobile">
        <img class="heroImg eliminarmobile" ref="heroImg" src="@/assets/images/hero.png" alt="Hero Background">
        <div class="sceneImg fill" ref="parallax_target2">
          <img class="heroImgMobile vermobile fill" src="@/assets/images/hero-mobile.png" alt="Hero Background" data-depth="0.8">
        </div>
      </aside>
    </div>

    <v-col class="contdown relative align paddlateral">
      <v-btn>
        <span class="h9_em" >LAST<br>SOLD</span>
      </v-btn>

      <aside class="slider relative">
        <div class="slide">
          <span v-for="(item, index) in dataSlide" :key="index" class="bold h11_em">
            {{ item.info }} <span class="light">{{ item.number }}Ⓝ |</span>
          </span>
        </div>
      </aside>
    </v-col>

    <aside class="center sectionmobile">
      <h2 class="relative font1 h5_emmobile" style="letter-spacing: 0.21em">FEATURED
        <div class="controls">
          <v-btn v-for="(item, index) in dataControls" :key="index"
            icon class="buttons-icon parallaxBtn" :class="{inactive: item.inactive}"
            @click="ChangeSlides(item)">
            <v-icon class="vermobile" :class="{rotate: item.rotate}">{{ item.icon }}</v-icon>
            <img class="eliminarmobile" :class="{rotate: item.rotate}" :src="item.img" :alt="item.alt">
          </v-btn>
        </div>
      </h2>
    </aside>
  </section>
</template>

<script>
import Parallax from 'parallax-js'
import axios from 'axios'
import * as nearAPI from 'near-api-js'
const { connect, keyStores, WalletConnection, Contract, utils } = nearAPI

const keyStore = new keyStores.BrowserLocalStorageKeyStore()
const config = {
        networkId: "testnet",
        keyStore, 
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
export default {
  name: "hero",
  data() {
    return {
      dataSlide: [],
      dataControls: [
        {
          key: "prev",
          icon: "mdi-arrow-left",
          img: require("@/assets/icons/arrow-buttons.png"),
          alt: "slide button left",
          rotate: true,
          inactive: true,
        },
        {
          key: "next",
          icon: "mdi-arrow-right",
          img: require("@/assets/icons/arrow-buttons.png"),
          alt: "slide button right",
          inactive: true,
        },
      ],
    }
  },
  async mounted() {
    await this.priceNEAR()
    this.getDomainsPurchased()
    this.parallax();
  },
  methods: {
    formatPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    },
    async priceNEAR(){
      axios.get("https://api.binance.com/api/v3/ticker/24hr?symbol=NEARUSDT")
        .then((response) => {
          this.priceNear = response.data.lastPrice
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async getDomainsPurchased() {
      this.dataPurchased = []
      const CONTRACT_NAME = 'contract.nearbase.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_last_sold'],
        sender: wallet.account()
      })
      await contract.get_last_sold({
        number_domains: 20,
      })
        .then(async (response) => {
          for (var i = 0; i < response.length; i++) {
            var item = {}
            item.id = response[i].id
            item.info = response[i].domain
            item.img = await require("@/assets/avatars/"+ (Math.floor((Math.random() * (6-1)) + 1)) +".png")
            item.number = this.formatPrice(response[i].purchase_price)
            item.dollar =  (item.near * this.priceNear).toFixed(2)
            item.retired = response[i].retired
            this.dataSlide.push(item)
          }
          this.dataSlide = this.dataSlide.reverse()
        })
    },
    parallax() {
      /* parallax pointer */
      if (window.innerWidth > 880) {
        var hero = this.$refs.hero, //scene
        heroImg = this.$refs.heroImg, //object
        cursor = this.$refs.cursor, //cursor
        text = this.$refs.heroText, //text
        buttons = document.querySelectorAll('.parallaxBtn'), //buttons
        w = window.innerWidth, //window width
        h = window.innerHeight; //window height

        hero.addEventListener('pointermove', e => {
          //variables to scene
          var offsetX = 0.5 - e.pageX / w, //cursor position X
          offsetY = 0.5 - e.pageY / h, //cursor position Y
          dy = e.pageY - h / 2, //@h/2 = center of poster
          dx = e.pageX - w / 2, //@w/2 = center of poster
          theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
          angle = theta * 180 / Math.PI - 90, //convert rad in degrees
          transformPoster = 'translate3d(0, ' + -offsetX * 4 + 'px, 0) rotateX(' + (-offsetY * 2) + 'deg) rotateY(' + (offsetX * (2 * -2)) + 'deg)'; //poster transform
          //variables to object
          var transformLayer = 'translate3d(' + offsetX * 10 + 'px, ' + offsetY * 5 + 'px, 20px)'
          //get angle between 0-360
          if (angle < 0) {angle = angle + 360}

          //poster transform
          hero.style.transform = transformPoster;
          //object transform
          heroImg.style.transform = transformLayer;

          //cursor events
          cursor.style.top = `${e.pageY}px`
          cursor.style.left = `${e.pageX}px`
          text.addEventListener('mouseover', () => {cursor.classList.add('textOver')})
          text.addEventListener('mouseleave', () => {cursor.classList.remove('textOver')})
          buttons.forEach(boton => {
            boton.addEventListener('mouseover', () => {cursor.classList.add('buttonsOver')})
            boton.addEventListener('mouseleave', () => {cursor.classList.remove('buttonsOver')})
          })
        })
      } else {
        /* parallax library */
        var scene = this.$refs.parallax_target;
        var scene2 = this.$refs.parallax_target2;
        var parallaxInstance = new Parallax(scene, {relativeInput: true, hoverOnly: true});
        var parallaxInstance2 = new Parallax(scene2, {relativeInput: true, hoverOnly: true});
        parallaxInstance.friction(0.2, 0.5);
        parallaxInstance2.friction(0.2, 0.5);
      }
    },
    ChangeSlides(item) {
      if (item.key == "prev") {
        this.dataControls[1].inactive = true;
        item.inactive = false;
        this.$parent.$refs.featured.slidesFeatured--;
      }
      if (item.key == "next") {
        this.dataControls[0].inactive = true;
        item.inactive = false;
        this.$parent.$refs.featured.slidesFeatured++;
      }
    }
  }
};
</script>

<style src="./Hero.scss" lang="scss" />
