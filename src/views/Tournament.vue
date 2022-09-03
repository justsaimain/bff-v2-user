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
      <v-bottom-sheet v-model="predictionFormDialog">
        <v-sheet
          style="border-radius: 30px 30px 0 0"
          class="text-center"
          height="350"
        >
          <div class="py-8">
            <v-row
              v-if="predictionFormDialog"
              class="align-center justify-center px-5"
            >
              <v-col class="text-center">
                <h5 v-if="this.predictionForm.team_h">
                  {{ this.predictionForm.team_h.name }}
                </h5>
              </v-col>
              <v-col>
                <Picker
                  v-model="predictionForm.home_team_goal"
                  sensitivity.number="20"
                  radius.number="130"
                  itemHeight.number="40"
                  visibleOptionsAmount.number="5"
                  :options="goalsNumber"
                >
                </Picker>
              </v-col>
              <v-col>
                <Picker
                  v-model="predictionForm.away_team_goal"
                  sensitivity.number="20"
                  radius.number="130"
                  itemHeight.number="40"
                  visibleOptionsAmount.number="5"
                  :options="goalsNumber"
                >
                </Picker>
              </v-col>
              <v-col class="text-center">
                <h5 v-if="this.predictionForm.team_a">
                  {{ this.predictionForm.team_a.name }}
                </h5>
              </v-col>
            </v-row>

            <v-row class="">
              <v-col class="d-flex flex-column justify-center align-center">
                <v-checkbox
                  v-model="predictionForm.twox_booster"
                  :label="`Use 2x Booster`"
                  color="#4c2fe3"
                ></v-checkbox>
                <div class="d-flex">
                  <v-btn
                    @click="resetGoalPredictionForm()"
                    elevation="0"
                    outlined
                    color="primary"
                    style="width: 150px"
                    >Reset Goals</v-btn
                  >
                  <v-btn
                    elevation="0"
                    class="ml-3"
                    color="primary"
                    @click.prevent="submitPredictionForm"
                    style="width: 150px"
                    >Save</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </div>
        </v-sheet>
      </v-bottom-sheet>
      <v-dialog v-model="showBreakdownDialog">
        <v-card>
          <v-list two-line subheader>
            <v-subheader class="primary--text">Points breakdown</v-subheader>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Outcome (win/draw/lose)</v-list-item-title>
                <v-list-item-subtitle
                  class="font-weight-bold"
                  color="primary--text"
                  >+
                  {{ this.breakdownDialog.outcome }} Pts</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Goal difference</v-list-item-title>
                <v-list-item-subtitle
                  class="font-weight-bold"
                  color="primary--text"
                  >+
                  {{ this.breakdownDialog.goal_diff }} Pts</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Home goals</v-list-item-title>
                <v-list-item-subtitle
                  class="font-weight-bold"
                  color="primary--text"
                  >+
                  {{ this.breakdownDialog.home_goal }} Pts</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Away goals</v-list-item-title>
                <v-list-item-subtitle
                  class="font-weight-bold"
                  color="primary--text"
                  >+
                  {{ this.breakdownDialog.away_goal }} Pts</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
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
                @click="reloadGameWeek(gameWeekTab, true)"
              >
                Game Week {{ gameWeekTab }}
              </v-btn>
            </div>
            <div
              v-if="!loading"
              class="fixtures-container"
              style="margin-bottom: 80px"
            >
              <v-alert
                v-if="!this.check2xBoostedExist"
                dense
                class="mt-3"
                outlined
                text
                type="success"
              >
                Use 2x Booster to double you points.
              </v-alert>

              <div
                v-for="fixture in fixtures"
                :key="fixture.code"
                :class="[`fixture-card-${fixture.id}`]"
                class="mt-5"
              >
                <v-card elevation="0" class="pa-5 text-center">
                  <div v-if="!fixture.finished">
                    <h5>
                      {{
                        moment(
                          new Date(fixture.kickoff_time),
                          moment.ISO_8601
                        ).format("ddd , D MMM YYYY , h:mm A ")
                      }}
                    </h5>
                  </div>
                  <div class="mt-5 d-flex justify-space-around align-center">
                    <div
                      class="d-flex flex-column justify-center recent-match-team align-center"
                    >
                      <v-avatar size="55" tile>
                        <img
                          :src="
                            'https://resources.premierleague.com/premierleague/badges/70/t' +
                            fixture.team_h.code +
                            '.png'
                          "
                          @error="getDefaultTeamImage"
                        />
                      </v-avatar>
                      <span style="font-size: 13px; letter-spacing: 0.5px">
                        {{ fixture.team_h.name }}
                      </span>
                    </div>
                    <div
                      v-if="fixture.finished"
                      class="d-flex flex-column align-center recent-match-score"
                      @click="showBreakdown(fixture)"
                    >
                      <div class="d-flex align-center">
                        <div class="goal-div">
                          {{
                            fixture.prediction
                              ? fixture.prediction.team_h_goal.value
                              : "-"
                          }}
                        </div>
                        <h5 class="primary--text mx-3">:</h5>
                        <div class="goal-div">
                          {{
                            fixture.prediction
                              ? fixture.prediction.team_a_goal.value
                              : "-"
                          }}
                        </div>
                      </div>
                    </div>
                    <div
                      v-else-if="fixture.started"
                      class="d-flex align-center"
                    >
                      <h4 class="primary--text">Started</h4>
                    </div>
                    <div
                      v-else-if="checkPredictionAccept(fixture)"
                      class="d-flex align-center"
                    >
                      <div
                        class="goal-div"
                        @click="showPredictionForm(fixture)"
                      >
                        <span v-if="fixture.prediction">
                          {{ fixture.prediction.team_h_goal.text }}
                        </span>
                        <span v-else> + </span>
                      </div>
                      <h5 class="primary--text mx-3">VS</h5>
                      <div
                        @click="showPredictionForm(fixture)"
                        class="goal-div"
                      >
                        <span v-if="fixture.prediction">
                          {{ fixture.prediction.team_a_goal.text }}
                        </span>
                        <span v-else> + </span>
                      </div>
                    </div>
                    <div v-else class="d-flex align-center">
                      <h4 class="primary--text">Prediction Closed</h4>
                    </div>
                    <div
                      class="d-flex flex-column justify-center recent-match-team align-center"
                    >
                      <v-avatar size="55" tile>
                        <img
                          :src="
                            'https://resources.premierleague.com/premierleague/badges/70/t' +
                            fixture.team_a.code +
                            '.png'
                          "
                          @error="getDefaultTeamImage"
                        />
                      </v-avatar>
                      <span style="font-size: 13px; letter-spacing: 0.5px">
                        {{ fixture.team_a.name }}
                      </span>
                    </div>
                  </div>
                  <div class="d-flex justify-center mt-3 align-center">
                    <template v-if="fixture.finished">
                      <div class="primary-badge mr-3">
                        Result
                        {{ fixture.team_h_score }} :
                        {{ fixture.team_a_score }}
                      </div>
                      <div v-if="fixture.result_pts" class="primary-badge mr-3">
                        You got + {{ fixture.result_pts }} pts
                      </div>
                    </template>
                    <div
                      v-if="fixture.started && !fixture.finished"
                      class="primary-badge mr-3"
                    >
                      Live Score
                      {{ fixture.team_h_score }} :
                      {{ fixture.team_a_score }}
                    </div>
                    <div
                      v-if="fixture.prediction.twox_booster"
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
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import "moment-timezone";
import Picker from "vue-wheel-picker";
export default {
  components: { TopNav, BottomNavigation, Picker },
  data: () => ({
    check2xBoosted: false,
    loading: true,
    totalGameWeek: 0,
    gameWeek: 0,
    fixtures: null,
    goalsNumber: [],
    fixtureScrollTo: null,
    predictionFormDialog: false,
    successPredicted: false,
    predictionForm: {
      event: null,
      id: null,
      team_a: null,
      team_h: null,
      twox_booster: false,
      home_team_goal: {
        text: 0,
        value: 0,
        visibility: true,
      },
      away_team_goal: {
        text: 0,
        value: 0,
        visibility: true,
      },
    },
    showBreakdownDialog: false,
    breakdownDialog: {},
  }),
  computed: {
    ...mapGetters({
      alert: "general/getAlert",
      authenticated: "auth/authenticated",
    }),
    check2xBoostedExist() {
      const boosted = this.fixtures.filter((f) => {
        return f?.prediction?.twox_booster === 1;
      });

      if (boosted.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    moment,
    ...mapActions({
      showAlert: "general/showAlert",
      hideAlert: "general/hideAlert",
      showNoAuthAlert: "general/showNoAuthAlert",
      showSnackbarAction: "alert/showSnackbarAction",
    }),
    getDefaultTeamImage(e) {
      e.target.src = "https://singlecolorimage.com/get/EEEEEE/55x55";
    },
    getFixturesMounted() {
      this.totalGameWeek = JSON.parse(
        localStorage.getItem("options")
      ).total_gameweek;
      this.gameWeek = JSON.parse(
        localStorage.getItem("options")
      ).current_gameweek;

      axios
        .get("/fixtures", { params: { gw: this.gameWeek } })
        .then((res) => {
          console.log(res.data);
          this.fixtures = res.data;
          let filteredPredictionNullFixtures = this.fixtures.filter(
            (x) => x?.prediction != null
          );

          let check2xBoosted = filteredPredictionNullFixtures.find(
            (e) => e?.prediction?.twox_booster == 1
          );

          if (check2xBoosted) {
            this.check2xBoosted = true;
          }
          setTimeout(() => {
            var options = {
              container: ".gameweek-tabs",
              easing: "ease",
              force: true,
              offset: 0,
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
    reloadGameWeek(gw, showLoading) {
      this.loading = showLoading;
      this.gameWeek = gw;
      axios
        .get("/fixtures", { params: { gw: this.gameWeek } })
        .then((res) => {
          this.fixtures = res.data;
          console.log(res.data);

          let filteredPredictionNullFixtures = this.fixtures.filter(
            (x) => x.prediction != null
          );

          let check2xBoosted = filteredPredictionNullFixtures.find(
            (e) => e.prediction.twox_booster == 1
          );

          if (check2xBoosted) {
            this.check2xBoosted = true;
          } else {
            this.check2xBoosted = false;
          }

          setTimeout(() => {
            var options = {
              container: ".gameweek-tabs",
              easing: "ease",
              force: true,
              offset: 0,
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
    checkPredictionAccept(fixture) {
      const checkTime = moment(fixture.kickoff_time, moment.ISO_8601).subtract(
        30,
        "minutes"
      );
      const nowTime = moment().toISOString();
      return moment(nowTime).isBefore(checkTime);
    },
    showPredictionForm(fixture) {
      if (!this.authenticated) {
        this.showNoAuthAlert();
      } else {
        this.predictionFormDialog = false;
        this.predictionForm.event = null;
        this.predictionForm.id = null;
        this.predictionForm.team_a = null;
        this.predictionForm.twox_booster = false;
        this.predictionForm.team_h = null;
        this.predictionForm.home_team_goal = {
          text: 0,
          value: 0,
          visibility: true,
        };
        this.predictionForm.away_team_goal = {
          text: 0,
          value: 0,
          visibility: true,
        };
        if (fixture.prediction != null) {
          this.predictionForm.home_team_goal = fixture.prediction.team_h_goal;
          this.predictionForm.away_team_goal = fixture.prediction.team_a_goal;
          this.predictionForm.twox_booster = fixture.prediction.twox_booster;
        }
        this.predictionForm.team_a = fixture.team_a;
        this.predictionForm.team_h = fixture.team_h;
        this.predictionForm.event = fixture.event;
        this.predictionForm.id = fixture.id;
        this.predictionFormDialog = true;
      }
    },
    submitPredictionForm() {
      axios
        .post("/prediction", this.predictionForm)
        .then((res) => {
          if (res.data.success == false) {
            this.reloadGameWeek(this.predictionForm.event);
            switch (res.data.flag) {
              case "boosted_limit":
                this.showAlert({
                  title: "Boost Failed",
                  body: res.data.message,
                  close: true,
                });
                break;
            }
          } else {
            this.reloadGameWeek(this.predictionForm.event, true);
            this.showSnackbarAction({
              show: true,
              color: "success",
              message: "Successfully Predicted",
            });
          }
          this.predictionFormDialog = false;
          this.predictionForm.event = null;
          this.predictionForm.id = null;
          this.predictionForm.team_a = null;
          this.predictionForm.twox_booster = false;
          this.predictionForm.team_h = null;
          this.predictionForm.home_team_goal = {
            text: 0,
            value: 0,
            visibility: true,
          };
          this.predictionForm.away_team_goal = {
            text: 0,
            value: 0,
            visibility: true,
          };
        })
        .catch((e) => {
          console.log(e);
        });
    },
    resetGoalPredictionForm() {
      this.predictionForm.home_team_goal = {
        text: 0,
        value: 0,
        visibility: true,
      };
      this.predictionForm.away_team_goal = {
        text: 0,
        value: 0,
        visibility: true,
      };
    },
    showBreakdown(fixture) {
      console.log(fixture.breakdown);
      this.breakdownDialog = fixture.breakdown;
      this.showBreakdownDialog = true;
    },
  },
  mounted() {
    this.$ga.page("/tournament");
    for (let i = 0; i < 21; i++) {
      this.goalsNumber.push({
        value: i,
        text: i,
      });
    }

    this.getFixturesMounted();
  },
};
</script>

<style>
.disable-events {
  pointer-events: none;
}

.gameweek-tabs {
  display: flex;
  overflow-x: auto;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.gameweek-tabs::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.gameweek-tabs {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.gameweek-tabs-btn {
  margin-right: 10px !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  text-transform: capitalize !important;
  letter-spacing: 0.5px !important;
  background: #dadada !important;
  color: #757575 !important;
}

.goal-div {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px;
  border-style: dashed;
  border-color: #4c2fe3;
  width: 45px;
  height: 45px;
  border-radius: 10px;
  font-size: 18px;
  color: #4c2fe3;
  font-weight: 500;
}

.picker_chosen_list {
  padding: 0 !important;
}
.picker {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  background-color: #f8f8fa !important;
  border-radius: 4px;

  text-align: center;
  font-size: 15px;
  color: #bbbcc9;
}

.picker_chosen {
  background-color: #f8f8fa;
  color: #121212;
  font-size: 20px;
}

.picker_chosen_item {
  font-size: 20px;
  font-weight: 500;
  color: #4c2fe3;
}

.primary-badge {
  background: #edeafc;
  color: #7a62f5;
  border-radius: 8px;
  padding: 5px 8px;
  font-size: 10px;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  font-weight: 500;
}
</style>

<style scoped>
.recent-match-team {
  flex: 1;
}
.recent-match-score {
  justify-content: center;
  flex: 2;
  align-content: center;
}

.booster-alert {
  border: 1px solid #cee9d2;
  margin-top: 10px;
  background: #eaf7ef;
  border-radius: 4px;
  padding: 10px;
  color: #323c44;
  font-size: 14px;
}
</style>
