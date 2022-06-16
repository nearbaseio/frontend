<template>
  <section id="top" class="divcol section gap2">
    <aside class="contup jspace divwrap relative parent">
      <div class="sectup divrow">
        <h2>TOP</h2>
        <span class="number">5</span>
        <v-btn class="buttons botonUp h11_em" href="#" @click="$router.push('/')">explore
          <v-icon medium>mdi-arrow-right</v-icon>
        </v-btn>
      </div>

      <v-col class="sectdown space" style="gap: 1em">
        <v-slide-group
          v-model="slider"
          center-active
          show-arrows
          class="fill_w"
          active-class="active"
        >
          <v-slide-item
            v-for="(item, index) in dataTop" :key="index"
            v-slot="{ active, toggle }"
          >
            <v-card
              :color="active ? '#AD0FD5' : '#ECEBFF'"
              style="display: flex; cursor: pointer"
              class="divcol acenter"
              :ripple="true"
              @click="toggle"
            >
            <img :src="item.img" alt="Top images">
            <h4 class="h8_em">{{ item.initials }}</h4>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </aside>

    <aside class="botonDown end parent">
      <v-btn class="buttons h11_em" href="#" @click="$router.push('/')">explore
        <v-icon medium>mdi-arrow-right</v-icon>
      </v-btn>
    </aside>
  </section>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      slider: "",
      dataTop: [
        {
          img: require("@/assets/images/cat.png"),
          initials: "J.D"
        },
        {
          img: require("@/assets/images/bear.png"),
          initials: "D.M"
        },
        {
          img: require("@/assets/images/polar-bear.png"),
          initials: "P.B"
        },
        {
          img: require("@/assets/images/gorilla.png"),
          initials: "W.V"
        },
        {
          img: require("@/assets/images/weasel.png"),
          initials: "A.L"
        },
      ],
    }
  },
  methods: {
  }
};
</script>

<style src="./Top.scss" lang="scss" />
