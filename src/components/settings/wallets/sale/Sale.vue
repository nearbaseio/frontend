<template>
  <section id="wallets" class="sale divcol gap2">
    <Alerts ref="alerts"></Alerts>
    <aside v-for="(item, index) in dataSale" :key="index" class="card-wrapper font2 relative">
      <v-card class="cartaTop" style="display:flex">
        <img :src="item.img" alt="Referencial Image">
        <div class="contText divcol jcenter">
          <h3 class="font1 h6_em not_typography">{{ item.domain }}</h3>
          <span class="h11_em normal">
            Current price {{item.price}} NEAR <v-icon v-if="item.post_type == 2">mdi-seal</v-icon> <br>
            (${{item.dollar}})
          </span>
        </div>
      </v-card>

      <v-card class="cartaDown divcol" color="var(--clr-card-3)" style="display:flex">
        <aside class="contButtons spacee aend">
          <v-btn 
            class="h11_em btnOutline"
            @click="showDialog(item)">
            EDIT POST
          </v-btn>
          <v-btn 
            v-if="item.active"
            :disabled="item.ResProgress"
            class="h11_em btnOutline"
            @click="clickPause(item)"
          >
            PAUSE SALE
            <v-progress-circular
            v-if="item.ResProgress"
            :size="18"
            :width="4"
            indeterminate
            ></v-progress-circular>
          </v-btn>
          <v-btn 
            v-else
            :disabled="item.ResProgress"
            class="h11_em btnOutline"
            @click="clickPause(item)"
          >
            RESUME SALE
            <v-progress-circular
            v-if="item.ResProgress"
            :size="18"
            :width="4"
            indeterminate
            ></v-progress-circular>
          </v-btn>
          <v-btn class="h11_em btn" @click="showDialog2(item), modalPurchased=true; windowModal=1">
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
          <v-btn icon dark :disabled="changeProgress" @click="closeDialog">
            <v-icon style="color:#FFFFFF !important">mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title style="padding-left: 0 !important; color:#FFFFFF !important">
            <span class="font2 h10_em not_clr" style="color:#FFFFFF">{{editedItem.domain}}</span>
          </v-toolbar-title>
        </v-toolbar>

        <v-card>
          <div class="divcol">
            <label for="price" class="h9_em">PRICE</label>
            <v-text-field
              v-model="editedItem.price"
              id="price"
              hide-spin-buttons
              type="number"
            ></v-text-field>
          </div>
          <div class="divcol">
            <label for="crypto" class="h9_em">POST TYPE</label>
            <v-select
              v-model="editedItem.post_type"
              :items="filterExpo.by"
              item-text="post_type"
              item-value="post_type"
              id="post_type"
              solo
              :menu-props="{ bottom: true, offsetY: true }"
            >
              <template v-slot:append>
                <v-btn icon class="buttons-icon">
                  <v-icon x-small>mdi-arrow-down</v-icon>
                </v-btn>
              </template>

              <template v-slot:selection="slotProps">
                <span class="cryptoSelect">
                  {{ slotProps.item.crypto }}
                </span>
              </template>

              <template v-slot:item="slotProps">
                <span class="cryptoSelect">
                  {{ slotProps.item.crypto }}
                </span>
              </template>
            </v-select>
          </div>
        </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="changeProgress" @click="updateDomainDeposit()" class="btn3 h11_em">
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
      <v-dialog
        v-model="modalPurchased"
        :max-width="windowModal==1?450:900"
        scrollable
        persistent
      >
        <v-window v-model="windowModal" vertical>
          <v-window-item :value="1">
            <v-card class="modalPurchased divcol">
              <h3 class="h7_em tcenter">Do you wish to continue</h3>
              <p class="h10_em font2 tspace">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint atque voluptatem consectetur animi accusantium adipisci repudiandae! At reiciendis, voluptate, repellat ducimus deleniti repudiandae esse dicta odio adipisci, dolor tempora quam?</p>
              <aside class="center gap2">
                <v-btn :disabled="cancelProgress" class="btn2" @click="modalPurchased=false">CANCEL</v-btn>
                <v-btn 
                  :disabled="cancelProgress"
                  class="btn" 
                  @click="cancelDomain()"
                >
                  ACCEPT
                  <v-progress-circular
                    v-if="cancelProgress"
                    :size="18"
                    :width="4"
                    indeterminate
                  ></v-progress-circular>
                </v-btn>
              </aside>
            </v-card>
          </v-window-item>

          <v-window-item :value="2">
            <v-card class="modalPurchased divcol">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <aside class="divcol margin2bottom">
                  <label class="acenter gap1">SECRET PHRASE
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon class="btn3" width="2em" height="2em" v-bind="attrs" v-on="on" @click="copyToClipBoard()">
                          <v-icon style="color: #FFFFFF !important" size="1.2em">mdi-content-copy</v-icon>
                        </v-btn>
                      </template>
                      <span class="font2" style="color:#FFFFFF !important">Copy to Clipboard</span>
                    </v-tooltip>
                  </label>
                  <section class="contPhrase">
                    <v-text-field
                      v-for="(item,i) in dataPhrase" :key="i"
                      v-model="item.model"
                      solo
                      hide-details
                      disabled
                    >
                      <template v-slot:prepend>
                        <span class="h11_em font2">{{i+1}}.</span>
                      </template>
                    </v-text-field>
                  </section>
                </aside>
              </v-form>

              <aside class="center">
                <v-btn class="btn" @click="modalPurchased=false, getDomainsPublished()">ACCEPT</v-btn>
              </aside>
            </v-card>
          </v-window-item>
        </v-window>
      </v-dialog>
  </section>
</template>

<script>
import Alerts from '@/components/alerts/Alerts'
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
  name: "walletsSale",
  i18n: require("../../i18n"),
  components: { Alerts },
  data() {
    return {
      modalPurchased: false,
      windowModal: 1,
      changeProgress: false,
      cancelProgress: false,
      dataSale: [],
      priceNear: null,
      modalSale: false,
      editedItem: {},
      originItem: {},
      dataPhrase: [
        {
          model: null,
        },
        {
          model: null,
        },
        {
          model: null,
        },
        {
          model: null,
        },
        {
          model: null,
        },
        {
          model: null,
        },
        {
          model: null,
        },
        {
          model: null,
        },
        {
          model: null,
        },
        {
          model: null,
        },
        {
          model: null,
        },
        {
          model: null,
        },
      ],
      filterExpo: {
        title: "Classic (FREE)",
        by: [
          {
            post_type: 1,
            crypto: "Classic (FREE)",
          },
          {
            post_type: 2,
            crypto: "Premium (1 NEAR)",
          },
        ],
      },
    }
  },
  async mounted () {
    await this.priceNEAR()
    this.getDomainsPublished()
  },
  methods: {
    copyToClipBoard() {
      let seedPhrase = this.dataPhrase[0].model + " " + this.dataPhrase[1].model + " " + this.dataPhrase[2].model + " " + this.dataPhrase[3].model + " " + this.dataPhrase[4].model + " " + this.dataPhrase[5].model + " " + this.dataPhrase[6].model + " " + this.dataPhrase[7].model + " " + this.dataPhrase[8].model + " " + this.dataPhrase[9].model + " " + this.dataPhrase[10].model + " " + this.dataPhrase[11].model
      navigator.clipboard.writeText(seedPhrase);
    
    },
    formatPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    },
    clickPause (item) {
        item.ResProgress = true
        this.editedItem = item
        this.editedItem.status = !this.editedItem.active
        this.updateDomain(item)
    },
    showDialog2 (item) {
        this.domainItem = {} 
        this.domainItem = item
    },
    async cancelDomain () {
      this.cancelProgress = true
      const near = await connect(config);
      const wallet = new WalletConnection(near)

      if (wallet.isSignedIn()) {
        var item = {}
        item.owner_id = wallet.getAccountId()
        item.privateKey = localStorage.getItem("near-api-js:keystore:"+wallet.getAccountId()+":testnet");
        item.id_domain = this.domainItem.id

        //this.axios.defaults.headers.common.Authorization='token'
        console.log("api", item)
        const url = "api/v1/cancel-domain/"
        this.axios.post(url, item)
              .then((response) => {
                console.log("response",response)
                if (response.status === 200){
                  console.log(response.data.seedPhrase)
                  let seedPhrase = response.data.seedPhrase.split(' ')
                  this.dataPhrase[0].model = seedPhrase[0]
                  this.dataPhrase[1].model = seedPhrase[1]
                  this.dataPhrase[2].model = seedPhrase[2]
                  this.dataPhrase[3].model = seedPhrase[3]
                  this.dataPhrase[4].model = seedPhrase[4]
                  this.dataPhrase[5].model = seedPhrase[5]
                  this.dataPhrase[6].model = seedPhrase[6]
                  this.dataPhrase[7].model = seedPhrase[7]
                  this.dataPhrase[8].model = seedPhrase[8]
                  this.dataPhrase[9].model = seedPhrase[9]
                  this.dataPhrase[10].model = seedPhrase[10]
                  this.dataPhrase[11].model = seedPhrase[11]

                  this.windowModal = 2      
                  this.cancelProgress = false 
                } else {
                    this.$refs.alerts.Alerts('cancel', null, "Algo ocurrio");
                    this.cancelProgress = false 
                  }  
            }).catch((error) => {
              console.log(error)
              this.$refs.alerts.Alerts('cancel', null, error);
              this.cancelProgress = false 
            })
      }
    },
    async updateDomainDeposit () {
      this.changeProgress = true
      const CONTRACT_NAME = 'contract.nearbase.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['update_domain'],
        sender: wallet.account()
      })

      if (this.originItem.post_type == 2 || this.editedItem.post_type == 1) {
        await contract.update_domain({
          id: this.editedItem.id,
          price: utils.format.parseNearAmount(this.editedItem.price),
          is_active: this.editedItem.status,
          post_type: this.editedItem.post_type
        })
          .then((response) => {
            this.$refs.alerts.Alerts('success', null, 'Updated domain');
            this.changeProgress = false
            this.getDomainsPublished()
            this.closeDialog()
          }).catch((error) => {
            console.log(error)
            this.$refs.alerts.Alerts('cancel', null, error);
            //item.ResProgress = false
            this.changeProgress = false
          })
      } else if (this.originItem.post_type == 1 && this.editedItem.post_type == 2) {
        await contract.update_domain({
          id: this.editedItem.id,
          price: utils.format.parseNearAmount(this.editedItem.price),
          is_active: this.editedItem.status,
          post_type: this.editedItem.post_type
        }, '300000000000000',
        "1000000000000000000000000")
          .then((response) => {
            this.$refs.alerts.Alerts('success', null, 'Updated domain');
            this.changeProgress = false
            this.getDomainsPublished()
            this.closeDialog()
          }).catch((error) => {
            console.log(error)
            this.$refs.alerts.Alerts('cancel', null, error);
            //item.ResProgress = false
            this.changeProgress = false
          })
      } else {
        this.$refs.alerts.Alerts('cancel', null, "Algo ocurrio");
      }
    },
    async updateDomain (item) {
      this.changeProgress = true
      const CONTRACT_NAME = 'contract.nearbase.testnet'
      // connect to NEAR
      const near = await connect(config)
      // create wallet connection
      const wallet = new WalletConnection(near)
      const contract = new Contract(wallet.account(), CONTRACT_NAME, {
        changeMethods: ['update_domain'],
        sender: wallet.account()
      })
      console.log("item", this.editedItem)
      await contract.update_domain({
        id: this.editedItem.id,
        price: utils.format.parseNearAmount(this.editedItem.price),
        is_active: this.editedItem.status,
        post_type: this.editedItem.post_type
      })
        .then((response) => {
          this.$refs.alerts.Alerts('success', null, 'Updated domain');
          this.changeProgress = false
          this.getDomainsPublished()
          this.closeDialog()
          if (item) {
            item.ResProgress = false
          }
        }).catch((error) => {
          console.log(error)
          this.$refs.alerts.Alerts('cancel', null, error);
          //item.ResProgress = false
          this.changeProgress = false
          if (item) {
            item.ResProgress = false
          }
        })
    },
    showDialog (item) {
      this.editedItem = {}
      this.originItem = item
      this.editedItem = Object.assign({}, item);
      this.editedItem.status = this.editedItem.active
      this.modalSale = !this.modalSale
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
    async getDomainsPublished() {
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
            item.ResProgress = false
            item.post_type = response[i].post_type
            this.dataSale.push(item)
          }
          if (this.$store.state.user.filter === 'filter by recent') {
            this.dataSale = this.dataSale.reverse()
          }
        })
    },
    closeDialog () {
      this.editedItem = {}
      this.modalSale = false
    },
  },
};
</script>

<style src="./Sale.scss" lang="scss"></style>
