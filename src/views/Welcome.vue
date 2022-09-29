<template>
  <v-app id="inspire">
    <v-main class="primary my-auto">
      <v-container fill-height fluid>
        <v-row align="center" justify="center" class="">
          <v-col cols="12">
            <h1 class="white--text">Congratulations!</h1>
            <h3 class="font-weight-medium white--text">
              You've successfully signed up.
            </h3>
            <v-btn
              block
              class="mt-5 py-6 primary--text font-weight-medium"
              to="/tournament"
              >Predict Now</v-btn
            >
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
