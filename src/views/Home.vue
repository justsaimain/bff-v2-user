<template>
    <v-app id="inspire">
        <top-nav></top-nav>
        <v-main class="main-app grey lighten-3 my-auto pt-13">
            <v-container>
                <v-row class="primary main-header-div">
                    <v-col cols="12">
                        <div class="px-5">
                            <p
                                class="
                                    text-center
                                    mb-3
                                    white--text
                                    welcome-text
                                "
                            >
                                Welcome
                                <span v-if="authenticated">
                                    {{ user.name }}
                                </span>
                            </p>
                            <v-card class="py-3 main-header-card" elevation="0">
                                <p class="text-center main-header-title mb-2">
                                    Game Week 1 Result
                                </p>
                                <v-row
                                    class="px-3"
                                    align="end"
                                    justify="center"
                                >
                                    <v-col class="text-center average-div">
                                        <p class="mb-0">42</p>
                                        <p class="mb-0">Average</p>
                                    </v-col>
                                    <v-col class="text-center your-score-div">
                                        <p class="mb-0">42</p>
                                        <p class="mb-0">Your Score</p>
                                    </v-col>
                                    <v-col class="text-center highest-div">
                                        <p class="mb-0">42</p>
                                        <p class="mb-0">Highest</p>
                                    </v-col>
                                </v-row>
                                <v-divider class="my-3"></v-divider>
                                <v-row
                                    class="px-3"
                                    justify="center"
                                    align="center"
                                >
                                    <v-col> </v-col>
                                    <v-col class="text-end">
                                        <v-btn
                                            class="primary view-detail-btn"
                                            small
                                            >View Detail
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </div>
                        <recent-matches></recent-matches>
                        <div class="mt-5">
                            <p class="small-page-title">
                                Game Week 1 Top Predictor
                            </p>
                            <v-card elevation="0" class="top-predictor-card">
                                <v-avatar
                                    size="80"
                                    class="top-predictor-avatar"
                                >
                                    <img
                                        src="https://randomuser.me/api/portraits/men/99.jpg"
                                        alt=""
                                    />
                                </v-avatar>
                                <div>
                                    <h3 class="top-predictor-name">
                                        Aung Thu Hein
                                    </h3>
                                    <p class="mb-0 top-predictor-points">
                                        114 Points
                                    </p>
                                    <p class="mb-0 top-predictor-details">
                                        ManU | Yangon
                                    </p>
                                    <v-btn class="primary view-leaderboard-btn"
                                        >View Leaderboard</v-btn
                                    >
                                </div>
                            </v-card>
                        </div>
                        <div class="mt-5">
                            <p class="small-page-title">Game Week 2 Deadline</p>
                            <v-card
                                elevation="0"
                                class="gameweek-deadline-card"
                                color="primary"
                            >
                                <p class="text-center">
                                    Don't miss your chance
                                </p>
                                <div class="gameweek-deadline-div">
                                    <div
                                        class="
                                            d-flex
                                            flex-column
                                            justify-center
                                            align-center
                                        "
                                    >
                                        <h3>02</h3>
                                        <p>Days</p>
                                    </div>
                                    <div
                                        class="
                                            d-flex
                                            flex-column
                                            justify-center
                                            align-center
                                        "
                                    >
                                        <h3>11</h3>
                                        <p>Hours</p>
                                    </div>
                                    <div
                                        class="
                                            d-flex
                                            flex-column
                                            justify-center
                                            align-center
                                        "
                                    >
                                        <h3>31</h3>
                                        <p>Mins</p>
                                    </div>
                                </div>
                                <div class="text-center mt-5">
                                    <v-btn class="white predict-now-btn"
                                        >Predict Now</v-btn
                                    >
                                </div>
                            </v-card>
                        </div>
                        <div class="mt-5" style="margin-bottom: 80px">
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
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <bottom-navigation></bottom-navigation>
    </v-app>
</template>
<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import TopNav from "../components/TopNav.vue";
import RecentMatches from "../components/RecentMatches.vue";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
    components: { TopNav, RecentMatches, BottomNavigation },
    data: () => ({}),
    computed: {
        ...mapGetters({
            authenticated: "auth/authenticated",
            user: "auth/user",
        }),
    },
    mounted() {
        console.log("Mounted");
        axios
            .get("https://fantasy-premier-league3.p.rapidapi.com/data/types", {
                headers: {
                    "x-rapidapi-host": "fantasy-premier-league3.p.rapidapi.com",
                    "x-rapidapi-key":
                        "abe4621a9bmshbc1c9a211f870d6p157512jsnd3bbdf64de8b",
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    },
};
</script>

<style scoped>
.welcome-text {
    letter-spacing: 0.5px;
}

.main-header-div {
    max-height: 150px;
    border-radius: 0 0 20px 20px;
}

.main-header-card {
    border-bottom: 1px solid #333;
}

.main-header-title {
    font-weight: 500;
    font-size: 15px;
}

.average-div p:first-child,
.highest-div p:first-child {
    font-size: 20px;
    font-weight: 500;
}

.average-div p:last-child,
.highest-div p:last-child {
    font-size: 12px;
    letter-spacing: 0.5px;
}
.your-score-div p:first-child {
    font-size: 28px;
    font-weight: 700;
    color: #4c2fe3;
}

.your-score-div p:last-child {
    font-size: 12px;
    letter-spacing: 0.5px;
}

.view-detail-btn {
    font-size: 13px;
    font-weight: 400;
    text-transform: capitalize;
}

.top-predictor-card {
    padding: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.top-predictor-avatar {
    border-radius: 100% !important;
    outline: 2px solid #4c2fe3;
}

.top-predictor-name {
    font-size: 15px;
}

.top-predictor-points {
    font-size: 13px;
    font-weight: 500;
}
.top-predictor-details {
    font-size: 13px;
}

.view-leaderboard-btn {
    margin-top: 8px;
    font-size: 13px;
    font-weight: 400;
    text-transform: capitalize;
}

.gameweek-deadline-card {
    color: #fff !important;
    padding: 20px;
    background: rgb(76, 47, 227);
    background: linear-gradient(
        90deg,
        rgba(76, 47, 227, 1) 0%,
        rgba(58, 58, 226, 1) 56%,
        rgba(115, 100, 246, 1) 100%
    );
}

.gameweek-deadline-div {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.gameweek-deadline-div h3 {
    font-size: 25px;
    font-weight: 600;
    letter-spacing: 1px;
}
.gameweek-deadline-div p {
    margin-bottom: 0;
    font-weight: 300;
    font-size: 13px;
}

.predict-now-btn {
    font-size: 15px;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: 0px;
    color: #4c2fe3 !important;
}
</style>