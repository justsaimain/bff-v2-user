<template>
  <v-app id="inspire">
    <top-nav></top-nav>
    <v-main class="grey lighten-3 my-auto pt-16">
      <v-dialog v-model="loading" persistent width="100">
        <v-card
          class="d-flex justify-center align-center"
          width="100"
          height="100"
        >
          <v-progress-circular
            :size="30"
            color="primary"
            indeterminate
          ></v-progress-circular
        ></v-card>
      </v-dialog>
      <v-container>
        <v-row class="">
          <v-col cols="12">
            <div class="gameweek-tabs">
              <v-btn
                v-for="gameWeekTab in this.totalGameWeek"
                :key="gameWeekTab"
                class="gameweek-tabs-btn"
                elevation="0"
                :class="[
                  {
                    'primary white--text disable-event':
                      gameWeekTab == gameWeek,
                  },
                  `gw-tab-${gameWeekTab}`,
                ]"
                @click="reloadGameWeek(gameWeekTab, false)"
              >
                Game Week {{ gameWeekTab }}
              </v-btn>
            </div>
            <div class="mb-16">
              <div class="mt-5" v-if="top_one">
                <v-card class="pa-3 top-predictor-card" elevation="0">
                  <div
                    class="mt-5 d-flex align-center justify-space-between mx-10"
                  >
                    <div class="d-flex flex-column align-center justify-center">
                      <v-avatar
                        size="50"
                        class="predictor-avatar"
                        color="white"
                      >
                        <img
                          :style="{
                            'background-size': 'cover',
                            'background-image': `url(${
                              top_one.user.profile
                                ? env.mediaUrl +
                                  '/profiles/' +
                                  top_one.user.profile
                                : 'https://resources.premierleague.com/premierleague/badges/70/t' +
                                  top_one.user.fav_team +
                                  '.png'
                            })`,
                          }"
                        />
                      </v-avatar>
                      <p class="predictor-detail">{{ top_one.user.region }}</p>
                    </div>
                    <div class="text-right">
                      <p class="predictor-name mb-2">
                        {{ top_one.user.name }}
                      </p>
                      <h3 class="top-predictor-points">
                        {{ top_one.total_pts }} Points
                      </h3>
                    </div>
                  </div>
                </v-card>
              </div>
              <div v-for="p in leaderboard" :key="p.id" class="mt-5">
                <v-card class="pa-3 predictor-card" elevation="0">
                  <!-- <div class="predictor-badge">{{ index + 1 }}</div> -->
                  <div
                    class="
                      mt-5
                      d-flex
                      align-center
                      justify-space-between
                      flex-1
                      mx-10
                    "
                  >
                    <div class="d-flex flex-column align-center justify-start">
                      <v-avatar size="50" class="predictor-avatar">
                        <img
                          :style="{
                            'background-size': 'cover',
                            'background-image': `url(${
                              p.user.profile
                                ? env.mediaUrl + '/profiles/' + p.user.profile
                                : 'https://resources.premierleague.com/premierleague/badges/70/t' +
                                  p.user.fav_team +
                                  '.png'
                            })`,
                          }"
                        />
                      </v-avatar>
                      <p class="predictor-detail">
                        {{ p.user.region }}
                      </p>
                    </div>
                    <div class="flex-2 text-end">
                      <p class="predictor-name mb-2">
                        {{ p.user.name }}
                      </p>
                      <h3 class="predictor-points">{{ p.total_pts }} Points</h3>
                    </div>
                  </div>
                </v-card>
              </div>

              <div class="mt-5">
                <v-carousel
                  cycle
                  height="150"
                  interval="3000"
                  hide-delimiters
                  hide-delimiter-background
                  show-arrows-on-hover
                >
                  <v-carousel-item>
                    <v-sheet height="100%">
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <v-img
                          src="https://dc6vmiz8c91pk.cloudfront.net/media/142/39541590099449/fpl_banner_v2.png"
                        >
                        </v-img>
                      </v-row>
                    </v-sheet>
                  </v-carousel-item>
                  <v-carousel-item>
                    <v-sheet height="100%">
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <v-img
                          src="https://dc6vmiz8c91pk.cloudfront.net/media/142/39541590099449/fpl_banner_v2.png"
                        >
                        </v-img>
                      </v-row>
                    </v-sheet>
                  </v-carousel-item>
                  <v-carousel-item>
                    <v-sheet height="100%">
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <v-img
                          src="https://dc6vmiz8c91pk.cloudfront.net/media/142/39541590099449/fpl_banner_v2.png"
                        >
                        </v-img>
                      </v-row>
                    </v-sheet>
                  </v-carousel-item>
                </v-carousel>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <bottom-navigation></bottom-navigation>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
import BottomNavigation from "../components/BottomNavigation.vue";
import TopNav from "../components/TopNav.vue";
var GameWeekTabScrollTo = require("vue-scrollto");
import { mapGetters } from "vuex";
import env from "../env";
export default {
  components: { TopNav, BottomNavigation },
  data: () => ({
    env,
    totalGameWeek: 0,
    gameWeek: 0,
    top_one: null,
    leaderboard: null,
    loading: true,
  }),
  ...mapGetters({
    teams: "teams/teams",
  }),
  methods: {
    reloadGameWeek(gw, showLoading) {
      this.leaderboard = null;
      this.top_one = null;
      this.loading = showLoading;
      this.gameWeek = gw;
      axios
        .get("/leaderboard", { params: { gw: this.gameWeek } })
        .then((res) => {
          this.leaderboard = res.data.data;
          this.top_one = this.leaderboard.shift();
          console.log(res);

          setTimeout(() => {
            var options = {
              container: ".gameweek-tabs",
              easing: "ease",
              force: true,
              x: true,
              y: false,
            };
            GameWeekTabScrollTo.scrollTo(
              `.gw-tab-${this.gameWeek}`,
              3000,
              options
            );
          });
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
    fetchData() {
      this.totalGameWeek = JSON.parse(
        localStorage.getItem("options")
      ).total_gameweek;
      this.gameWeek = JSON.parse(
        localStorage.getItem("options")
      ).current_gameweek;

      axios
        .get("/leaderboard", { params: { gw: this.gameWeek } })
        .then((res) => {
          console.log(res);

          this.leaderboard = res.data.data;
          this.top_one = this.leaderboard.shift();

          setTimeout(() => {
            var options = {
              container: ".gameweek-tabs",
              easing: "ease",
              force: true,
              x: true,
              y: false,
            };
            GameWeekTabScrollTo.scrollTo(
              `.gw-tab-${this.gameWeek}`,
              3000,
              options
            );
          });
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    getFavTeamName(id) {
      if (this.teams) {
        return this.teams.find((x) => x.code == id).name;
      }
    },
  },
  mounted() {
    if (this.teams) {
      console.log(this.teams);
    }
    this.fetchData();
  },
};
</script>

<style scoped>
.top-predictor-card {
  background: rgb(76, 47, 227);
  background: linear-gradient(
    90deg,
    rgba(76, 47, 227, 1) 0%,
    rgba(58, 58, 226, 1) 56%,
    rgba(115, 100, 246, 1) 100%
  );

  color: #fff !important;
}

.predictor-badge {
  top: 0;
  left: -5px;
  border-radius: 100%;
  position: absolute;
  background: #efebff;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 800;
  color: #4c2fe3;
}

.predictor-name {
  font-size: 16px !important;
  font-weight: 500;
  letter-spacing: 0.3px;
}
.predictor-avatar {
  outline: 2px solid #fff;
  /* border: 2px solid #4c2fe3; */
}

.predictor-detail {
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 12px;
}

.top-predictor-points {
  font-size: 25px;
}

.predictor-points {
  font-size: 18px;
  color: #4c2fe3;
}
</style>
