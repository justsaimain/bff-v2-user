<template>
    <v-bottom-navigation
        :value="value"
        color="primary"
        grow
        fixed
        class="bottom-navigation"
    >
        <v-btn to="/">
            <span>Home</span>
            <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn to="/tournament">
            <span>Tournament</span>
            <v-icon>mdi-trophy</v-icon>
        </v-btn>
        <v-btn to="/leaderboard">
            <span>Leaderboard</span>
            <v-icon>mdi-podium-gold</v-icon>
        </v-btn>
        <v-btn to="/setting">
            <span>Setting</span>
            <v-icon>mdi-menu</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    data: () => ({
        value: 0,
    }),
};
</script>
