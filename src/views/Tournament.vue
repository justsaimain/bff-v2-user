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
            <v-bottom-sheet v-model="predictionFormDialog" persistent>
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
                            <!-- <p v-if="this.predictionForm.home_team_goal">
                                {{ this.predictionForm.home_team_goal.value }}
                            </p>
                            <p v-if="this.predictionForm.away_team_goal">
                                {{ this.predictionForm.away_team_goal.value }}
                            </p> -->

                            <v-col class="text-center">
                                <h5>
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
                                <h5>
                                    {{ this.predictionForm.team_a.name }}
                                </h5>
                            </v-col>
                        </v-row>
                        <v-row class="">
                            <v-col
                                class="
                                    d-flex
                                    flex-column
                                    justify-center
                                    align-center
                                "
                            >
                                <v-btn
                                    elevation="0"
                                    class="d-block mb-3"
                                    color="primary"
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
                    <v-col cols="12" v-if="this.getOptions != null">
                        <div class="gameweek-tabs">
                            <v-btn
                                v-for="gameWeekTab in this.getOptions
                                    .total_gameweek"
                                :key="gameWeekTab"
                                class="gameweek-tabs-btn"
                                elevation="0"
                                :class="[
                                    {
                                        'primary white--text':
                                            gameWeekTab ==
                                            getOptions.current_gameweek,
                                    },
                                    `gw-tab-${gameWeekTab}`,
                                ]"
                                @click="reloadGameWeek(gameWeekTab)"
                            >
                                Game Week {{ gameWeekTab }}
                            </v-btn>
                        </div>
                        <div v-if="!loading" style="margin-bottom: 80px">
                            <div
                                v-for="fixture in fixtures"
                                :key="fixture.code"
                                class="mt-5"
                            >
                                <v-card elevation="0" class="pa-5 text-center">
                                    <h5>
                                        {{
                                            moment(fixture.kickoff_time).format(
                                                "dddd D MMMM "
                                            )
                                        }}
                                    </h5>
                                    <h5>
                                        {{
                                            moment(fixture.kickoff_time).format(
                                                "h:mm A"
                                            )
                                        }}
                                    </h5>
                                    <div
                                        class="
                                            mt-5
                                            d-flex
                                            justify-space-around
                                            align-center
                                        "
                                    >
                                        <div
                                            class="
                                                d-flex
                                                flex-column
                                                justify-center
                                                recent-match-team
                                                align-center
                                            "
                                        >
                                            <v-avatar size="55" tile>
                                                <img
                                                    :src="
                                                        'https://resources.premierleague.com/premierleague/badges/70/t' +
                                                        fixture.team_h_detail[0]
                                                            .code +
                                                        '.png'
                                                    "
                                                    @error="getDefaultTeamImage"
                                                />
                                            </v-avatar>
                                            <span
                                                style="
                                                    font-size: 13px;
                                                    letter-spacing: 0.5px;
                                                "
                                            >
                                                {{
                                                    fixture.team_h_detail[0]
                                                        .name
                                                }}
                                            </span>
                                        </div>
                                        <div
                                            v-if="fixture.finished"
                                            class="
                                                d-flex
                                                align-center
                                                recent-match-score
                                            "
                                        >
                                            <div class="goal-div">
                                                {{ fixture.team_h_score }}
                                            </div>
                                            <h5 class="primary--text mx-3">
                                                VS
                                            </h5>
                                            <div class="goal-div">
                                                {{ fixture.team_a_score }}
                                            </div>
                                        </div>
                                        <div
                                            v-else-if="fixture.started"
                                            class="d-flex align-center"
                                        >
                                            <h4 class="primary--text">
                                                Started
                                            </h4>
                                        </div>
                                        <div
                                            v-else-if="
                                                checkPredictionAccept(fixture)
                                            "
                                            class="d-flex align-center"
                                        >
                                            <div
                                                class="goal-div"
                                                @click="
                                                    showPredictionForm(fixture)
                                                "
                                            >
                                                +
                                            </div>
                                            <h5 class="primary--text mx-3">
                                                VS
                                            </h5>
                                            <div
                                                @click="
                                                    showPredictionForm(fixture)
                                                "
                                                class="goal-div"
                                            >
                                                +
                                            </div>
                                        </div>
                                        <div v-else class="d-flex align-center">
                                            <h4 class="primary--text">
                                                Prediction Close
                                            </h4>
                                        </div>
                                        <div
                                            class="
                                                d-flex
                                                flex-column
                                                justify-center
                                                recent-match-team
                                                align-center
                                            "
                                        >
                                            <v-avatar size="55" tile>
                                                <img
                                                    :src="
                                                        'https://resources.premierleague.com/premierleague/badges/70/t' +
                                                        fixture.team_a_detail[0]
                                                            .code +
                                                        '.png'
                                                    "
                                                    @error="getDefaultTeamImage"
                                                />
                                            </v-avatar>
                                            <span
                                                style="
                                                    font-size: 13px;
                                                    letter-spacing: 0.5px;
                                                "
                                            >
                                                {{
                                                    fixture.team_a_detail[0]
                                                        .name
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                    <v-btn
                                        v-if="fixture.finished"
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
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import Picker from "vue-wheel-picker";
export default {
    components: { TopNav, BottomNavigation, Picker },
    data: () => ({
        loading: true,
        showDetailDialog: false,
        detailFixture: null,
        gameWeek: 2,
        predictionFormDialog: false,
        fixtures: null,
        goalsNumber: [],
        predictionForm: {
            code: null,
            event: null,
            finished: null,
            finished_provisional: null,
            id: null,
            started: null,
            team_a: null,
            team_h: null,
            home_team_goal: null,
            away_team_goal: null,
        },
    }),
    computed: {
        ...mapGetters({
            teams: "teams/teams",
            alert: "general/getAlert",
            getOptions: "options/getOptions",
        }),
    },
    methods: {
        moment,
        ...mapActions({
            showAlert: "general/showAlert",
            hideAlert: "general/hideAlert",
            storeOption: "options/storeOption",
        }),
        getDefaultTeamImage(e) {
            e.target.src = "https://singlecolorimage.com/get/EEEEEE/55x55";
        },
        reloadGameWeek(gw) {
            this.loading = true;
            this.gameWeek = gw;
            axios
                .get(
                    "https://fantasy-premier-league3.p.rapidapi.com/fixtures",
                    {
                        params: { gw: this.gameWeek },
                    }
                )
                .then((res) => {
                    this.fixtures = res.data;
                    console.log(this.fixtures);
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
            console.log(fixture);
            this.showDetailDialog = true;
            this.detailFixture = fixture;
        },
        showPredictionForm(fixture) {
            this.predictionForm.code = fixture.code;
            this.predictionForm.event = fixture.event;
            this.predictionForm.finished = fixture.finished;
            this.predictionForm.finished_provisional =
                fixture.finished_provisional;
            this.predictionForm.id = fixture.id;
            this.predictionForm.started = fixture.started;
            this.predictionForm.team_a = fixture.team_a_detail[0];
            this.predictionForm.team_h = fixture.team_h_detail[0];
            this.predictionFormDialog = true;
        },
        checkPredictionAccept(fixture) {
            const checkTime = moment(fixture.kickoff_time)
                .subtract(30, "minutes")
                .format("YYYY-MM-D HH:mm");
            const nowTime = moment().format("YYYY-MM-D HH:mm");
            return moment(nowTime).isBefore(checkTime);
        },
    },
    mounted() {
        for (let i = 0; i < 21; i++) {
            this.goalsNumber.push({
                value: i,
                text: i,
            });
        }

        console.log(this.getOptions.current_gameweek);

        axios
            .get("https://fantasy-premier-league3.p.rapidapi.com/fixtures", {
                params: { gw: this.getOptions.current_gameweek },
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
                        `.gw-tab-${this.getOptions.current_gameweek}`,
                        3000,
                        options
                    );
                });
                this.loading = false;
            })
            .catch((e) => {
                this.loading = false;
                this.showAlert({
                    title: "Opp! Sorry",
                    body: "Unable to fetch fixtures data.",
                    close: true,
                });
                console.log(e);
            });
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
