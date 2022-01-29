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
          <div class="py-16">
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
                <v-btn
                  elevation="0"
                  class="d-block mb-3"
                  color="primary"
                  @click.prevent="submitPredictionForm"
                  style="width: 150px"
                  >Save</v-btn
                >
                <v-btn
                  @click="predictionFormDialog = false"
                  elevation="0"
                  outlined
                  class="d-block"
                  color="primary"
                  style="width: 150px"
                  >Reset Goals</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-sheet>
      </v-bottom-sheet>
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
                @click="reloadGameWeek(gameWeekTab)"
              >
                Game Week {{ gameWeekTab }}
              </v-btn>
            </div>
            <div
              v-if="!loading"
              class="fixtures-container"
              style="margin-bottom: 80px"
            >
              <div
                v-for="fixture in fixtures"
                :key="fixture.code"
                :class="[`fixture-card-${fixture.id}`]"
                class="mt-5"
              >
                <v-card elevation="0" class="pa-5 text-center">
                  <h5>
                    {{ moment(fixture.kickoff_time).format("dddd D MMMM ") }}
                  </h5>
                  <h5>
                    {{ moment(fixture.kickoff_time).format("h:mm A") }}
                  </h5>
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
                      class="d-flex align-center recent-match-score"
                    >
                      <div class="goal-div">
                        {{ fixture.team_h_score }}
                      </div>
                      <h5 class="primary--text mx-3">VS</h5>
                      <div class="goal-div">
                        {{ fixture.team_a_score }}
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
                      <h4 class="primary--text">Prediction Close</h4>
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
                  <v-btn v-if="fixture.finished" class="primary mt-5" small
                    >View Details</v-btn
                  >
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
import Picker from "vue-wheel-picker";
export default {
  components: { TopNav, BottomNavigation, Picker },
  data: () => ({
    loading: true,
    totalGameWeek: 0,
    gameWeek: 0,
    fixtures: null,
    goalsNumber: [],
    fixtureScrollTo: null,
    predictionFormDialog: false,
    predictionForm: {
      event: null,
      id: null,
      team_a: null,
      team_h: null,
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
  }),
  computed: {
    ...mapGetters({
      alert: "general/getAlert",
      authenticated: "auth/authenticated",
    }),
  },
  methods: {
    moment,
    ...mapActions({
      showAlert: "general/showAlert",
      hideAlert: "general/hideAlert",
      showNoAuthAlert: "general/showNoAuthAlert",
    }),
    scrollToElement(options) {
      const el = this.$el.getElementsByClassName("fixture-card-236")[0];
      if (el) {
        el.scrollIntoView(options);
      }
    },
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
          this.fixtures = res.data;

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
    reloadGameWeek(gw) {
      this.loading = true;
      this.gameWeek = gw;
      axios
        .get("/fixtures", { params: { gw: this.gameWeek } })
        .then((res) => {
          this.fixtures = res.data;

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
      const checkTime = moment(fixture.kickoff_time)
        .subtract(30, "minutes")
        .format("YYYY-MM-D HH:mm");
      const nowTime = moment().format("YYYY-MM-D HH:mm");
      return moment(nowTime).isBefore(checkTime);
    },
    showPredictionForm(fixture) {
      if (!this.authenticated) {
        this.showNoAuthAlert();
      } else {
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
        .then(() => {
          this.reloadGameWeek(this.predictionForm.event);
          this.predictionFormDialog = false;
          this.predictionForm.event = null;
          this.predictionForm.id = null;
          this.predictionForm.team_a = null;
          this.predictionForm.team_h = null;
          this.predictionForm.home_team_goal = null;
          this.predictionForm.away_team_goal = null;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
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
</style>
