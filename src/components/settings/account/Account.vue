<template>
  <v-card id="account" color="var(--clr-card-3)" style="display:flex">
    <Alerts ref="alerts"></Alerts>
    <section>
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
import Alerts from '@/components/alerts/Alerts'
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
  components: { Alerts },
  data() {
    return {
      id: null,
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
    this.formData = new FormData();
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
        const url = "https://www.nearbase.io/nearbase/api/v1/profile/?wallet=" + this.account.wallet
        //const url = "http://127.0.0.1:8000/api/v1/profile/?wallet=" + this.account.wallet
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
        console.log("first",this.first_name)
        console.log("last_name",this.last_name)
        console.log("email",this.email)
        console.log("phone",this.phone)
        
        this.formData.append("wallet", wallet.getAccountId());
        if (this.first_name) {
          this.formData.append("first_name", this.first_name);
        }
        if (this.last_name) {
          this.formData.append("last_name", this.last_name);
        }
        if (this.email) {
          this.formData.append("email", this.email);
        }
        if (this.phone) {
          this.formData.append("phone", this.phone);
        }
        if (this.$store.state.user.image) {
          this.formData.append("avatar", this.$store.state.user.image);
        }

        const url = "https://www.nearbase.io/nearbase/api/v1/profile/"
        //const url = "http://127.0.0.1:8000/api/v1/profile/"
        this.axios.defaults.headers.common.Authorization='token '
        this.axios.post(url, this.formData)
          .then((response) => {
            if (response.data){
              this.$refs.alerts.Alerts('success', null, 'El perfil ha sido guardado');
              this.getData()
            }
        }).catch((error) => {
          console.log(error)
          this.$refs.alerts.Alerts('cancel', null, 'Ha ocurrido algo');
        })
      }
    },
    async setDataEdit () {
      console.log("aqui",this.$store.state.user.image)
      const near = await connect(config);
      const wallet = new WalletConnection(near)

      if (wallet.isSignedIn()) {
        //this.account.avatar = require("@/assets/images/cat.png")

        this.formData.append("wallet", wallet.getAccountId());
        this.formData.append("first_name", this.first_name);
        this.formData.append("last_name", this.last_name);
        if (this.email) {
          this.formData.append("email", this.email);
        }
        this.formData.append("phone", this.phone);
        if (this.$store.state.user.image) {
          this.formData.append("avatar", this.$store.state.user.image);
        }

        // this.account.wallet = wallet.getAccountId()
        // this.account.first_name = this.first_name
        // this.account.last_name = this.last_name
        // this.account.email = this.email
        // this.account.phone = this.phone
        // this.account.avatar = this.$store.state.user.image

        // console.log(this.account.avatar)

        const url = "https://www.nearbase.io/nearbase/api/v1/profile/" + this.id + "/"
        //const url = "http://127.0.0.1:8000/api/v1/profile/" + this.id + "/"
        this.axios.defaults.headers.common.Authorization='token '
        this.axios.patch(url, this.formData)
          .then((response) => {
            if (response.data){
              console.log(response.data)
              this.$refs.alerts.Alerts('success', null, 'El perfil ha sido actualizado');
              this.getData()
            }
        }).catch((error) => {
          console.log(error)
          this.$refs.alerts.Alerts('cancel', null, 'Ha ocurrido algo');
        })
      }
    },
  },
};
</script>

<style src="./Account.scss" lang="scss"></style>
