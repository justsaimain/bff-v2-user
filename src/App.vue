<template>
  <v-app id="inspire">
    <v-dialog v-model="isOffline" persistent max-width="290">
      <v-card>
        <v-card-title class=""> You are currently Offline. </v-card-title>
        <v-card-text
          >Please, check you internet connection and try again.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="reloadPage"> Reload </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="alert.show" persistent max-width="290">
      <v-card>
        <v-card-title class="">
          {{ alert.title }}
        </v-card-title>
        <v-card-text>{{ alert.body }}</v-card-text>
        <v-card-actions>
          <v-spacer v-if="!alert.close"></v-spacer>
          <v-btn
            v-if="alert.action == 'reload'"
            color="primary"
            text
            @click="reloadPage"
          >
            Reload
          </v-btn>
          <v-btn
            v-else-if="alert.action == 'go_back'"
            color="primary"
            text
            @click="goBack"
          >
            Go Back
          </v-btn>
          <v-btn
            v-else-if="alert.action == 'go_home'"
            color="primary"
            text
            @click="goHome"
          >
            Go Home
          </v-btn>
          <v-btn
            v-else-if="alert.action == 'url'"
            color="primary"
            text
            @click="goToRoute(alert.url_path)"
          >
            {{ alert.url_title }}
          </v-btn>
          <v-spacer v-if="alert.close"></v-spacer>
          <v-btn v-if="alert.close" color="" text @click="this.hideAlert">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <router-view />
    <!-- <vue-progress-bar></vue-progress-bar> -->
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters({
      alert: "general/getAlert",
      teams: "teams/teams",
      options: "options/getOptions",
    }),
  },
  component: {},
  data: () => ({
    isOffline: false,
  }),
  mounted() {
    this.getTeams();
    this.storeOption();
    this.$Progress.finish();
    console.log(this.alert);
  },
  methods: {
    ...mapActions({
      storeOption: "options/storeOption",
      getTeams: "teams/getTeams",
      hideAlert: "general/hideAlert",
    }),
    reloadPage() {
      window.location.reload();
    },
    goBack() {
      history.go(-1);
    },
    goHome() {
      window.location.href = "/";
    },
    goToRoute(path) {
      this.hideAlert();
      this.$router.push({
        path: path,
      });
    },
  },
  created() {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
  },
};
</script>

<style>
.small-page-title {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.2px;
}
</style>
