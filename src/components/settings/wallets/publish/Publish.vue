<template>
  <section id="wallets" class="publishNew divcol gap2">
    <Alerts ref="alerts"></Alerts>
    <h3 class="font1 normal">NEW WALLET FOR SALE</h3>
    <v-card class="cartaPublish divcol gap2" color="var(--clr-card-3)" style="display:flex">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <aside class="divcol">
          <label for="link">WALLET ID</label>
          <v-text-field
            v-model="domain"
            id="link"
            solo
            hide-details
            :rules="rules.date"
            @input="minusculas()"
          ></v-text-field>
        </aside>

        <aside class="divcol">
          <label>SECRET PHRASE 
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon class="btn3" width="2em" height="2em" v-bind="attrs" v-on="on" @click="pasteSeedPhrase()">
                  <v-icon style="color: #FFFFFF !important" size="1.2em">mdi-content-paste</v-icon>
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
              :type="item.showPhrase ? 'text' : 'password'"
              :append-icon="item.showPhrase ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="rules.date"
              @click:append="item.showPhrase = !item.showPhrase"
            >
              <template v-slot:prepend>
                <span class="h11_em font2">{{i+1}}.</span>
              </template>
            </v-text-field>
          </section>
        </aside>

        <aside class="space gap2">
          <div class="divcol">
            <label for="price">SALE PRICE</label>
            <v-text-field
              v-model="price"
              id="price"
              solo
              hide-details
              hide-spin-buttons
              type="number"
              :rules="rules.date"
            ></v-text-field>
          </div>
          <div class="divcol">
            <label for="crypto">SELECT CRYPTO</label>
            <v-select
              v-model="filterCrypto.title"
              :items="filterCrypto.by"
              item-text="crypto"
              item-value="crypto"
              id="crypto"
              solo
              hide-details
              :menu-props="{ bottom: true, offsetY: true }"
              :rules="rules.date"
            >
              <template v-slot:append>
                <v-btn icon class="buttons-icon">
                  <v-icon x-small>mdi-arrow-down</v-icon>
                </v-btn>
              </template>

              <template v-slot:selection="slotProps">
                <img class="cryptoSelectImg" :src="slotProps.item.img" alt="Crypto token">
                <span class="cryptoSelect">
                  {{ slotProps.item.crypto }}
                </span>
              </template>

              <template v-slot:item="slotProps">
                <img class="cryptoSelectImg" :src="slotProps.item.img" alt="Crypto token">
                <span class="cryptoSelect">
                  {{ slotProps.item.crypto }}
                </span>
              </template>
            </v-select>
          </div>
        </aside>
      </v-form>


        <v-checkbox
          v-model="selected"
          hide-details
          @change="check()"
        >
          <template v-slot:label>
            <a class="tstart h14_em" :class="colorTerms?'active':'' "  @click="hola(); modalPublish=true">
            TERMS &amp; CONDITIONS
          </a>
          </template>
        </v-checkbox>

        <v-dialog v-model="modalPublish" max-width="500" scrollable>
          <v-card class="modalPublish divcol padd1">
            <h3 class="h7_em tcenter">TERMS &amp; CONDITIONS</h3>
            <p class="font2 h10_em tspace">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint atque voluptatem consectetur animi accusantium adipisci repudiandae! At reiciendis, voluptate, repellat ducimus deleniti repudiandae esse dicta odio adipisci, dolor tempora quam?
            </p>
            <aside class="center">
              <v-btn @click="modalPublish=false" class="btn3 h11_em">ACCEPT</v-btn>
            </aside>
          </v-card>
        </v-dialog>


      <aside class="lastcont end">
        <v-btn 
          v-if="!progress"
          class="h11_em buttons" 
          @click="publishDomain()"
        >
          PUBLISH WALLET
        </v-btn>
        <v-btn 
          v-if="progress"
          class="h11_em buttons" 
          disabled
          @click="publishDomain()"
        >
          PUBLISH WALLET
          <v-progress-circular
            :size="18"
            :width="4"
            indeterminate
          ></v-progress-circular>
        </v-btn>
      </aside>
    </v-card>
  </section>
</template>

<script>
import Alerts from '@/components/alerts/Alerts'
import * as nearAPI from 'near-api-js'
import axios from 'axios'
const { connect, keyStores, WalletConnection } = nearAPI

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
  name: "walletsPublish",
  i18n: require("../../i18n"),
  components: { Alerts },
  data() {
    return {
      modalPublish: false,
      colorTerms: false,
      selected: false,
      progress: false,
      valid: true,
      domain: null,
      price: null,
      coin: null,
      dataPhrase: [
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
        {
          model: null,
          showPhrase: false,
        },
      ],
      filterCrypto: {
        title: "NEAR",
        by: [
          {
            img: require("@/assets/crypto/eth.svg"),
            crypto: "NEAR",
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
  methods: {
    async pasteSeedPhrase() {
      let paste = await navigator.clipboard.readText();
      let seedPhrase = paste.split(' ')
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
    },
    check () {
      this.colorTerms = this.selected 
    },
    hola () {
      this.selected = !this.selected
      this.modalPublish = true
    },
    async publishDomain () {
      /*
      var images = [
              require("@/assets/images/bear.png"),
              require("@/assets/images/cat.png"),
              require("@/assets/images/gorilla.png"),
              require("@/assets/images/polar-bear.png"),
              require("@/assets/images/weasel.png")  
            ];
      console.log(images)*/
      if (this.$refs.form.validate()) {
        if (this.selected) {
          this.progress = true
          const near = await connect(config);
          const wallet = new WalletConnection(near)

          if (wallet.isSignedIn()) {
            let item = {}
/*
            var randomName = images[Math.floor(Math.random() * images.length)];

            document.getElementById("randomImage").style.backgroundImage 
            = "url('http://bukk.it/" + randomName + "')"*/

            item.domain = this.domain
            item.mnemonic = this.dataPhrase[0].model + " " + this.dataPhrase[1].model + " " + this.dataPhrase[2].model + " " + this.dataPhrase[3].model + " " + this.dataPhrase[4].model + " " + this.dataPhrase[5].model + " " + this.dataPhrase[6].model + " " + this.dataPhrase[7].model + " " + this.dataPhrase[8].model + " " + this.dataPhrase[9].model + " " + this.dataPhrase[10].model + " " + this.dataPhrase[11].model
            item.userSeller = wallet.getAccountId()
            item.price = this.price
            item.coin = this.filterCrypto.title

            const url = "http://localhost:3080/api/v1/publish-domain/"
            axios.post(url, item)
              .then((response) => {
                console.log(response)
                if (response.status === 200){
                  this.$refs.alerts.Alerts('success', null, 'Published domain');
                  this.$router.push({ path: '/settings/wallets/sale' })         
                } else if (response.status === 204){
                  this.$refs.alerts.Alerts('cancel', null, 'Datos invalidos');
                }  
                this.progress = false
            }).catch((error) => {
              console.log(error)
              this.$refs.alerts.Alerts('cancel', null, error);
              this.progress = false
            })
          }
        } else {
          this.$refs.alerts.Alerts('cancel', null, 'Terminos y Condiciones');
          this.progress = false
        }
      } else {
        this.$refs.alerts.Alerts('cancel', null, 'Ingrese los valores requeridos');
        this.progress = false
      }
    },
    minusculas() {
      this.domain = this.domain.toLowerCase()
    }
  },
};
</script>

<style src="./Publish.scss" lang="scss"></style>
