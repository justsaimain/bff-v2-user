<template>
  <div class="mt-5">
    <p v-if="this.data.length > 0" class="small-page-title">Recent Matches</p>
    <div v-if="this.data.length > 0" class="recent-matches-div">
      <v-card
        v-for="match in this.data"
        :key="match.id"
        min-width="230px"
        elevation="0"
        class="recent-match-card"
      >
        <div
          class="d-flex flex-column justify-center recent-match-team align-center"
        >
          <v-avatar size="35" tile>
            <img
              :src="
                'https://resources.premierleague.com/premierleague/badges/70/t' +
                match.team_h.code +
                '.png'
              "
              :alt="match.team_h.code"
            />
          </v-avatar>
          <span> {{ match.team_h.name }} </span>
        </div>
        <div>
          <h3>{{ match.team_h.score }} : {{ match.team_a.score }}</h3>
        </div>
        <div
          class="d-flex flex-column justify-center align-center recent-match-team"
        >
          <v-avatar size="35" tile>
            <img
              :src="
                'https://resources.premierleague.com/premierleague/badges/70/t' +
                match.team_a.code +
                '.png'
              "
              :alt="match.team_a.code"
            />
          </v-avatar>
          <span>{{ match.team_a.name }} </span>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  mounted() {
    if (this.data) {
      console.log("data", this.data);
    }
  },
};
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

.no-recent-match {
  text-align: center;
  font-size: 14px;
  color: #999;
  margin-bottom: 0px;
}
</style>
