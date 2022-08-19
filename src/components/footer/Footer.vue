<template>
  <v-footer id="footer" :color="colorFooter" :absolute="footerProperty"
    :fixed="!footerProperty" :padless="!footerProperty">
    <Alerts ref="alerts"></Alerts>
    <v-row v-if="navigationMobile" no-gutters class="align">
      <!-- content -->
      <section class="fill_w space gap2 divcolmobile">
        <aside class="divcol eliminarmobile">
          <a href="#" @click="$router.push('/')" class="centermobile">
            <img class="logo" src="@/assets/logos/logo-near.png" alt="Logo">
          </a>

          <p class="h11_em">
            The world’s first marketplace for wallet’s collectibles. Buy, sell, 
            and discover exclusive digital i tems.
          </p>

          <div class="contIcons space">
            <v-btn v-for="(item, index) in dataRedes" :key="index"
              icon :href="item.to">
              <img :src="item.icon" alt="social icons">
            </v-btn>
          </div>
        </aside>

        <aside>
          <v-card v-for="(item, index) in dataFooter" :key="index"
            color="transparent" :class="{eliminarmobile: item.deletemobile}">
            <img class="logo vermobile align" src="@/assets/logos/logo-near.png" alt="logo near">
            <label class="h11_em">{{ item.title }}</label>

            <template v-if="item.links">
              <a v-for="(item2, index) in item.links" :key="index"
                :href="item2.to" class="h11_em hover_line"
              >
                {{ item2.link }}
              </a>
            </template>

            <template v-if="item.input">
              <v-text-field
                v-model="input"
                solo
                :rules="[rules.email]"
              >
                <template v-slot:label>
                  <span class=" h12_em normal">
                    Your email address
                  </span>
                </template>

                <template v-slot:append>
                  <v-btn color="var(--clr-text-btn)" rounded class="h12_em"
                    @click="SendEmail()">SUBSCRIBE</v-btn>
                </template>
              </v-text-field>
            </template>
          </v-card>
        </aside>
      </section>

      <section class="fill_w space tcenter divcolmobile">
        <span class="h11_em normal">&copy; 2022 DV CONSULTORES, C.A.</span>
        <span class="h11_em">
          Privacy Policy 
          <span style="margin-inline: 0.3em">&bullet;</span> 
          Terms of Service
        </span>
      </section>
    </v-row>

    <section v-if="!navigationMobile" class="navigationMobile">
      <v-btn v-if="userBtn" :key="index" icon class="align"
        @click="$parent.$parent.$refs.header.ShowDrawer('user')">
        <img class="icons" src="@/assets/user/avatar.png" alt="profile button">
      </v-btn>

      <v-btn v-else @click="$parent.$parent.$refs.header.signIn();
        $parent.$parent.$refs.header.NavigationMobile('active')"
        class="loginbtn buttons h11_em">
        LOG IN
        <v-icon small>mdi-arrow-right</v-icon>
      </v-btn>

      <template v-for="(item, index) in dataNavigation">
        <v-btn :key="index"
          icon class="align" :href="item.href" @click="SelectItemNavigation(item)">
          <img class="icons" :src="item.icon" :alt="item.alt">
        </v-btn>
      </template>
    </section>
  </v-footer>
</template>

<script>
import Alerts from '@/components/alerts/Alerts'
let ubicacionPrincipal = window.pageYOffset;
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 200);
  }
}
export default {
  components: { Alerts },
  data() {
    return {
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
      dataFooter: [
        {
          deletemobile: true,
          title: "featured",
          links: [
            {
              link: "Featured",
              to: "#/"
            },
            // {
            //   link: "Top",
            //   to: "#"
            // },
            // {
            //   link: "Collectibles",
            //   to: "#"
            // },
          ]
        },
        {
          deletemobile: true,
          title: "market",
          links: [
            {
              link: "Market",
              to: "#/explore/market"
            },
            // {
            //   link: "Top",
            //   to: "#"
            // },
            // {
            //   link: "Collectibles",
            //   to: "#"
            // },
          ]
        },
        // {
        //   deletemobile: true,
        //   title: "stats",
        //   links: [
        //     {
        //       link: "Ranking",
        //       to: "#"
        //     },
        //     {
        //       link: "Activity",
        //       to: "#"
        //     },
        //   ]
        // },
        {
          deletemobile: true,
          title: "resources",
          links: [
            {
              link: "GitBook",
              to: "#"
            },
            // {
            //   link: "Partners",
            //   to: "#"
            // },
            // {
            //   link: "Newsletter",
            //   to: "#"
            // },
          ]
        },
        {
          title: "keep in contact",
          input: true
        },
      ],
      input: "",
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
      footerProperty: true,
      navigationMobile: true,
      colorFooter: "var(--clr-btn)",
      userBtn: true,
      dataNavigation: [
        {
          key: "home",
          icon: require("@/assets/icons/home.png"),
          alt: "home button",
          href: "#",
        },
        {
          key: "search",
          icon: require("@/assets/icons/search.png"),
          alt: "search button",
        }
      ]
    }
  },
  mounted() {
    document.addEventListener('scroll', this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollListener);
  },
  methods: {
    SendEmail() {
      const url = "api/v1/set-email-suscribe"
      let item = {
        email: this.input
      }
      this.axios.post(url, item)
        .then((response) => {
          console.log(response)
          if (response.status === 200){
            this.$refs.alerts.Alerts('success', null, 'Email guardado');      
          } else if (response.status === 204){
            this.$refs.alerts.Alerts('cancel', null, 'Email invalido');
          } else {
            this.$refs.alerts.Alerts('cancel', null, 'Algo ocurrio');
          }  
        }).catch((error) => {
          console.log(error)
          this.$refs.alerts.Alerts('cancel', null, error)
        })
    },
    scrollListener() {
      resizeThrottler(this.OcultarNavigation);
    },
    OcultarNavigation() {
      if (this.navigationMobile == false) {
        let Desplazamiento_Actual = window.pageYOffset;
        if (ubicacionPrincipal >= Desplazamiento_Actual) {
          document.getElementById("footer").style.bottom = "0";
        } else {
          document.getElementById("footer").style.bottom = "-80px";
        }
        ubicacionPrincipal = Desplazamiento_Actual;
      }
    },
    NavigationMobile(key) {
      if (key == 'inactive') {
        this.footerProperty = true;
        this.navigationMobile = true;
        this.colorFooter = "var(--clr-btn)";
        this.$parent.$parent.AdjustWrapperSpace(key);
      }
      if (key == 'active') {
        this.footerProperty = false;
        this.navigationMobile = false;
        this.colorFooter = "transparent";
        this.$parent.$parent.AdjustWrapperSpace(key);
      }
    },
    SelectItemNavigation(item) {
      if (item.key == "home") {this.$router.push('/')}
      if (item.key == "search") {
        console.log(item)
      }
    }
  }
}
</script>

<style src="./Footer.scss" lang="scss" />
