<template>
  <v-app id="inspire">
    <top-nav></top-nav>
    <v-main class="grey lighten-3 my-auto pt-16">
      <v-container>
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
        <v-dialog v-model="showBreakdownDialog">
          <v-card>
            <v-list two-line subheader>
              <v-subheader class="primary--text">Points breakdown</v-subheader>

              <template v-if="breakdownDialog.length > 0">
                <v-list-item v-for="(d, index) in breakdownDialog" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{
                      Object.keys(d)[0]
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      class="font-weight-bold"
                      color="primary--text"
                      >+ {{ Object.values(d)[0] }} Pts</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Not getting any pts</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-dialog>
        <v-row class="" v-if="!loading">
          <v-col cols="12">
            <div class="mb-5">
              <v-card class="pa-3 top-predictor-card" elevation="0">
                <div
                  class="mt-5 d-flex align-center justify-space-between mx-10"
                >
                  <div class="d-flex flex-column align-center justify-center">
                    <v-avatar size="50" class="predictor-avatar" color="white">
                      <img
                        :style="{
                          'background-size': 'cover',
                          'background-image': `url(${
                            data.user.profile
                              ? env.mediaUrl + '/profiles/' + data.user.profile
                              : 'https://resources.premierleague.com/premierleague/badges/70/t' +
                                data.user.fav_team +
                                '.png'
                          })`,
                        }"
                      />
                    </v-avatar>
                    <p class="predictor-detail">{{ data.user.region }}</p>
                  </div>
                  <div class="text-right">
                    <p class="predictor-name mb-2">
                      {{ data.user.name }}
                    </p>
                    <h3 class="top-predictor-points">
                      {{ data.total_pts }} Points
                    </h3>
                  </div>
                </div>
              </v-card>
            </div>
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
                @click="reloadGameWeek(gameWeekTab, true)"
              >
                Game Week {{ gameWeekTab }}
              </v-btn>
            </div>
            <div class="mb-16">
              <div
                v-for="(d, index) in data.point_logs"
                :key="d.id"
                class="mt-5"
                @click="showBreakdown(d)"
              >
                <v-card elevation="0" class="pa-5 text-center">
                  <div class="mt-5 d-flex justify-space-around align-center">
                    <div
                      class="d-flex flex-column justify-center recent-match-team align-center"
                    >
                      <v-avatar size="38" tile>
                        <img
                          :src="
                            'https://resources.premierleague.com/premierleague/badges/70/t' +
                            getTeamVS(index).team_h +
                            '.png'
                          "
                        />
                      </v-avatar>
                      <span style="font-size: 13px; letter-spacing: 0.5px">
                        {{ getTeamVS(index).team_h_name }}
                      </span>
                    </div>
                    <div
                      class="d-flex flex-column align-center recent-match-score"
                    >
                      <div class="d-flex align-center">
                        <div class="goal-div">
                          {{ data.fixture_logs[index].team_h_predict }}
                        </div>
                        <h5 class="primary--text mx-3">:</h5>
                        <div class="goal-div">
                          {{ data.fixture_logs[index].team_a_predict }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="d-flex flex-column justify-center recent-match-team align-center"
                    >
                      <v-avatar size="38" tile>
                        <img
                          :src="
                            'https://resources.premierleague.com/premierleague/badges/70/t' +
                            getTeamVS(index).team_a +
                            '.png'
                          "
                        />
                      </v-avatar>
                      <span style="font-size: 13px; letter-spacing: 0.5px">
                        {{ getTeamVS(index).team_a_name }}
                      </span>
                    </div>
                  </div>
                  <div class="d-flex justify-center mt-3 align-center">
                    <template>
                      <div class="primary-badge mr-3">
                        Result
                        {{ data.fixture_logs[index].team_h_score }} :
                        {{ data.fixture_logs[index].team_a_score }}
                      </div>
                      <div
                        v-if="data.fixture_logs[index].result_pts"
                        class="primary-badge mr-3"
                      >
                        Got + {{ data.fixture_logs[index].result_pts }} pts
                      </div>
                    </template>
                    <div
                      v-if="data.fixture_logs[index].twox_booster === 1"
                      class="primary-badge"
                    >
                      2x Boosted
                    </div>
                  </div>
                </v-card>
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
import env from "../env";

export default {
  components: { TopNav, BottomNavigation },
  props: ["id"],
  data: () => ({
    env,
    totalGameWeek: 0,
    loading: true,
    gameWeek: 0,
    data: null,
    teamData: [],
    showBreakdownDialog: false,
    breakdownDialog: {},
  }),
  methods: {
    async fetchData() {
      this.loading = true;
      const response = await axios.get("/leaderboard", {
        params: { gw: this.gameWeek, user: this.id },
      });

      if (!response.data.success) {
        this.$router.push("/leaderboard");
      }

      const data = response.data.data[0];
      this.data = data;

      setTimeout(() => {
        var options = {
          container: ".gameweek-tabs",
          easing: "ease",
          force: true,
          offset: 0,
          x: true,
          y: false,
        };
        GameWeekTabScrollTo.scrollTo(`.gw-tab-${this.gameWeek}`, 5000, options);
      });
      this.loading = false;

      console.log(data);
    },
    getTeamVS(data) {
      const dArr = data.split(" ");
      const team_h = this.teamData.find((x) => x.id == dArr[0]);
      const team_a = this.teamData.find((x) => x.id == dArr[2]);

      const returnData = {
        team_h: team_h.code,
        team_h_name: team_h.name,
        team_a: team_a.code,
        team_a_name: team_a.name,
      };
      return returnData;
    },
    showBreakdown(data) {
      console.log(data);
      this.showBreakdownDialog = true;
      this.breakdownDialog = data;
    },
  },
  mounted() {
    this.teamData = JSON.parse(localStorage.getItem("teams"));
    this.totalGameWeek = JSON.parse(
      localStorage.getItem("options")
    ).total_gameweek;
    this.gameWeek = JSON.parse(
      localStorage.getItem("options")
    ).current_gameweek;

    console.log("gw", this.gameWeek);

    this.fetchData();

    this.$ga.page("/leaderboard/" + this.id);
  },
};
</script>

<style scoped>
.recent-match-team {
  flex: 1;
}

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
  /* outline: 2px solid #fff; */
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
