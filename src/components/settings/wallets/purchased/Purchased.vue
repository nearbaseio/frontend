<template>
  <section id="wallets" class="purchased divcol gap2">
    <v-card v-for="(item,i) in dataPurchased" :key="i" class="cartaDown divcol" style="display:flex"
      color="var(--clr-card-3)">
      <img class="imgTop" :src="item.img" alt="reference img">
      <v-btn :disabled="item.retired" class="h11_em btnOutline" @click="showDialogResell(item)">
        RESELL
      </v-btn>

      <div class="divcol">
        <h3 class="font1 h7_em tcenter">{{ item.title }}</h3>

        <aside class="divcol font2">
          <span class="h11_em">Current price <br>NEAR</span>
          <div class="contPrice">
            <span class="h7_em bold" style="margin-right: clamp(.5em, 1vw, 1em);">{{ item.near }}</span>
            <span class="h11_em">(${{ item.dollar }})</span>
          </div>
        </aside>
      </div>

      <v-btn v-if="item.retired" disabled class="h11_em btn align" @click="showDialog(item),modalPurchased=true; windowModal=1">
        WITHDRAWN
      </v-btn>

      <v-btn v-else class="h11_em btn align" @click="showDialog(item),modalPurchased=true; windowModal=1">
        WITHDRAW WALLET
      </v-btn>

      <v-dialog
        v-model="modalPurchased"
        :max-width="windowModal==1?450:900"
        scrollable
      >
        <v-window v-model="windowModal" vertical>
          <v-window-item :value="1">
            <v-card class="modalPurchased divcol">
              <h3 class="h7_em tcenter">Do you wish to continue</h3>
              <p class="h10_em font2 tspace">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint atque voluptatem consectetur animi accusantium adipisci repudiandae! At reiciendis, voluptate, repellat ducimus deleniti repudiandae esse dicta odio adipisci, dolor tempora quam?</p>
              <aside class="center gap2">
                <v-btn :disabled="withdrawProgress" class="btn2" @click="modalPurchased=false">CANCEL</v-btn>
                <v-btn 
                  :disabled="withdrawProgress"
                  class="btn" 
                  @click="withdrawDomain()"
                >
                  ACCEPT
                  <v-progress-circular
                    v-if="withdrawProgress"
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
                      :rules="rules.date"
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
                <v-btn class="btn" @click="getDomainsPurchased(),modalPurchased=false">ACCEPT</v-btn>
              </aside>
            </v-card>
          </v-window-item>
        </v-window>
      </v-dialog>
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
              <span class="font3 h10_em not_clr" style="color:#FFFFFF">RESELL: {{editedItem.domain}}</span>
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
            <v-btn :disabled="changeProgress" @click="resellDomain()" class="btn3 h12_em">
              PUBLISH WALLET
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
    </v-card>
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
  name: "walletsPurchased",
  i18n: require("../../i18n"),
  data() {
    return {
      editedItem: {},
      changeProgress: false,
      modalSale: false,
      num: 0,
      snackbar: {},
      domainItem: {},
      priceNear: null,
      dataPurchased: [],
      withdrawProgress: false,
      modalPurchased: false,
      windowModal: 1,
      valid: true,
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
      rules: {
        date: [
          v => !!v || 'El valor es requerido',
        ],
        long: [
          v => (v || '' ).length <= 255 || '255 caracteres o menos',
        ],
        email: [
          v => /.+@.+\..+/.test(v) || 'E-mail tiene que ser valido',
        ]
      },
    }
  },
  async mounted () {
    await this.priceNEAR()
    this.getDomainsPurchased()
  },
  methods: {
    copyToClipBoard() {
      let seedPhrase = this.dataPhrase[0].model + " " + this.dataPhrase[1].model + " " + this.dataPhrase[2].model + " " + this.dataPhrase[3].model + " " + this.dataPhrase[4].model + " " + this.dataPhrase[5].model + " " + this.dataPhrase[6].model + " " + this.dataPhrase[7].model + " " + this.dataPhrase[8].model + " " + this.dataPhrase[9].model + " " + this.dataPhrase[10].model + " " + this.dataPhrase[11].model
      navigator.clipboard.writeText(seedPhrase);
    
    },
    formatPrice (price) {
      return utils.format.formatNearAmount(price.toLocaleString('fullwide', { useGrouping: false }))
    },
    showDialogResell (item) {
      this.editedItem = {}
      this.editedItem = {
        id: item.id,
        domain: item.title
      }
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
    showDialog (item) {
        console.log(item)
        this.domainItem = {} 
        this.domainItem = item
    },
    async resellDomain () {
      this.changeProgress = true
      console.log(this.editedItem)

      if (this.editedItem.post_type > 0 && this.editedItem.post_type < 3 && this.editedItem.price > 0) {
        const CONTRACT_NAME = 'contract.nearbase.testnet'
        // connect to NEAR
        const near = await connect(config)
        // create wallet connection
        const wallet = new WalletConnection(near)
        const contract = new Contract(wallet.account(), CONTRACT_NAME, {
          changeMethods: ['resell_domain'],
          sender: wallet.account()
        })
        await contract.resell_domain({
          id: this.editedItem.id,
          price: utils.format.parseNearAmount(this.editedItem.price),
          post_type: this.editedItem.post_type
        })
          .then((response) => {
            //this.$refs.alerts.Alerts('success', null, 'Published domain');
            this.changeProgress = false
            this.getDomainsPurchased()
            this.closeDialog()
          }).catch((error) => {
            console.log(error)
            //this.$refs.alerts.Alerts('cancel', null, error);
            //item.ResProgress = false
            this.changeProgress = false
          })
      } else {
        this.$refs.alerts.Alerts('cancel', null, error);
      }
      
    },
    async withdrawDomain () {
      this.withdrawProgress = true
      const near = await connect(config);
      const wallet = new WalletConnection(near)

      if (wallet.isSignedIn()) {
        var item = {}
        item.owner_id = wallet.getAccountId()
        item.privateKey = localStorage.getItem("near-api-js:keystore:"+wallet.getAccountId()+":testnet");
        item.id_domain = this.domainItem.id

        //this.axios.defaults.headers.common.Authorization='token'
        const url = "api/v1/withdraw-domain/"
        this.axios.post(url, item)
              .then((response) => {
                console.log(response)
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
                  this.withdrawProgress = false    
                } else if (response.status === 204){
                    this.$refs.alerts.Alerts('cancel', null, "Algo ocurrio");
                    this.withdrawProgress = false
                  }  
            }).catch((error) => {
              this.$refs.alerts.Alerts('cancel', null, error);
              this.withdrawProgress = false
            })
      }
    },

    async getDomainsPurchased() {
      this.dataPurchased = []
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
        owner_id: wallet.getAccountId(),
      })
        .then(async (response) => {
          for (var i = 0; i < response.length; i++) {
            var item = {}
            item.id = response[i].id
            item.title = response[i].domain
            item.img = await require("@/assets/avatars/"+ (Math.floor((Math.random() * (6-1)) + 1)) +".png")
            item.near = this.formatPrice(response[i].purchase_price)
            item.dollar =  (item.near * this.priceNear).toFixed(2)
            item.retired = response[i].retired
            this.dataPurchased.push(item)
          }
          if (this.$store.state.user.filter === 'filter by recent') {
            console.log("Hola")
            this.dataPurchased = this.dataPurchased.reverse()
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

<style src="./Purchased.scss" lang="scss"></style>
