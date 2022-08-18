<template>
  <section id="top" class="divcol section gap2">
    <aside class="contup jspace divwrap relative parent">
      <div class="sectup divrow">
        <h2>TOP</h2>
        <span class="number">{{dataTop.length}}</span>
        <!-- <h2>SALES</h2> -->
        <v-btn class="buttons botonUp h11_em" href="#" @click="$router.push('/')">explore
          <v-icon medium>mdi-arrow-right</v-icon>
        </v-btn>
      </div>

      <v-col class="sectdown space" style="gap: 1em">
        <v-slide-group
          v-model="slider"
          center-active
          show-arrows
          class="fill_w"
          active-class="active"
          :style="`--justify: ${justify}`"
        >
          <v-slide-item
            v-for="(item, index) in dataTop" :key="index"
            v-slot="{ active, toggle }"
          >
            <v-card
              :color="active ? '#AD0FD5' : '#ECEBFF'"
              style="display: flex; cursor: pointer"
              class="divcol acenter"
              :ripple="true"
              @click="toggle"
            >
            <img :src="item.img" alt="Top images">
            <h4 class="h11_em">{{ item.initials }}</h4>
            <h4 class="h11_em">{{formatPrice(item.price)}} NEAR</h4>
            
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </aside>

    <aside class="botonDown end parent">
      <v-btn class="buttons h11_em" @click="$router.push('/explore/market')">EXPLORE
        <v-icon medium>mdi-arrow-right</v-icon>
      </v-btn>
    </aside>
  </section>
</template>

<script>
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
  name: "top",
  data() {
    return {
      justify: "space-between",
      slider: "",
      dataTop: [],
    }
  },
  async mounted() {
    this.getTop()
    this.JustifyTop();
  },
  methods: {
    JustifyTop() {
      if (this.dataTop.length >= 3) { this.justify = "space-between" }
      else { this.justify = "space-evenly" }
    },
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
    async getTop() {
      this.dataTop = []
      const CONTRACT_NAME = 'contract.nearbase.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_top_published'],
        sender: wallet.account()
      })
      await contract.get_top_published()
        .then(async (response) => {
          console.log(response)
          for (var i = 0; i < response.length; i++) {
            var item = {}
            item.initials = response[i].domain
            item.img = await require("@/assets/avatars/"+ (Math.floor((Math.random() * (6-1)) + 1)) +".png")
            item.price = response[i].price
            this.dataTop.push(item)
          }
        })
    },
  }
};
</script>

<style src="./Top.scss" lang="scss" />
