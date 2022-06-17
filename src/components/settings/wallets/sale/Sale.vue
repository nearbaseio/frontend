<template>
  <section id="wallets" class="sale divcol gap2">
    <Alerts ref="alerts"></Alerts>

    <aside v-for="(item, index) in dataSale" :key="index" class="card-wrapper font2 relative">
      <v-card class="cartaTop" style="display:flex">
        <img :src="item.img" alt="Referencial Image">
        <div class="contText divcol jcenter">
          <h3 class="font1 h6_em not_typography">{{ item.domain }}</h3>
          <span class="h11_em normal">
            Current price {{item.price}} NEAR<br>
            (${{item.dollar}})
          </span>
        </div>
      </v-card>

      <v-card class="cartaDown divcol" color="var(--clr-card-3)" style="display:flex">
        <aside class="contButtons spacee aend">
          <v-btn 
            class="h11_em btnOutline"
            @click="showDialog(item)">
            CHANGE PRICE
          </v-btn>
          <v-btn 
            v-if="item.active"
            :disabled="ResProgress"
            class="h11_em btnOutline"
            @click="clickPause(item)"
          >
            PAUSE SALE
            <v-progress-circular
            v-if="ResProgress"
            :size="18"
            :width="4"
            indeterminate
            ></v-progress-circular>
          </v-btn>
          <v-btn 
            v-else
            :disabled="ResProgress"
            class="h11_em btnOutline"
            @click="clickPause(item)"
          >
            RESUME SALE
            <v-progress-circular
            v-if="ResProgress"
            :size="18"
            :width="4"
            indeterminate
            ></v-progress-circular>
          </v-btn>
          <v-btn class="h11_em btn">
            CANCEL SALE
          </v-btn>
        </aside>
      </v-card>
    </aside>

    <v-dialog
      v-model="modalSale"
      max-width="400"
      scrollable
      persistent
    >
      <v-card class="modalSale divcol">
        <v-toolbar color="#B322D8" style="color:#FFFFFF">
          <v-btn icon dark @click="closeDialog">
            <v-icon style="color:#FFFFFF !important">mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title style="padding-left: 0 !important; color:#FFFFFF !important">
            <span class="font2 h10_em not_clr" style="color:#FFFFFF">{{editedItem.domain}}</span>
          </v-toolbar-title>
        </v-toolbar>

        <v-card>
          <v-card-text class="divcol">
            <label for="price" class="h9_em">PRICE</label>
            <v-text-field
              v-model="editedItem.price"
              id="price"
              hide-details
              hide-spin-buttons
              type="number"
            ></v-text-field>
          </v-card-text>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="updateDomain()" class="btn3 h11_em">
            SAVE
            <v-progress-circular
              v-if="changeProgress"
              :size="18"
              :width="4"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
  </section>
</template>

<script>
import Alerts from '@/components/alerts/Alerts'
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
  name: "walletsSale",
  i18n: require("../../i18n"),
  components: { Alerts },
  data() {
    return {
      changeProgress: false,
      ResProgress: false,
      dataSale: [],
      priceNear: null,
      modalSale: false,
      editedItem: {},
    }
  },
  async mounted () {
    await this.priceNEAR()
    this.getDomainsPurchased()
  },
  methods: {
    formatPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    },
    clickPause (item) {
        this.ResProgress = true
        this.editedItem = item
        this.editedItem.status = !this.editedItem.active
        this.updateDomain()
    },
    async updateDomain () {
        console.log(this.dataSale)
        this.progress = true
        const CONTRACT_NAME = 'contract.nearbase.testnet'
        // connect to NEAR
        const near = await connect(config)
        // create wallet connection
        const wallet = new WalletConnection(near)
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          changeMethods: ['update_domain'],
          sender: wallet.account()
        })
        await contract.update_domain({
          id: this.editedItem.id,
          price: utils.format.parseNearAmount(this.editedItem.price),
          is_active: this.editedItem.status
        })
          .then((response) => {
            this.$refs.alerts.Alerts('success', null, 'Updated domain');
            this.progress = false
            this.getDomainsPurchased()
            this.closeDialog()
          }).catch((error) => {
            console.log(error)
            this.$refs.alerts.Alerts('cancel', null, error);
            this.progress = false
          })
    },
    showDialog (item) {
      this.editedItem = item
      this.editedItem.status = this.editedItem.active
      this.modalSale = !this.modalSale
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
    async getDomainsPurchased() {
      this.dataSale = []
      const CONTRACT_NAME = 'contract.nearbase.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        viewMethods: ['get_domains_published'],
        sender: wallet.account()
      })
      await contract.get_domains_published({
        user_seller: wallet.getAccountId(),
      })
        .then(async (response) => {
          for (var i = 0; i < response.length; i++) {
            var item = {}
            item.id = response[i].id
            item.domain = response[i].domain
            item.img = await require("@/assets/avatars/"+ (Math.floor((Math.random() * (6-1)) + 1)) +".png")
            item.price = this.formatPrice(response[i].price)
            item.profile = response[i].user_seller
            item.dollar =  (item.price * this.priceNear).toFixed(2)
            item.active = response[i].is_active
            this.dataSale.push(item)
          }
          this.dataSale = this.dataSale.reverse()
        })
    },
    async getData () {
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      const wallet = new WalletConnection(near)
      this.accountId = wallet.getAccountId()
      let item = {
        userSeller: wallet.getAccountId()
      }
      if (wallet.isSignedIn()) {
        const url = "http://localhost:3080/api/v1/get-domains"
        axios.post(url, item)
          .then(async (response) => {
            if (response.data) {
              this.dataSale = []
              for (var i = 0; i < response.data.length; i++) {
                let item = {}
                item.id = response.data[i].id
                item.img = await require("@/assets/avatars/"+ (Math.floor((Math.random() * (6-1)) + 1)) +".png")
                item.domain = response.data[i].domain
                item.price = response.data[i].price
                item.active  = response.data[i].active
                item.profile = response.data[i].profile
                item.dollar =  (response.data[i].price * this.priceNear).toFixed(2)
                this.dataSale.push(item)
              }  
            }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    closeDialog () {
        this.editedItem = {}
        this.modalSale = false
      },
  },
};
</script>

<style src="./Sale.scss" lang="scss"></style>
