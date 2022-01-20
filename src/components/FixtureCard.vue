<template>
  <v-card elevation="0" class="pa-5 text-center border">
    <h5>{{ this.fixture.kickoff_time }}</h5>
    <p>{{ this.team_a.name }}</p>
    <hr />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      team_a: null,
      team_h: null,
    };
  },
  props: {
    fixture: Object,
  },
  computed: {
    ...mapGetters({
      teams: "teams/teams",
    }),
  },
  mounted() {
    if (this.team_a) {
      this.team_a = this.teams.find(
        (element) => element.code == this.fixture.team_a
      );
    }
  },
  methods: {
    getDefaultTeamImage(e) {
      e.target.src = "https://singlecolorimage.com/get/EEEEEE/55x55";
    },
  },
};
</script>
