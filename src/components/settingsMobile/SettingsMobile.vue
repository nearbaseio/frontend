<template>
  <section id="menuHeader" class="settingsMobile">
    <!-- drawer user log out -->
    <v-navigation-drawer
      id="toggleBarMobile"
      v-model="drawerUserOut"
      fixed
      right
      :stateless="true"
      :overlay-opacity="overlay_opacity"
      :overlay-color="overlay_color"
      color="var(--clr-card)"
    >
      <!-- mobile -->
      <v-col class="headerUserMobile relative acenter divcol">
        <aside class="space fill_w">
          <div class="divrow" style="gap: 1em">
            <v-btn class="buttons-icon" icon @click.stop="backClose()">
              <v-icon small>mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn class="languageIcon buttons-icon" icon @click="drawerLanguage = true">
              <img src="@/assets/icons/world.png" alt="language button" style="filter: invert(100%)">
            </v-btn>
          </div>

          <v-btn class="buttonsMobile h11_em acenter" @click="LogOut()">
            LOG OUT
            <img src="@/assets/icons/exit.png" alt="exit to app icon">
          </v-btn>
        </aside>
        <aside class="space fill_w">
          <h3 class="h6_em p">PATRICIA SILVA
            <img class="editIcon" src="@/assets/icons/pen.png" alt="edit profile">
          </h3>
          <v-badge
            overlap
            color="transparent"
            bottom
          >
            <template v-slot:badge>
              <v-btn icon style="background-color: #AD0FD5 !important">
                <v-icon color="#FFFFFF !important" small>mdi-camera-outline</v-icon>
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
        </aside>
      </v-col>

      <MainMobile ref="main"></MainMobile>

      <aside v-if="footerMobile" class="footerMobile">
        <v-col class="contIcons relative spacee">
          <v-btn v-for="(item, index) in dataRedes" :key="index"
            icon :href="item.to">
            <img :src="item.icon" alt="social icons">
          </v-btn>
        </v-col>
      </aside>
    </v-navigation-drawer>


    <!-- drawer language -->
    <v-navigation-drawer
      id="toggleBarMobile"
      v-model="drawerLanguage"
      fixed
      width="100vw"
      height="100vh"
      left
      :stateless="true"
      :overlay-opacity="overlay_opacity"
      :overlay-color="overlay_color"
      color="var(--clr-bg-language)"
      class="drawerLanguage"
    >
      <div class="tag">
        Languages
      </div>

      <v-card color="var(--clr-badge-inv)" class="contLanguage">
        <v-btn @click.stop="drawerLanguage = false"
          style="background-color: var(--clr-badge) !important" class="closeLanguaje" icon>
          <v-icon style="color: var(--clr-text-badge) !important" small>close</v-icon>
        </v-btn>

        <v-list class="fill_w divcol gap2">
          <v-list-item v-for="(item, index) in dataDrawerLanguage" :key="index"
            link :ripple="false" @click="SelectLanguage(item)"
            class="hover_line">
            <v-list-item-content class="space">
              <aside class="contitems divrow" style="max-width: max-content">
                <span class="h8_em clr" style="max-width: max-content">{{ item.name }}</span>
              </aside>

              <img class="arrowRight"  :src="`${$store.state.baseURL}themes/${$store.state.theme}/arrow-right.png`" alt="arrow to right">

              <v-btn v-if="item.themeButtonDark" icon class="themeButtonDark">
                <img src="@/assets/icons/moon.png" alt="theme button">
              </v-btn>
              <v-btn v-if="item.themeButtonLight" icon class="themeButtonLight">
                <img src="@/assets/icons/sun.png" alt="theme button">
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </section>
</template>

<script>
import { i18n } from "@/plugins/i18n";
import MainMobile from "./MainMobile";
export default {
  name: "settingsMobile",
  i18n: require("./i18n"),
  components: {MainMobile},
  created() {
    const theme = localStorage.getItem("theme");
    this.OverlayMethod(theme);
  },
  data() {
    return {
      overlay_opacity: "0.2",
      overlay_color: "white",
      // footer mobile
      footerMobile: true,
      // drawer user log out mobile
      drawerUserOut: false,
      // drawer language
      drawerLanguage: false,
      // redes
      dataRedes: [
        {
          icon: require("@/assets/icons/discord.png"),
          to: "#"
        },
        {
          icon: require("@/assets/icons/twitter.png"),
          to: "#"
        },
        {
          icon: require("@/assets/icons/youtube.png"),
          to: "#"
        },
        {
          icon: require("@/assets/icons/instagram.png"),
          to: "#"
        },
      ],
      // language
      dataDrawerLanguage: [
        {
          key: "US",
          name: "ENGLISH",
        },
        {
          key: "ES",
          name: "ESPAÑOL",
        },
        {
          key: "CH",
          name: "中国人",
        },
        {
          key: "RUS",
          name: "русский",
        },
      ]
    };
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
    backClose() {
      const main = this.$refs.main.profile;
      if (main.notifications == true || main.wallets == true 
      || main.privacy == true || main.terms == true) {
        this.$refs.main.clearProfile();
        main.main = true
        this.footerMobile = true;
      } else {this.drawerUserOut = false}
    },
    OverlayMethod(theme) {
      if (theme == "dark") {
        this.overlay_opacity = "0.5";
        this.overlay_color = "black"
      }
      if (theme == "light") {
        this.overlay_opacity = "0.2";
        this.overlay_color = "white"
      }
    },
    ShowDrawerUser() {
      if (localStorage.getItem('logKey') == 'in') {
        this.drawerUserOut = !this.drawerUserOut
      }
    },
    CambiarLanguage(lang) {
      if (lang === "ES") {
        localStorage.language = lang;
        i18n.locale = lang;
      } else {
        localStorage.language = lang;
        i18n.locale = lang;
      }
    },
    LogOut() {
      this.drawerUserOut = false
      this.$parent.signOut();
      // localStorage.setItem('logKey', JSON.parse('in'))
    }
  },
};
</script>

<style src="./SettingsMobile.scss" lang="scss"></style>
