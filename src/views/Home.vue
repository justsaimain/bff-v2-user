<template>
    <v-app id="inspire">
        <top-nav></top-nav>
        <v-main class="grey lighten-3 my-auto">
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
                                Welcome Sai Main !
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
                        <div class="mt-5">
                            <p class="recent-matches-text">Recent Matches</p>
                            <div class="recent-matches-div">
                                <v-card>
                                    <p>Lorem.</p>
                                </v-card>
                                <v-card>
                                    <p>Lorem.</p>
                                </v-card>
                                <v-card>
                                    <p>Lorem.</p>
                                </v-card>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-bottom-navigation :value="value" color="primary" grow>
            <v-btn>
                <span>Home</span>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn>
                <span>Tournament</span>
                <v-icon>mdi-trophy</v-icon>
            </v-btn>
            <v-btn>
                <span>Leaderboard</span>
                <v-icon>mdi-podium-gold</v-icon>
            </v-btn>
            <v-btn>
                <span>Setting</span>
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-app>
</template>

<script>
import TopNav from "@/components/TopNav.vue";
export default {
    components: { TopNav },
    data: () => ({
        links: ["Dashboard", "Messages", "Profile", "Updates"],
    }),
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

.recent-matches-text {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.2px;
}

.recent-matches-div {
}
</style>