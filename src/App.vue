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
    <v-dialog v-model="noAuthAlert" persistent max-width="290">
      <v-card>
        <v-card-title class=""> Unauthenticated </v-card-title>
        <v-card-text>You need to Login first to use this feature.</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="goToRoute('/login')">
            Login
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="" text @click="hideNoAuthAlert"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar bottom timeout="-1" :value="updateExists" color="primary">
      An update is available
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="refreshApp">Update</v-btn>
      </template>
    </v-snackbar>
    <sneck-bar></sneck-bar>
    <m-dialog></m-dialog>
    <router-view />
    <div class="update-dialog" v-if="prompt">
      <div class="update-dialog__content">
        A new version is found. Refresh to load it?
      </div>
      <div class="update-dialog__actions">
        <button
          class="update-dialog__button update-dialog__button--confirm"
          @click="update"
        >
          Update
        </button>
        <button
          class="update-dialog__button update-dialog__button--cancel"
          @click="prompt = false"
        >
          Cancel
        </button>
      </div>
    </div>
    <!-- <vue-progress-bar></vue-progress-bar> -->
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MDialog from "./components/MDialog.vue";
import SneckBar from "./components/SneckBar.vue";
import update from "./mixins/update";

export default {
  components: { SneckBar, MDialog },
  name: "App",
  computed: {
    ...mapGetters({
      alert: "general/getAlert",
      noAuthAlert: "general/noAuthAlert",
      teams: "teams/teams",
    }),
  },
  data: () => ({
    isOffline: false,
    prompt: false,
  }),
  async mounted() {
    this.$Progress.finish();
    console.log("Related App...");
    const relatedApps = await navigator.getInstalledRelatedApps();
    relatedApps.forEach((app) => {
      console.log(app.id, app.platform, app.url);
    });
    console.log("Related App Finished...");
  },
  methods: {
    ...mapActions({
      hideAlert: "general/hideAlert",
      showNoAuthAlert: "general/showNoAuthAlert",
      hideNoAuthAlert: "general/hideNoAuthAlert",
    }),
    refreshApp() {
      this.updateExists = false;
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return;
      // Send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
    },
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
      this.hideNoAuthAlert();
      this.$router.push({
        path: path,
      });
    },
    async update() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
  },
  created() {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }
  },
  mixins: [update],
};
</script>

<style>
.small-page-title {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.2px;
}
</style>
