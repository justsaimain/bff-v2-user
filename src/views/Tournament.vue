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
      <v-dialog
        v-model="showDetailDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="showDetailDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Fixture Details</v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-dialog>
      <v-container>
        <v-row class="">
          <v-col cols="12">
            <div class="gameweek-tabs">
              <v-btn
                v-for="gameWeekTab in totalGameWeek"
                :key="gameWeekTab"
                class="gameweek-tabs-btn"
                elevation="0"
                :class="[
                  {
                    'primary white--text': gameWeekTab == gameWeek,
                  },
                  `gw-tab-${gameWeekTab}`,
                ]"
                @click="reloadGameWeek(gameWeekTab)"
              >
                Game Week {{ gameWeekTab }}
              </v-btn>
            </div>
            <div v-if="!loading" style="margin-bottom: 80px">
              <div v-for="fixture in fixtures" :key="fixture.code" class="mt-5">
                <v-card elevation="0" class="pa-5 text-center">
                  <h5>
                    {{ moment(fixture.kickoff_time).format("dddd D MMMM") }}
                  </h5>
                  <div class="mt-5 d-flex justify-space-around align-center">
                    <div
                      class="d-flex flex-column justify-center recent-match-team align-center"
                    >
                      <v-avatar size="55" tile>
                        <img
                          :src="
                            'https://resources.premierleague.com/premierleague/badges/70/t' +
                            fixture.team_h_detail[0].code +
                            '.png'
                          "
                          @error="getDefaultTeamImage"
                        />
                      </v-avatar>
                      <span style="font-size: 13px; letter-spacing: 0.5px">
                        {{ fixture.team_h_detail[0].name }}
                      </span>
                    </div>
                    <div
                      v-if="fixture.finished"
                      class="d-flex align-center recent-match-score"
                    >
                      <div class="goal-div">{{ fixture.team_h_score }}</div>
                      <h5 class="primary--text mx-3">VS</h5>
                      <div class="goal-div">{{ fixture.team_a_score }}</div>
                    </div>
                    <div v-else class="d-flex align-center">
                      <div class="goal-div">+</div>
                      <h5 class="primary--text mx-3">VS</h5>
                      <div class="goal-div">+</div>
                    </div>
                    <div
                      class="d-flex flex-column justify-center recent-match-team align-center"
                    >
                      <v-avatar size="55" tile>
                        <img
                          :src="
                            'https://resources.premierleague.com/premierleague/badges/70/t' +
                            fixture.team_a_detail[0].code +
                            '.png'
                          "
                          @error="getDefaultTeamImage"
                        />
                      </v-avatar>
                      <span style="font-size: 13px; letter-spacing: 0.5px">
                        {{ fixture.team_a_detail[0].name }}
                      </span>
                    </div>
                  </div>
                  <v-btn
                    @click="viewDetailDialog(fixture)"
                    class="primary mt-5"
                    small
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
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  components: { TopNav, BottomNavigation },
  data: () => ({
    loading: true,
    showDetailDialog: false,
    totalGameWeek: 38,
    detailFixture: null,
    gameWeek: 22,
    fixtures: null,
    attrs: {
      class: "mt-5",
      boilerplate: true,
    },
  }),
  methods: {
    moment,
    getDefaultTeamImage(e) {
      e.target.src = "https://singlecolorimage.com/get/EEEEEE/55x55";
    },
    reloadGameWeek(gw) {
      this.loading = true;
      this.gameWeek = gw;
      axios
        .get("https://fantasy-premier-league3.p.rapidapi.com/fixtures", {
          params: { gw: this.gameWeek },
        })
        .then((res) => {
          this.fixtures = res.data;
          this.fixtures.forEach((fix) => {
            fix.team_a_detail = this.teams.filter(
              (team) => team.id == fix.team_a
            );

            fix.team_h_detail = this.teams.filter(
              (team) => team.id == fix.team_h
            );
          });

          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
    viewDetailDialog(fixture) {
      this.showDetailDialog = true;
      this.detailFixture = fixture;
    },
  },
  mounted() {
    this.loading = true;
    axios
      .get("https://fantasy-premier-league3.p.rapidapi.com/fixtures", {
        params: { gw: this.gameWeek },
      })
      .then((res) => {
        this.fixtures = res.data;
        this.loading = false;
        this.fixtures.forEach((fix) => {
          fix.team_a_detail = this.teams.filter(
            (team) => team.id == fix.team_a
          );

          fix.team_h_detail = this.teams.filter(
            (team) => team.id == fix.team_h
          );
        });

        this.loading = false;

        setTimeout(() => {
          var options = {
            container: ".gameweek-tabs",
            easing: "ease",
            offset: 0,
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
      })
      .catch((e) => {
        this.loading = false;
        alert("something was wrong");
        console.log(e);
      });
  },
  computed: {
    ...mapGetters({
      teams: "teams/teams",
    }),
  },
};
</script>

<style>
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
