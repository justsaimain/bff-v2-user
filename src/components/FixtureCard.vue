<template>
    <v-card elevation="0" class="pa-5 text-center border">
        <h5>{{ this.fixture.kickoff_time }}</h5>
        <p></p>
        <div class="mt-5 d-flex justify-space-around align-center">
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
                            this.fixtureData.homeData.code +
                            '.png'
                        "
                        @error="getDefaultTeamImage"
                    />
                </v-avatar>
                <span style="font-size: 13px; letter-spacing: 0.5px">
                    {{ this.fixtureData.homeData.name }}
                </span>
            </div>
            <div class="d-flex align-center">
                <div class="goal-div">6</div>
                <h5 class="primary--text mx-3">VS</h5>
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
                            'https://resources.premierleague.com/premierleague/badges/70/t' +
                            this.fixtureData.awayData.code +
                            '.png'
                        "
                        @error="getDefaultTeamImage"
                    />
                </v-avatar>
                <span style="font-size: 13px; letter-spacing: 0.5px">
                    {{ this.fixtureData.awayData.name }}
                </span>
            </div>
        </div>
    </v-card>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            fixtureData: {
                homeData: null,
                awayData: null,
            },
        };
    },
    props: {
        fixturesCount: String,
        fixture: Object,
    },
    mounted() {
        axios
            .get(
                "https://fantasy-premier-league3.p.rapidapi.com/team/" +
                    this.fixture.team_h
            )
            .then((res) => {
                this.fixtureData.homeData = res.data[0];
                axios
                    .get(
                        "https://fantasy-premier-league3.p.rapidapi.com/team/" +
                            this.fixture.team_a
                    )
                    .then((res) => {
                        this.fixtureData.awayData = res.data[0];
                        console.log(this.fixtureData);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((e) => {
                console.log(e);
            });
    },
    methods: {
        getDefaultTeamImage(e) {
            e.target.src = "https://singlecolorimage.com/get/EEEEEE/55x55";
        },
    },
};
</script>