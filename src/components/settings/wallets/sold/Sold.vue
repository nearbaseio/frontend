<template>
  <section id="wallets" class="sold divcol gap2">
    <aside v-for="(item, i) in dataSold" :key="i" class="card-wrapper font2 relative">
      <v-card class="cartaTop" style="display:flex">
        <img :src="item.img" alt="Referencial Image">
        <div class="contText divcol jcenter">
          <h3 class="font1 h6_em not_typography">{{ item.title }}</h3>
          <span class="h11_em">
            by <a href="#" class="bold">{{ item.user_seller }}</a><br>
            <!-- published on <strong>{{ item.date }}</strong> -->
          </span>
        </div>
      </v-card>

      <v-card class="cartaDown divcol" color="var(--clr-card-3)" style="display:flex">
        <div class="jspace">
          <aside class="firstcont divcol">
            <span class="h11_em">Current price <br>NEAR</span>
            <div class="contPrice">
              <span class="h7_em bold" style="margin-right: clamp(.2em, 1vw, 1em);">{{ item.near }}</span>
              <span class="h11_em">(${{ item.dollar }})</span>
            </div>
          </aside>

          <aside class="contButtons divrow aend">
            <v-btn
              v-if="hola" 
              class="btn h11_em">
              WITHDRAW
            </v-btn>
          </aside>
        </div>
      </v-card>
    </aside>
  </section>
</template>

<script>
//import axios from 'axios'
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
  name: "walletsSold",
  i18n: require("../../i18n"),
  data() {
    return {
      hola: false,
      priceNear: null,
      dataSold: [],
    }
  },
  async mounted () {
    await this.priceNEAR()
    this.getDomainsSold()
  },
  methods: {
    formatPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    },
    async priceNEAR(){
      await this.axios.get("https://nearblocks.io/api/near-price")
        .then((response) => {
          this.priceNear = response.data.usd
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async getDomainsSold() {
      this.dataSold = []
      const CONTRACT_NAME = 'contract.nearbase.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_domains_purchased'],
        sender: wallet.account()
      })
      await contract.get_domains_purchased({
        user_seller: wallet.getAccountId(),
      })
        .then(async (response) => {
          for (var i = 0; i < response.length; i++) {
            var item = {}
            item.id = response[i].id
            item.title = response[i].domain
            item.user_seller = response[i].user_seller
            item.img = await require("@/assets/avatars/"+ (Math.floor((Math.random() * (6-1)) + 1)) +".png")
            item.near = this.formatPrice(response[i].purchase_price)
            item.date = "2022/06/13",
            item.dollar =  (item.near * this.priceNear).toFixed(2)
            item.retired = response[i].retired
            this.dataSold.push(item)
          }
          if (this.$store.state.user.filter === 'filter by recent') {
            console.log("Hola")
            this.dataSold = this.dataSold.reverse()
          }
        })
    },
  },
};
</script>

<style src="./Sold.scss" lang="scss"></style>
