<template>
  <section id="mainMobile">
    <!-- main -->
    <v-expansion-panels v-if="profile.main"
      focusable accordion class="relative">
      <v-expansion-panel v-for="(item, index) in dataDrawerUserOut" :key="index">
        <v-list v-if="item.name">
          <v-list-item :href="item.to" link :ripple="false" @click="SelectItemdrawerUserOut(item)"
            class="hover_line">
            <v-list-item-content class="space">
              <aside class="contitems divrow" style="max-width: max-content">
                <v-badge
                  inline
                  :value="messages"
                  color="#C4C4C4"
                  :class="{hide:item.badge}"
                >
                  <template v-slot:badge>
                    <span style="color: #AD0FD5 !important">{{ messages }}</span>
                  </template>
                  <span class="h8_em clr" style="max-width: max-content">{{ item.name }}</span>
                </v-badge>
              </aside>

              <img v-if="item.arrow"
                class="arrowRight" src="@/assets/icons/arrow-right.png" alt="arrow to right">

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
    </v-expansion-panels>


    <!-- notifications -->
    <section v-if="profile.notifications">
      <aside class="contTop">
        <h4 class="h10_em">NOTIFICATIONS</h4>
      </aside>

      <aside class="contNotifications divcol gap2">
        <v-card v-for="(item, i) in dataNotifications" :key="i" :ripple="true"
          style="display:flex" class="relative" color="rgba(236, 235, 255, 0.3)">
          <v-chip v-if="item.new" class="h10_em font2">NEW</v-chip>
          <div class="divcol">
            <span class="titulo h8_em">{{item.title}}</span>
            <p class="h11_em p font2">
              {{item.textTitle}}<br v-if="item.textTitle">
              <span v-if="!item.link">{{item.text}}</span>
              <a v-if="item.link" :href="item.link" target="_blank">{{item.text}}</a>
            </p>
          </div>
          <span class="date h11_em font2">{{item.date}}</span>
        </v-card>
      </aside>
    </section>


    <!-- wallets -->
    <section v-if="profile.wallets">
      <aside class="contTop" style="margin-bottom: 2em">
        <h4 class="h10_em">WALLETS</h4>

        <v-card color="var(--clr-card-4)" class="controls h9_em align fill_w">
          <v-btn v-for="(item, index) in dataControlWallets" :key="index"
            class="h12_em font2 bold" :class="{buttonsMobile:item.active}"
            @click="ControlItem(item)">
            {{ item.name }}
          </v-btn>
        </v-card>

        <div class="contFilter">
          <v-btn v-if="publishBtn" class="publish h11_em font2" @click="PublishNew()">PUBLISH NEW WALLET FOR SALE</v-btn>

          <v-select
            v-if="publishBtn"
            v-model="filterWallets.title"
            :items="filterWallets.by"
            background-color="transparent"
            hide-details
            :menu-props="{ bottom: true, offsetY: true }"
            class="filtro h11_em"
          >
            <template v-slot:prepend-inner>
              <img src="@/assets/icons/filtrar.svg" alt="filter">
            </template>
            <template v-slot:append>
              <v-btn icon class="buttons-icon">
                <v-icon x-small>mdi-arrow-down</v-icon>
              </v-btn>
            </template>
            <template v-slot:item="slotProps">
              <span style="letter-spacing: 0.07em !important"
                class="h12_em font2 semibold">
                {{ slotProps.item }}
              </span>
            </template>
          </v-select>
        </div>
      </aside>

      <aside class="contWallets divcol gap2">
        <!-- purchased -->
        <section v-if="controlNav.purchased" id="purchased">
          <v-card v-for="(item,i) in dataPurchased" :key="i" class="cartaDown divcol" style="display:flex"
            color="var(--clr-card-3)">
            <img class="imgTop" :src="item.img" alt="reference img">
            <v-btn class="h11_em btnOutline">
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

            <v-btn class="h11_em btn align">
              WITHDRAW WALLET
            </v-btn>
          </v-card>
        </section>

        <!-- sold -->
        <section v-if="controlNav.sold" id="sold">
          <aside v-for="(item, i) in dataSold" :key="i" class="card-wrapper font2 relative">
            <v-card class="cartaTop" style="display:flex">
              <img :src="item.img" alt="Referencial Image">
              <div class="contText divcol jcenter">
                <h3 class="font1 h6_em not_typography">{{ item.title }}</h3>
                <span class="h11_em">
                  by <a href="#" class="bold">{{ item.deployer }}</a><br>
                  Sale ends <strong>{{ item.date }}</strong> at <strong>{{ item.hour }}pm</strong> CET
                </span>
              </div>
            </v-card>

            <v-card class="cartaDown divcol" color="var(--clr-card-3)" style="display:flex">
              <div class="jspace">
                <aside class="divcol">
                  <span class="h11_em">Current price <br>NEAR</span>
                  <div class="contPrice">
                    <span class="h7_em bold" style="margin-right: clamp(.2em, 1vw, 1em);">{{ item.near }}</span>
                    <span class="h11_em">(${{ item.dollar }})</span>
                  </div>
                </aside>

                <aside class="contButtons divrow aend">
                  <v-btn class="btn h11_em">
                    WITHDRAW
                  </v-btn>
                </aside>
              </div>
            </v-card>
          </aside>
        </section>

        <!-- for sale -->
        <section v-if="controlNav.sale" id="sale">
          <aside v-for="(item, index) in dataSale" :key="index" class="card-wrapper font2 relative">
            <v-card class="cartaTop" style="display:flex">
              <img :src="item.img" alt="Referencial Image">
              <div class="contText divcol jcenter">
                <h3 class="font1 h6_em not_typography">{{ item.title }}</h3>
                <span class="h11_em normal">
                  Current price {{item.near}} NEAR<br>
                  (${{item.dollar}})
                </span>
              </div>
            </v-card>

            <v-card class="cartaDown divcol" color="var(--clr-card-3)" style="display:flex">
              <aside class="contButtons spacee aend">
                <v-btn class="h11_em btnOutline">
                  CHANGE PRICE
                </v-btn>
                <v-btn class="h11_em btnOutline">
                  PAUSE SALE
                </v-btn>
                <v-btn class="h11_em btn">
                  CANCEL SALE
                </v-btn>
              </aside>
            </v-card>
          </aside>
        </section>

        <!-- publish new -->
        <section v-if="controlNav.publishNew" id="publishNew">
          <h3 class="font1 normal">NEW WALLET FOR SALE</h3>
          <v-card class="cartaPublish divcol gap2" color="var(--clr-card-3)" style="display:flex">
            <aside class="divcol">
              <label for="link">WALLET LINK</label>
              <v-text-field
                id="link"
                solo
                hide-details
              ></v-text-field>
            </aside>

            <aside class="divcol">
              <label>SECRET PHRASE</label>
              <section class="contPhrase">
                <v-text-field
                  v-for="(item,i) in dataPhrase" :key="i"
                  v-model="item.model"
                  solo
                  hide-details
                  :type="showPhrase ? 'text' : 'password'"
                  :append-icon="showPhrase ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPhrase = !showPhrase"
                >
                  <template v-slot:prepend>
                    <span class="h11_em">{{i+1}}.</span>
                  </template>
                </v-text-field>
              </section>
            </aside>

            <aside class="space gap2">
              <div class="divcol">
                <label for="price">SALE PRICE</label>
                <v-text-field
                  id="price"
                  solo
                  hide-details
                  hide-spin-buttons
                  type="number"
                ></v-text-field>
              </div>
              <div class="divcol">
                <label for="crypto">SELECT CRYPTO</label>
                <v-select
                  v-model="filterCrypto.title"
                  :items="filterCrypto.by"
                  id="crypto"
                  solo
                  hide-details
                  :menu-props="{ bottom: true, offsetY: true }"
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

            <a href="#" class="tcenter h10_em">TERMS &amp; CONDITIONS</a>
          </v-card>
          <aside class="space gap2">
            <v-btn class="h10_em buttons">SEND</v-btn>
            <v-btn class="h10_em buttons">PUBLISH WALLET</v-btn>
          </aside>
        </section>
      </aside>
    </section>
  </section>
</template>

<script>
export default {
  name: "mainMobile",
  i18n: require("./i18n"),
  data() {
    return {
      profile: {
        main: true,
        notifications: false,
        wallets: false,
        privacy: false,
        terms: false,
      },
      messages: 1,

      // main
      dataDrawerUserOut: [
        {
          key: "notifications",
          name: "NOTIFICATIONS",
          to: "#",
          arrow: true,
          badge: false
        },
        {
          key: "wallets",
          name: "WALLETS",
          to: "#",
          arrow: true,
          badge: true
        },
        {
          key: "privacy",
          name: "PRIVACY POLICY",
          to: "#",
          arrow: true,
          badge: true
        },
        {
          key: "terms",
          name: "TERMS & SERVICE",
          to: "#",
          arrow: true,
          badge: true
        },
      ],

      // notifications
      dataNotifications: [
        {
          new: true,
          title: "new sale",
          text: "your wallet miura.near has been sold yesterday at 23:45 by 0,008 ETH",
          date: "12 MAY",
        },
        {
          new: false,
          title: "successfull purchase",
          textTitle: "You have successfull purchased the wallet",
          text: "http://jnahhdfbeb.qbfhwbuybwbfwoj.nauibd",
          link: "http://jnahhdfbeb.qbfhwbuybwbfwoj.nauibd",
          date: "13 MAY",
        },
        {
          new: false,
          title: "new offer",
          textTitle: "for you wallet:",
          text: "http:mwunnuvnme.5252d952wmjhijj//Own",
          link: "http:mwunnuvnme.5252d952wmjhijj//Own",
          date: "13 MAY",
        },
        {
          new: false,
          title: "successfull purchase",
          textTitle: "You have successfull purchased the wallet",
          text: "http://jnahhdfbeb.qbfhwbuybwbfwoj.nauibd",
          link: "http://jnahhdfbeb.qbfhwbuybwbfwoj.nauibd",
          date: "13 MAY",
        },
      ],

      // wallets
      dataControlWallets: [
        {
          key: "purchased",
          name: "PURCHASED",
          active: true,
        },
        {
          key: "sold",
          name: "SOLD",
          active: false,
        },
        {
          key: "sale",
          name: "FOR SALE",
          active: false,
        },
      ],
      filterWallets: {
        title: "filter by recent",
        by: ['filter by recent', 'filter by last'],
      },
      publishBtn: true,
      controlNav: {
        purchased: true,
        sold: false,
        sale: false,
        publishNew: false,
      },
      dataPurchased: [
        {
          img: require("@/assets/images/cat.png"),
          title: "MURI.NEAR",
          near: "0,08",
          dollar: "249,37",
        },
      ],
      dataSold: [
        {
          img: require("@/assets/images/bear.png"),
          title: "MURI.NEAR",
          deployer: "Muri.Deployer",
          date: "April 2, 2022",
          hour: "1:41",
          near: "0,08",
          dollar: "249,37",
        },
      ],
      dataSale: [
        {
          img: require("@/assets/images/cat.png"),
          title: "MURI.NEAR",
          near: "0,08",
          dollar: "249,37",
        },
      ],
      showPhrase: true,
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
      filterCrypto: {
        title: null,
        by: [
          {
            img: require("@/assets/crypto/eth.svg"),
            crypto: "ETH",
          },
        ],
      },
    };
  },
  methods: {
    clearProfile() {
      this.profile.main = false
      this.profile.notifications = false
      this.profile.wallets = false
      this.profile.privacy = false
      this.profile.terms = false
    },
    SelectItemdrawerUserOut(item) {
      this.$parent.$parent.footerMobile = false;
      this.clearProfile();
      if (item.key == "notifications") {
        this.profile.notifications = true
      }
      if (item.key == "wallets") {
        this.profile.wallets = true
      }
      if (item.key == "privacy") {
        this.profile.privacy = true
      }
      if (item.key == "terms") {
        this.profile.terms = true
      }
    },
    ControlItem(item) {
      this.dataControlWallets.forEach(element => {element.active = false});
      const clear = {purchased: false, sold: false, sale: false, publishNew: false}
      this.controlNav = clear
      //
      this.publishBtn = true
      if (item.key == 'purchased') {
        this.controlNav.purchased = true
        this.dataControlWallets[0].active = true
      }
      if (item.key == 'sold') {
        this.controlNav.sold = true
        this.dataControlWallets[1].active = true
      }
      if (item.key == 'sale') {
        this.controlNav.sale = true
        this.dataControlWallets[2].active = true
      }
    },
    PublishNew() {
      const item = {key: 'sale'}
      this.ControlItem(item);
      this.controlNav.sale = false
      this.controlNav.publishNew = true
      //
      this.publishBtn = false
    },
  },
};
</script>

<style src="./SettingsMobile.scss" lang="scss"></style>
