<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3 my-auto">
      <v-app-bar elevation="0" color="#eeeeee">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left-thin</v-icon>
        </v-btn>
      </v-app-bar>
      <v-container fill-height fluid>
        <v-row align="center" justify="center" class="">
          <v-col cols="12">
            <h3>Welcome</h3>
            <p>You have registered successfully</p>
            <router-link to="/tournament">Predict Now</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  components: {},
  data: () => ({}),
  computed: {},
  methods: {},
  mounted() {
    this.$ga.page("/welcome");
  },
  watch: {},
};
</script>
