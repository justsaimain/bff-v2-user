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
                                v-for="gameWeekTab in totalGameWeek"
                                :key="gameWeekTab"
                                class="gameweek-tabs-btn"
                                elevation="0"
                                :class="[
                                    {
                                        'primary white--text':
                                            gameWeekTab == gameWeek,
                                    },
                                    `gw-tab-${gameWeekTab}`,
                                ]"
                                @click="reloadGameWeek(gameWeekTab)"
                            >
                                Game Week {{ gameWeekTab }}
                            </v-btn>
                        </div>
                        <div style="margin-bottom: 80px">
                            <div
                                v-for="fixture in fixtures"
                                :key="fixture.code"
                                class="mt-5"
                            >
                                <v-card
                                    elevation="0"
                                    class="pa-5 text-center border"
                                >
                                    <h5>16 Feb, 2:30 PM</h5>
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
                                                        'https://resources.premierleague.com/premierleague/badges/50/t' +
                                                        fixture.team_h +
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
                                                {{ fixture.team_h }}
                                            </span>
                                        </div>
                                        <div class="d-flex align-center">
                                            <div class="goal-div">6</div>
                                            <h5 class="primary--text mx-3">
                                                VS
                                            </h5>
                                            <div class="goal-div">6</div>
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
                                                        'https://resources.premierleague.com/premierleague/badges/50/t' +
                                                        fixture.team_a +
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
                                                {{ fixture.team_a }}
                                            </span>
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

export default {
    components: { TopNav, BottomNavigation },
    data: () => ({
        loading: true,
        totalGameWeek: 38,
        gameWeek: 22,
        fixtures: null,
        attrs: {
            class: "mt-5",
            boilerplate: true,
        },
    }),
    methods: {
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
                    console.log(res);
                    this.fixtures = res.data;
                    this.loading = false;
                })
                .catch((e) => {
                    this.loading = false;
                    console.log(e);
                });
        },
    },
    mounted() {
        this.loading = true;
        axios
            .get("https://fantasy-premier-league3.p.rapidapi.com/fixtures", {
                params: { gw: this.gameWeek },
                headers: {
                    "x-rapidapi-host": "fantasy-premier-league3.p.rapidapi.com",
                    "x-rapidapi-key":
                        "abe4621a9bmshbc1c9a211f870d6p157512jsnd3bbdf64de8b",
                },
            })
            .then((res) => {
                console.log(res);
                this.fixtures = res.data;
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
                console.log(e);
            });
    },
    computed: {},
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