<template>
    <div class="mt-5">
        <p class="small-page-title">Recent Matches</p>
        <div class="recent-matches-div">
            <v-card min-width="230px" elevation="0" class="recent-match-card">
                <div
                    class="
                        d-flex
                        flex-column
                        justify-center
                        recent-match-team
                        align-center
                    "
                >
                    <v-avatar size="35" tile>
                        <img
                            src="https://resources.premierleague.com/premierleague/badges/50/t3.png"
                            alt="t3"
                        />
                    </v-avatar>
                    <span> Arsenal </span>
                </div>
                <div>
                    <h3>5 : 3</h3>
                </div>
                <div
                    class="
                        d-flex
                        flex-column
                        justify-center
                        align-center
                        recent-match-team
                    "
                >
                    <v-avatar size="35" tile>
                        <img
                            src="https://resources.premierleague.com/premierleague/badges/50/t1.png"
                            alt="t1"
                        />
                    </v-avatar>
                    <span> Man U </span>
                </div>
            </v-card>
            <v-card min-width="230px" elevation="0" class="recent-match-card">
                <div
                    class="
                        d-flex
                        flex-column
                        justify-center
                        recent-match-team
                        align-center
                    "
                >
                    <v-avatar size="35" tile>
                        <img
                            src="https://resources.premierleague.com/premierleague/badges/50/t3.png"
                            alt="t3"
                        />
                    </v-avatar>
                    <span> Arsenal </span>
                </div>
                <div>
                    <h3>5 : 3</h3>
                </div>
                <div
                    class="
                        d-flex
                        flex-column
                        justify-center
                        align-center
                        recent-match-team
                    "
                >
                    <v-avatar size="35" tile>
                        <img
                            src="https://resources.premierleague.com/premierleague/badges/50/t1.png"
                            alt="t1"
                        />
                    </v-avatar>
                    <span> Man U </span>
                </div>
            </v-card>
            <v-card min-width="230px" elevation="0" class="recent-match-card">
                <div
                    class="
                        d-flex
                        flex-column
                        justify-center
                        recent-match-team
                        align-center
                    "
                >
                    <v-avatar size="35" tile>
                        <img
                            src="https://resources.premierleague.com/premierleague/badges/50/t3.png"
                            alt="t3"
                        />
                    </v-avatar>
                    <span> Arsenal </span>
                </div>
                <div>
                    <h3>5 : 3</h3>
                </div>
                <div
                    class="
                        d-flex
                        flex-column
                        justify-center
                        align-center
                        recent-match-team
                    "
                >
                    <v-avatar size="35" tile>
                        <img
                            src="https://resources.premierleague.com/premierleague/badges/50/t1.png"
                            alt="t1"
                        />
                    </v-avatar>
                    <span> Man U </span>
                </div>
            </v-card>
            <v-card min-width="230px" elevation="0" class="recent-match-card">
                <div
                    class="
                        d-flex
                        flex-column
                        justify-center
                        recent-match-team
                        align-center
                    "
                >
                    <v-avatar size="35" tile>
                        <img
                            src="https://resources.premierleague.com/premierleague/badges/50/t3.png"
                            alt="t3"
                        />
                    </v-avatar>
                    <span> Arsenal </span>
                </div>
                <div>
                    <h3>5 : 3</h3>
                </div>
                <div
                    class="
                        d-flex
                        flex-column
                        justify-center
                        align-center
                        recent-match-team
                    "
                >
                    <v-avatar size="35" tile>
                        <img
                            src="https://resources.premierleague.com/premierleague/badges/50/t1.png"
                            alt="t1"
                        />
                    </v-avatar>
                    <span> Man U </span>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.recent-matches-div {
    overflow-x: auto;
    display: flex;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.recent-matches-div::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.recent-matches-div {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}

.recent-match-card {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 15px;
}

.recent-match-team span {
    font-size: 13px;
    letter-spacing: 0.5px;
}
</style>