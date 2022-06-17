<template>
  <section class="contTop">
    <aside v-for="(item, index) in dataTop" :key="index"
      :class="{colspan:item.active}" class="card-wrapper font2 center divcol">
      <v-card class="cartaTop relative" style="display:flex" :class="{active: item.active}">
        <img :class="{active:item.active}" :src="item.img" alt="Referencial Image">
        <div v-if="item.active" class="contText divcol jcenter">
          <h3 class="font1 h6_em not_typography">{{ item.domain }}</h3>
          <span class="h11_em">
            by <a href="#" class="bold">{{ item.profile }}</a><br>
            published on <strong>{{ item.date }}</strong>
          </span>
        </div>
      </v-card>

      <v-card class="cartaDown divcol" color="var(--clr-card-3)" style="display:flex">
        <h3 :class="{hide:item.active}" class="font1 h7_em tcenter">{{ item.domain }}</h3>

        <div class="jspace">
          <aside class="divcol">
            <span class="h11_em">Current price <br>NEAR</span>
            <div class="contPrice">
              <span class="h7_em bold" style="margin-right: clamp(.5em, 1vw, 1em);">{{ item.price }}</span>
              <span class="h11_em">(${{ item.dollar }})</span>
            </div>
          </aside>

          <aside class="contButtons divrow aend">
            <v-btn v-if="!item.active" icon class="buttons-icon" @click="OpenCard(item)">
              <v-icon size="clamp(1em, 1.5vw, 1.5em)">mdi-arrow-right</v-icon>
            </v-btn>

            <template v-else>
              <v-btn icon class="buttons-icon" @click="CloseCard(item)">
                <v-icon size="clamp(1em, 1.5vw, 1.5em)">mdi-arrow-left</v-icon>
              </v-btn>
              <v-btn 
                class="buyBtn h11_em"
                @click="domainBuy(item)"
              >
                BUY NOW
              </v-btn>
              <v-btn disabled class="offerBtn h11_em">
                MAKE OFFER
              </v-btn>
            </template>
          </aside>
        </div>
      </v-card>
    </aside>
  </section>
</template>
<script>
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
  priceNear: null,
  name: "market",
  async mounted() {
    await this.priceNEAR()
    this.getMarket()
    this.$parent.title = 'MARKET'
    this.$parent.dataNavigationExplore.forEach(element => {
      element.show = true;
      element.active = false;
    });
    this.$parent.dataNavigationExplore[1].show = false;
    this.$parent.dataNavigationExplore[1].active = true;
  },
  data() {
    return {
      dataTop: []
    }
  },
  methods: {
    formatPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    },
    async priceNEAR(){
      await axios.get("https://api.binance.com/api/v3/ticker/24hr?symbol=" + "NEAR" + "USDT")
        .then((response) => {
          this.priceNear = response.data.lastPrice
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async getMarket() {
      this.dataTop = []
      const CONTRACT_NAME = 'contract.nearbase.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_market'],
        sender: wallet.account()
      })
      await contract.get_market()
        .then(async (response) => {
          for (var i = 0; i < response.length; i++) {
            var item = {}
            item.id = response[i].id
            item.domain = response[i].domain
            item.img = await require("@/assets/avatars/"+ (Math.floor((Math.random() * (6-1)) + 1)) +".png")
            item.price = this.formatPrice(response[i].price)
            item.profile = response[i].user_seller
            item.dollar =  (item.price * this.priceNear).toFixed(2)
            item.active  = false
            item.date = response[i].date_fech,
            item.status = response[i].is_active
            console.log(item)
            this.dataTop.push(item)
          }
        })
    },
    async getData () {
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      const wallet = new WalletConnection(near)
      this.accountId = wallet.getAccountId()
      
        const url = "http://127.0.0.1:8000/api/v1/market/"
        axios.get(url)
          .then(async (response) => {
            if (response.data) {
              for (var i = 0; i < response.data.length; i++) {
                let item = {}
                item.id_contract = response.data[i].id_contract
                item.img = await require("@/assets/avatars/"+ (Math.floor((Math.random() * (6-1)) + 1)) +".png")
                item.domain = response.data[i].domain
                item.price = response.data[i].price
                item.status  = response.data[i].active
                item.active  = false
                item.profile = response.data[i].profile
                item.date = "April 2, 2022",
                item.hour = "1:41",
                item.near = "0,08",
                item.dollar =  (response.data[i].price * this.priceNear).toFixed(2)
                this.dataTop.push(item)
              }  
            }
        }).catch((error) => {
          console.log(error)
        })
      
    },
    async domainBuy (item) {
      console.log(item)
      const CONTRACT_NAME = 'contract.nearbase.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['domain_buy'],
        sender: wallet.account()
      })
      
      await contract.domain_buy({
        id: item.id,
      }, '300000000000000', // attached GAS (optional)
      utils.format.parseNearAmount((Number(item.price) + 0.015).toString()))
    },

    OpenCard(item) {
      this.dataTop.forEach(element => {
        element.active = false
      });
      item.active = true
    },
    CloseCard(item) {
      this.dataTop.forEach(element => {
        element.active = false
      });
      item.active = false
    },
  }
};
</script>

<style src="./Market.scss" lang="scss" />
