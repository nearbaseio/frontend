<template>
  <v-card id="account" color="var(--clr-card-3)" style="display:flex">
    <section>
      <v-snackbar v-model="snackbar.visible" auto-height :color="snackbar.color" :multi-line="snackbar.mode === 'multi-line'" :timeout="snackbar.timeout" :top="snackbar.position === 'top'">
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.text }}</div>
        </v-layout>
      </v-layout>
      <v-btn v-if="snackbar.timeout === 0" icon @click="snackbar.visible = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>
      <aside class="divcol">
        <div class="space">
          <label class="h9_em" for="nearName">FIRST NAME</label>
          <span class="tip">Visible to other members</span>
        </div>
        <v-text-field
          v-model="first_name"
          id="nearName"
          solo
          hide-details
        ></v-text-field>
      </aside>
      
      <aside class="divcol">
        <label class="h9_em" for="fullName">LAST NAME</label>
        <v-text-field
          v-model="last_name"
          id="fullName"
          solo
          hide-details
        ></v-text-field>
      </aside>
      
      <aside class="divcol">
        <div class="space">
          <label class="h9_em" for="email">EMAIL</label>
          <span class="tip">For notifications</span>
        </div>
        <v-text-field
          v-model="email"
          id="email"
          solo
          hide-details
        ></v-text-field>
      </aside>
      
      <aside class="divcol">
        <div class="space">
          <label class="h9_em" for="phone">PHONE NUMBER</label>
          <span class="tip">For receiving notifications</span>
        </div>
        <v-text-field
          v-model="phone"
          id="phone"
          solo
          hide-details
        ></v-text-field>
      </aside>
    </section>

    <v-btn 
      v-if="newProfile"
      class="h11_em buttons align"
      @click="setData()"
    >
      SAVE CHANGES
    </v-btn>
    <v-btn 
      v-else
      class="h11_em buttons align"
      @click="setDataEdit()"
    >
      SAVE CHANGES
    </v-btn>
  </v-card>
</template>

<script>
import * as nearAPI from 'near-api-js'
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
  name: "account",
  i18n: require("../i18n"),
  data() {
    return {
      id: null,
      snackbar: {},
      account: {},
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      wallet: null,
      newProfile: null,
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      this.account = {}
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      const wallet = new WalletConnection(near)
      this.account.wallet = wallet.getAccountId()

      if (wallet.isSignedIn()) {
        const url = "api/v1/profile/?wallet=" + this.account.wallet
        this.axios.defaults.headers.common.Authorization='token'
        this.axios.get(url)
          .then((response) => {
            console.log(response.data)
            if (response.data[0]){
              this.id = response.data[0].id
              this.first_name = response.data[0].first_name
              this.last_name = response.data[0].last_name
              this.email = response.data[0].email
              this.phone = response.data[0].phone
              this.newProfile = false
            } else {
              this.newProfile = true
            }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    async setData () {
      const near = await connect(config);
      const wallet = new WalletConnection(near)

      if (wallet.isSignedIn()) {
        this.account.wallet = wallet.getAccountId()
        this.account.first_name = this.first_name
        this.account.last_name = this.last_name
        this.account.email = this.email
        this.account.phone = this.phone

        const url = "api/v1/profile/"
        this.axios.defaults.headers.common.Authorization='token '
        this.axios.post(url, this.account)
          .then((response) => {
            if (response.data){
              this.snackbar = {
                color: "green",
                icon: "check_circle",
                mode: "multi-line",
                position: "top",
                timeout: 1500,
                title: "Éxito!",
                text: "El perfil ha sido guardado",
                visible: true
              }
              this.getData()
            }
        }).catch((error) => {
          console.log(error)
          this.snackbar = {
            color: "red",
            icon: "error",
            mode: "multi-line",
            position: "top",
            timeout: 1500,
            title: "Error!",
            text: "Ha ocurrido algo",
            visible: true
          }
        })
      }
    },
    async setDataEdit () {
      const near = await connect(config);
      const wallet = new WalletConnection(near)

      if (wallet.isSignedIn()) {
        this.account.wallet = wallet.getAccountId()
        this.account.first_name = this.first_name
        this.account.last_name = this.last_name
        this.account.email = this.email
        this.account.phone = this.phone

        const url = "api/v1/profile/" + this.id + "/"
        this.axios.defaults.headers.common.Authorization='token '
        this.axios.put(url, this.account)
          .then((response) => {
            if (response.data){
              console.log(response.data)
              this.snackbar = {
                color: "green",
                icon: "check_circle",
                mode: "multi-line",
                position: "top",
                timeout: 1500,
                title: "Éxito!",
                text: "El perfil ha sido actualizado",
                visible: true
              }
              this.getData()
            }
        }).catch((error) => {
          console.log(error)
          this.snackbar = {
            color: "red",
            icon: "error",
            mode: "multi-line",
            position: "top",
            timeout: 1500,
            title: "Error!",
            text: "Ha ocurrido algo",
            visible: true
          }
        })
      }
    },
  },
};
</script>

<style src="./Account.scss" lang="scss"></style>
