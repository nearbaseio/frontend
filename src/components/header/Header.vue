<template>
  <section id="header">
    <MenuHeader ref="menu"></MenuHeader>
    <SettingsMobile ref="settingsMobile"></SettingsMobile>
    <!-- mobile -->
    <v-col class="contavatarmobile vermobile">
      <v-btn v-if="mobile.login" class="loginbtn buttons h11_em" @click="signIn()">
        CONNECT
        <v-icon small>mdi-arrow-right</v-icon>
      </v-btn>

      <v-btn
        v-if="mobile.avatar"
        icon
        @click.stop="ShowDrawer('user');"
        class="animation-left"
      >
        <v-badge
          overlap
          :content="messages"
          :value="messages"
          color="var(--clr-badge)"
          class="avatar"
        >
          <v-avatar
            size="60"
          >
            <img
              alt="Avatar"
              :src="this.perfil"
            >
          </v-avatar>
        </v-badge>
      </v-btn>

      <v-btn v-if="mobile.navigation" @click="NavigationMobile('inactive')"
        icon class="arrow buttons-icon animation-left">
        <v-icon small>mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>
    <!-- desktop -->
    <!-- toggle -->
    <v-btn
      class="toggle"
      @click.stop="ShowDrawer('menu');"
    >
      <img :src="toggle" alt="toggle button">
    </v-btn>
    <div class="sombra eliminarmobile" />

    <v-app-bar
      id="headerApp"
      color="var(--clr-card)"
      height="100px"
      fixed
      v-if="navigationMobile"
    >
      <v-row>
        <v-col class="contheader centermobile paddtopdelmobile">
          <aside class="sectleft acenter eliminarmobile">
            <!-- logo -->
            <router-link :to="('/')" class="eliminarmobile">
              <img class="logo" :src="`${$store.state.baseURL}themes/${$store.state.theme}/logo.png`"
                alt="Logo">
            </router-link>
          </aside>

          <!-- content -->
          <aside class="sectright divrow">
            <v-text-field
              id="search"
              prepend-inner-icon="mdi-magnify"
              :hide-details="true"
              v-on:input="search()"
            >
            </v-text-field>
            <div class="contbuttons eliminarmobile center">
              <v-btn v-if="themeButton" icon @click="CambiarTheme('dark'), CambiarTheme2('dark'), ThemeButtonMobile('dark')"
                class="themeButtonDark">
                <img src="@/assets/icons/moon.png" alt="theme button">
              </v-btn>
              <v-btn v-else icon @click="CambiarTheme('light'), CambiarTheme2('light'), ThemeButtonMobile('light')"
                class="themeButtonLight">
                <img src="@/assets/icons/sun.png" alt="theme button">
              </v-btn>

              <v-btn
                v-if="!user"
                icon
                class="animation-left logoutDesktop"
                @click="$router.push('/settings/account')"
              >
                <v-badge
                  overlap
                  :content="messages"
                  :value="messages"
                  color="var(--clr-badge)"
                  class="avatar"
                >
                  <v-avatar
                    size="60"
                  >
                    <img
                      alt="Avatar"
                      :src="this.perfil"
                    >
                  </v-avatar>
                </v-badge>
              </v-btn>
              <v-btn v-if="user" class="buttons h11_em" @click="signIn()">
                LOG IN WITH NEAR
                <v-icon medium>mdi-arrow-right</v-icon>
              </v-btn>
              <v-btn v-else class="buttons h11_em" @click="signOut()">
                LOG OUT
                <v-icon medium>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </aside>
        </v-col>
      </v-row>
    </v-app-bar>
  </section>
</template>

<script>
import MenuHeader from "./MenuHeader.vue"
import SettingsMobile from "@/components/settingsMobile/SettingsMobile.vue"
import * as nearAPI from 'near-api-js'

const theme = localStorage.getItem("theme");

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
  name: "header",
  components: { MenuHeader, SettingsMobile },
  i18n: require("./i18n"),
  created() {
    this.element = document.getElementById("theme");
    if (theme) {
      this.CambiarTheme(theme);
    }
    if (theme == "light") {
      this.themeButton = true;
    }
    if (theme == "dark") {
      this.themeButton = false;
    }
  },
  computed: {
    perfil() {
      return this.$store.state.user.perfil
    },
  },
  data() {
    return {
      accountId: null,
      mobile: {
        login: true,
        avatar: false,
        navigation: false,
      },
      user: true,
      navigationMobile: true,
      messages: 0,
      toggle: require("@/assets/icons/toggle.png"),
      themeButton: true,
      dataHeader: [
        {
          title: "Home",
          link: "#"
        },
        {
          title: "Staking",
          link: "#"
        },
        {
          title: "Community",
          link: "#"
        },
        {
          title: "About",
          link: "#"
        },
        {
          title: "Languaje",
          link: "#"
        },
        {
          title: "Contact",
          link: "#"
        }
      ],
    };
  },
  mounted() {
    window.addEventListener('resize', this.getDimensions);
    this.isSigned()
    this.getData()
    this.responsive();
    this.$refs.menu.ThemeButtonMobile(theme);
    this.UserState();
    this.NavigationState();
    this.LogState();

    /* search function */
    const search = document.getElementById('search')
    const filterItems = document.querySelectorAll('.filterItems')
    search.addEventListener('keyup',e=>{
      filterItems.forEach(item=>{
        item.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        ?item.style.display='block':item.style.display='none'
        if (e.key=='Escape') {e.target.value = ''}
        // to delete at empty text field
        if (e.target.value == '') {item.style.display='none'}
      })
    })
    // to delete for default
    document.querySelectorAll('.filterItems').forEach(item=>{
      if (search.textContent == '') {item.style.display='none'}
    })
  },
  methods: {
    search() {
      this.$router.push('/explore/market');
      const search = document.getElementById('search')
      const filterItems = document.querySelectorAll('.filterItems')
      const filterContent = document.querySelector('.filterContent')
      console.log(filterContent)
      search.addEventListener('keyup',e=>{
        filterItems.forEach(item=>{
          item.textContent.toLowerCase().includes(e.target.value.toLowerCase())
          ?item.style.display='block':item.style.display='none'
          if (e.key=='Escape') {e.target.value = ''}
          // // to delete at empty text field
          // if (e.target.value == '') {item.style.display='none'}
        })
      })
    },
    async getData () {
      this.account = {}
      // connect to NEAR
      const near = await connect(config);
      // create wallet connection
      const wallet = new WalletConnection(near)
      this.accountId= wallet.getAccountId()

      if (wallet.isSignedIn()) {
        //const url = "https://nearbase.io:85/nearbase/api/v1/profile/?wallet=" + this.accountId
        const url = "http://127.0.0.1:8000/api/v1/profile/?wallet=" + this.accountId
        this.axios.defaults.headers.common.Authorization='token'
        this.axios.get(url)
          .then((response) => {
            if (response.data[0]){
              this.avatar = response.data[0].avatar || require("@/assets/user/avatar.png")
              this.$store.dispatch("Avatar", {avatar: this.avatar})
            }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    getDimensions() {
      this.responsive();
    },
    responsive() {
      if (window.innerWidth <= 880) {
        this.toggle = require("@/assets/icons/toggle-mobile.png")
        this.$refs.menu.drawer = false;
        //
        this.NavigationState();
        //
        if (this.$router.currentRoute.name == 'account' || this.$router.currentRoute.name == 'settings'
        || this.$router.currentRoute.name == 'walletsPurchased' || this.$router.currentRoute.name == 'walletsSold'
        || this.$router.currentRoute.name == 'walletsSale' || this.$router.currentRoute.name == 'walletsPublish'
        || this.$router.currentRoute.name == 'privacy' || this.$router.currentRoute.name == 'terms') {
          this.$router.push({path: '/'})
        }
      } else {
        this.toggle = require("@/assets/icons/toggle.png")
        this.$refs.settingsMobile.drawerUserOut = false;
        this.$refs.menu.drawerMenuMobile = false;
        this.$refs.menu.drawerLanguage = false;
        //
        this.navigationMobile = true
        this.mobile.navigation = false
        this.UserState()
        this.$parent.$parent.$refs.footer.NavigationMobile('inactive')
      }
    },
    ShowDrawer(item) {
      if (item == 'user') {
        this.$refs.settingsMobile.ShowDrawerUser();
      }
      if (item == 'menu') {
        this.$refs.menu.ShowDrawerMenu();
      }
    },
    CambiarTheme(theme) {
      this.$store.dispatch("CambiarTheme", { theme, element: this.element });
      this.themeButton = !this.themeButton;
    },
    CambiarTheme2(theme) {
      this.$refs.menu.OverlayMethod(theme);
    },
    ThemeButtonMobile(theme) {
      this.$refs.menu.ThemeButtonMobile(theme);
    },
    // use for update account log states
    LogState() {
      if (localStorage.getItem('logKey') == 'in') {
        this.user = false
      }
      if (localStorage.getItem('logKey') == 'out') {
        this.user = true
      }
    },
    // use for update mobile states
    UserState() {
      if (this.user == true) {
        this.mobile.avatar = false
        this.mobile.login = true
        this.mobile.navigation = false
        this.$parent.$parent.$refs.footer.userBtn = false;
      } else {
        this.mobile.avatar = true
        this.mobile.login = false
        this.mobile.navigation = false
        this.$parent.$parent.$refs.footer.userBtn = true;
      }
    },
    // use for update navigation state
    NavigationState() {
      if (window.innerWidth < 880) {
        if (localStorage.getItem('navigationState') == 'inactive') {
          this.navigationMobile = true
          this.UserState()
          this.mobile.navigation = false
          this.$parent.$parent.$refs.footer.NavigationMobile('inactive')
        }
        if (localStorage.getItem('navigationState') == 'active') {
          this.navigationMobile = false
          this.mobile.navigation = true
          this.mobile.login = false
          this.mobile.avatar = false
          this.$parent.$parent.$refs.footer.NavigationMobile('active')
        }
      }
    },
    NavigationMobile(key) {
      if (key == 'active') {
        localStorage.setItem('navigationState', 'active')
        this.navigationMobile = false
        this.mobile.navigation = true
        this.mobile.login = false
        this.mobile.avatar = false
        this.$parent.$parent.$refs.footer.NavigationMobile(key)
      }
      if (key == 'inactive') {
        localStorage.setItem('navigationState', 'inactive')
        this.navigationMobile = true
        this.mobile.navigation = false
        this.UserState()
        this.$parent.$parent.$refs.footer.NavigationMobile(key)
      }
    },
    async signIn () {
      const near = await connect(config);
      const wallet = new WalletConnection(near)
      wallet.requestSignIn(
        'contract.nearbase.testnet'
      )
    },
    async isSigned () {
      const near = await connect(config);
      const wallet = new WalletConnection(near)
      if (wallet.isSignedIn()) {
        localStorage.setItem('logKey', 'in')
        this.user = false
        this.UserState()
      }
    },
    async signOut () {
      const near = await connect(config);
      const wallet = new WalletConnection(near)
      wallet.signOut()
      localStorage.setItem('logKey', 'out')
      this.user = true
      this.UserState();
      this.$router.push({ path: '/' })
    },
  },
};
</script>

<style src="./Header.scss" lang="scss" />
