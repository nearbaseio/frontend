<template>
  <section id="menuHeader">
    <!-- drawer -->
    <v-navigation-drawer
      id="toggleBar"
      v-model="drawer"
      fixed
      width="10%"
      height="100%"
      left
      :overlay-opacity="overlay_opacity"
      :overlay-color="overlay_color"
      temporary
      color="var(--clr-btn)"
      style="padding-top: 100px"
    >
      <v-expansion-panels focusable accordion class="animation-left">
        <template v-if="dataDrawer.list">
          <v-list class="fill_w">
            <v-list-item v-for="(item,i) in dataDrawer.list" :key="i" class="hover_line"
              link :ripple="false" :to="(item.to)"
              :class="{openMenuStats: item.key=='stats'}">
              <v-list-item-content>
                <v-col class="contentToggle acenter align" xl="5" lg="8" md="9">
                  <img :src="item.icon" :alt="item.alt">
                  <span class="h11_em clr_text_btn" style="max-width: max-content">
                    {{ item.name }}
                  </span>
                </v-col>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>

        <template v-if="dataDrawer.expansion">
          <v-expansion-panel v-for="(item, index) in dataDrawer.expansion" :key="index">
            <v-expansion-panel-header hide-actions class="h11_em">
              <v-col class="contentToggle acenter align" xl="5" lg="8" md="9">
                <img :src="item.icon" :alt="item.alt" class="exclusiveClass">
                <span class="clr_text_btn" style="max-width: max-content">{{ item.name }}</span>
              </v-col>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-list>
                <v-list-item v-for="(item2, index) in item.selection" :key="index"
                  @click="CambiarLanguage(item2.key)" :ripple="false" class="hover_line">
                  <v-list-item-title class="center h11_em">
                    <span class="clr_text_btn">{{ item2.name}}</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </template>
      </v-expansion-panels>
    </v-navigation-drawer>

    <!--//// temporal deleted -->
    <!-- menu explore -->
    <!-- <v-menu
      right
      offset-x
      activator=".openMenuExplore"
    >
      <v-list max-width="max-content" class="menuList" color="#8A04AB" style="border-radius: 0 30px 30px 0;">
        <v-list-item v-for="(item, index) in dataMenuExplore" :key="index" class="hover_line"
          @click="$router.push(item.to)" link :ripple="false">
          <v-list-item-content>
            <span class="h11_em clr_text_btn">{{ item.name }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu> ////-->

    <!-- menu stats -->
    <v-menu
      right
      offset-x
      activator=".openMenuStats"
    >
      <v-list max-width="max-content" class="menuList" color="#8A04AB" style="border-radius: 0 30px 30px 0;">
        <v-list-item v-for="(item, index) in dataMenuStats" :key="index" class="hover_line"
          :to="(item.to)" link :ripple="false">
          <v-list-item-content>
            <span class="h11_em clr_text_btn">{{ item.name }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>


    <!-- drawer menu mobile -->
    <v-navigation-drawer
      id="toggleBarMobile"
      v-model="drawerMenuMobile"
      fixed
      width="100vw"
      height="100vh"
      left
      :stateless="true"
      :overlay-opacity="overlay_opacity"
      :overlay-color="overlay_color"
      color="var(--clr-card)"
    >
      <v-col class="headerMenuMobile relative acenter" :style="$parent.user?'margin-bottom: 3em':''">
        <v-btn class="close buttons-icon" icon @click.stop="drawerMenuMobile = false">
          <v-icon small>close</v-icon>
        </v-btn>

        <template v-if="$parent.user == false">
          <v-btn min-width="max-content" min-height="7em" icon
            @click.stop="$parent.$refs.settingsMobile.drawerUserOut = !$parent.$refs.settingsMobile.drawerUserOut">
            <v-badge overlap :content="messages" :value="messages" color="var(--clr-badge)">
              <v-avatar size="7em">
                <img alt="Avatar" :src="this.perfil" class="avatar">
              </v-avatar>
            </v-badge>
          </v-btn>

          <h3 class="h6_em p">PATRICIA SILVA
            <h6 class="h10 p">Last update 12 June, 2022</h6>
          </h3>
        </template>
      </v-col>

      <v-expansion-panels focusable accordion class="relative">
        <!-- list -->
        <v-expansion-panel v-for="(item, index) in dataDrawerMenuMobile" :key="index">
          <v-list>
            <v-list-item link :ripple="false" class="hover_line padd1block"
              @click="ItemDrawerMobile(item)">
              <v-list-item-content class="space">
                <aside class="contitems divrow" style="max-width: max-content">
                  <img class="filter_inv" :src="item.icon" :alt="item.alt">
                  <span class="h8_em clr" style="max-width: max-content">{{ item.name }}</span>
                </aside>

                <img v-if="item.key !== 'theme'" class="arrowRight" src="@/assets/icons/arrow-right.png" alt="arrow to right">

                <v-btn v-if="item.themeButtonDark" icon class="themeButtonDark">
                  <img src="@/assets/icons/moon.png" alt="theme button">
                </v-btn>
                <v-btn v-if="item.themeButtonLight" icon class="themeButtonLight">
                  <img src="@/assets/icons/sun.png" alt="theme button">
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel>

        <!--/* drawer explore (quitado temporal) */-->
        <!-- drawer explore -->
        <!-- <v-navigation-drawer
          id="toggleBarMobile"
          class="togglebarMenu"
          v-model="drawerExplore"
          absolute
          :stateless="true"
          width="100%"
          height="100%"
          left
          :overlay-opacity="overlay_opacity"
          :overlay-color="overlay_color"
          color="var(--clr-card)"
        >
          <v-expansion-panels focusable accordion>
            <v-expansion-panel v-for="(item, index) in dataExplore" :key="index">
              <v-list class="acenter">
                <v-btn :class="{visible: item.disabled}" @click="Back(item.key)"
                  class="arrows buttons-icon" icon>
                  <v-icon small>mdi-arrow-left</v-icon>
                </v-btn>

                <v-list-item link :ripple="false" @click="$router.push(item.to); ToNavigation()"
                  class="hover_line" :disabled="item.disabled" :class="{active: item.disabled}">
                  <v-list-item-content class="space">
                    <aside class="contitems divrow" style="max-width: max-content">
                      <span class="h8_em" style="max-width: max-content">{{ item.name }}</span>
                    </aside>

                    <img v-if="!item.disabled"
                      class="arrowRight" src="@/assets/icons/arrow-right.png" alt="arrow to right">
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-navigation-drawer> -->

        <!-- drawer estats -->
        <v-navigation-drawer
          id="toggleBarMobile"
          class="togglebarMenu"
          v-model="drawerStats"
          absolute
          :stateless="true"
          width="100%"
          height="100%"
          left
          :overlay-opacity="overlay_opacity"
          :overlay-color="overlay_color"
          color="var(--clr-card)"
        >
          <v-expansion-panels focusable accordion>
            <v-expansion-panel v-for="(item, index) in dataStats" :key="index">
              <v-list class="acenter">
                <v-btn :class="{visible: item.disabled}" @click="Back(item.key)"
                  class="arrows buttons-icon" icon>
                  <v-icon small>mdi-arrow-left</v-icon>
                </v-btn>

                <v-list-item link :ripple="false" @click="$router.push(item.to); ToNavigation()"
                  class="hover_line" :disabled="item.disabled" :class="{active: item.disabled}">
                  <v-list-item-content class="space">
                    <aside class="contitems divrow" style="max-width: max-content">
                      <span class="h8_em" style="max-width: max-content">{{ item.name }}</span>
                    </aside>

                    <img v-if="!item.disabled" class="arrowRight"
                      src="@/assets/icons/arrow-right.png" alt="arrow to right">
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-navigation-drawer>
      </v-expansion-panels>

      <aside class="footerMobile">
        <v-col v-if="$parent.user == true" class="center">
          <v-btn class="buttons h11_em" @click="$parent.signIn()">
            CONNECT WITH NEAR
            <v-icon medium>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
        <v-col class="contIcons relative spacee">
          <v-btn v-for="(item, index) in dataRedes" :key="index"
            icon :href="item.to" target="_blank">
            <img :src="item.icon" alt="social icons">
          </v-btn>
        </v-col>
      </aside>
    </v-navigation-drawer>
  </section>
</template>

<script>
export default {
  name: "headerMenu",
  i18n: require("./i18n"),
  created() {
    const theme = localStorage.getItem("theme");
    this.OverlayMethod(theme);
  },
  data() {
    return {
      messages: 1,
      overlay_opacity: "0.2",
      overlay_color: "white",

      // drawer desktop
      drawer: false,
      dataDrawer: {
        list: [
          {
            key: "featured",
            icon: require("@/assets/icons/dashboards.png"),
            name: "FEATURED",
            to: "/",
          },
          {
            key: "market",
            icon: require("@/assets/icons/brujula.png"),
            name: "MARKET",
            to: "/explore/market",
          },
          // {
          //   key: "stats",
          //   icon: require("@/assets/icons/stats.png"),
          //   name: "STATS",
          //   menuStats: true
          // },
          {
            key: "resources",
            icon: require("@/assets/icons/resources.png"),
            name: "RESOURCES",
          },
        ],
        expansion: [
          {
            exclusiveClass: true,
            icon: require("@/assets/icons/world.png"),
            name: "LANGUAGE",
            selection: [
              {name: "English", key: "US"},
              {name: "Spanish", key: "ES"},
              {name: "中国人", key: "CH"},
              {name: "русский", key: "RUS"},
            ],
          },
        ],
      },
      /////* drawer explore (quitado temporal) */////
      // menu explore
      // dataMenuExplore: [
      //   {
      //     name: "MARKET",
      //     to: "/explore/market"
      //   },
      //   {
      //     name: "TRENDING",
      //     to: "/explore/trending"
      //   },
      // ],
      // menu stats
      dataMenuStats: [
        {
          name: "RANKING",
          to: "/stats/ranking"
        },
        {
          name: "ACTIVITY",
        },
      ],


      // drawer mobile
      drawerMenuMobile: false,
      drawerExplore: false,
      drawerStats: false,
      dataDrawerMenuMobile: [
        {
          key: "featured",
          icon: require("@/assets/icons/dashboards.png"),
          name: "FEATURED",
        },
        {
          key: "explore",
          icon: require("@/assets/icons/brujula.png"),
          name: "MARKET",
        },
        /////* drawer explore (quitado temporal) *//////
        // {
        //   key: "explore",
        //   icon: require("@/assets/icons/brujula.png"),
        //   name: "EXPLORE",
        // },
        {
          key: "stats",
          icon: require("@/assets/icons/stats.png"),
          name: "STATS",
        },
        {
          icon: require("@/assets/icons/resources.png"),
          name: "RESOURCES",
        },
        {
          key: "theme",
          icon: require("@/assets/icons/theme.png"),
          name: "NIGHT MODE",
          themeButtonDark: true,
          themeButtonLight: false
        },
      ],
      /* drawer explore (quitado temporal) */
      // dataExplore: [
      //   {
      //     disabled: true,
      //     name: "EXPLORE",
      //     key: "back"
      //   },
      //   {
      //     name: "TRENDING",
      //     to: "/explore/trending",
      //   },
      //   {
      //     name: "MARKET",
      //     to: "/explore/market",
      //   },
      // ],
      dataStats: [
        {
          disabled: true,
          name: "STATS",
          key: "back"
        },
        {
          name: "RANKING",
          to: "/stats/ranking",
        },
        {
          name: "ACTIVITY",
        },
      ],
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
    };
  },
  computed: {
    perfil() {return this.$store.state.user.perfil},
    initials() {return this.$store.state.user.initials},
    fullname() {return this.$store.state.user.fullname},
    email() {return this.$store.state.user.email}
  },
  methods: {
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
    ShowDrawerMenu() {
      if (window.innerWidth <= 880) {
        this.drawerMenuMobile = !this.drawerMenuMobile
      } else {
        this.drawer = !this.drawer
      }
    },
    ThemeButtonMobile(theme) {
      if (theme == 'light') {
        this.dataDrawerMenuMobile[4].themeButtonDark = true
        this.dataDrawerMenuMobile[4].themeButtonLight = false
        this.dataDrawerMenuMobile[4].name = 'NIGHT MODE'
      }
      if (theme == 'dark') {
        this.dataDrawerMenuMobile[4].themeButtonLight = true
        this.dataDrawerMenuMobile[4].themeButtonDark = false
        this.dataDrawerMenuMobile[4].name = 'LIGHT MODE'
      }
    },
    Back(item) {
      if (item == "back") {
        this.drawerExplore = false;
        this.drawerStats = false;
      }
    },
    ToNavigation() {
      this.drawerMenuMobile = false;
      this.drawerStats = false;
      this.drawerExplore = false;
      this.drawerUserOut = false;
      this.$parent.NavigationMobile('active');
    },
    ItemDrawerMobile(item) {
      if (item.key == "featured") {
        this.$router.push('/');
        this.ToNavigation();
      }
      if (item.key == "explore") {
        this.$router.push('/explore/market');
        this.ToNavigation();}
      /* drawer explore (quitado temporal) */
      // if (item.key == "explore") {this.drawerExplore = true}
      if (item.key == "explore") {this.drawerExplore = true}
      if (item.key == "stats") {this.drawerStats = true}
      if (item.key == "theme") {
        if (item.themeButtonDark == true) {
          item.name = 'LIGHT MODE';
          item.themeButtonDark = false;
          item.themeButtonLight = true;
          this.$parent.CambiarTheme('dark');
          this.$parent.CambiarTheme2('dark');
        } else {
          item.name = 'NIGHT MODE';
          item.themeButtonDark = true;
          item.themeButtonLight = false;
          this.$parent.CambiarTheme('light');
          this.$parent.CambiarTheme2('light');
        }
      }
    },
  },
};
</script>

<style src="./Header.scss" lang="scss"></style>
