<template>
  <v-snackbar
    v-if="snackbarData"
    v-model="snackbarData.show"
    :color="snackbarData.color"
    top
    elevation="0"
    text
  >
    {{ this.snackbarData.message }}
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      snackbarData: "alert/snackbarData",
    }),
  },
};
</script>

