<template>
  <section class="parent">
    <section id="settings">
      <aside class="contHead divcol">
        <h2 class="relative">
          <v-btn icon class="backBtn buttons-icon" @click="$router.push('/')">
            <v-icon medium>mdi-arrow-left</v-icon>
          </v-btn>
          SETTINGS
        </h2>

        <div class="contProfile aend gap2">
          <v-badge
            overlap
            color="transparent"
            bottom
          >
            <template v-slot:badge>
              <v-btn icon style="background-color: #AD0FD5 !important">
                <v-icon color="#FFFFFF !important" medium>mdi-camera-outline</v-icon>
              </v-btn>
            </template>
            <v-avatar size="7em">
              <img
                alt="Avatar"
                :src="this.perfil"
                class="avatar"
              >
            </v-avatar>
          </v-badge>
          <h3 class="h5_em p">{{accountId}}
            <!-- <img class="editIcon" src="@/assets/icons/pen.png" alt="edit profile"> -->
          </h3>
        </div>
      </aside>

      <aside class="contMain">
        <v-list color="transparent" style="padding-block: 0">
          <v-list-item v-for="(item,i) in dataMain" :key="i" link :ripple="false"
            class="listaMain" :class="{active: item.active}" @click="SelectItem(item)"
          >
            <v-list-item-content class="space">
              <v-badge
                inline
                :value="messages"
                color="#C4C4C4"
                :class="{hide:item.badge}"
                class="start"
              >
                <template v-slot:badge>
                  <span style="color: #AD0FD5">{{ messages }}</span>
                </template>
                <span class="h8_em clr">{{ item.name }}</span>
              </v-badge>
            </v-list-item-content>
          </v-list-item>
          
          <v-btn v-if="publishBtn" class="publish font2" @click="PublishNew()">
            PUBLISH NEW WALLET FOR SALE
          </v-btn>
        </v-list>

        <section class="contViews">
          <router-view></router-view>
        </section>
      </aside>
    </section>
  </section>
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
  name: "settings",
  i18n: require("./i18n"),
  data() {
    return {
      accountId: null,
      messages: 1,
      dataMain: [
        {
          key: "account",
          name: "ACCOUNT",
          to: "/settings/account",
          badge: true,
          active: false
        },
        {
          key: "notifications",
          name: "NOTIFICATIONS",
          to: "/settings/notifications",
          badge: false,
          active: false
        },
        {
          key: "wallets",
          name: "WALLETS",
          to: "/settings/wallets/purchased",
          badge: true,
          active: false
        },
        {
          key: "privacy",
          name: "PRIVACY POLICY",
          badge: true,
          active: false
        },
        {
          key: "terms",
          name: "TERMS & SERVICE",
          badge: true,
          active: false
        },
      ],
      publishBtn: true,
    }
  },
  mounted() {
    this.isSigned()
    this.$router.push({path: '/settings/account'})
    this.dataMain[0].active = true
  },
  computed: {
    perfil() {
      return this.$store.state.user.perfil
    },
    initials() {
      return this.$store.state.user.initials
    },
    fullname() {
      return this.$store.state.user.fullname
    },
    email() {
      return this.$store.state.user.email
    }
  },
  methods: {
    SelectItem(item) {
      this.$router.push(item.to);
      this.dataMain.forEach(element => {element.active = false});item.active = true;
      this.publishBtn = true;
      if (item.key == 'wallets') {this.$store.dispatch('NavigateWallets', {key: 'purchased'})}
    },
    PublishNew() {
      this.dataMain.forEach(element => {element.active = false})
      this.dataMain[2].active = true
      this.publishBtn = false
      this.$router.push({path: '/settings/wallets/publish'})
      this.$store.dispatch('NavigateWallets', {key: 'publish'})
      this.$store.dispatch('FilterState', {key: 'inactive'})
    },
    async isSigned () {    
      const near = await connect(config);
      const wallet = new WalletConnection(near)
      if (wallet.isSignedIn()) {
        const walletAccountId = wallet.getAccountId()
        this.accountId = walletAccountId
      }
    },
  },
};
</script>

<style src="./Settings.scss" lang="scss"></style>
