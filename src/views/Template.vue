<template>
    <v-app id="inspire">
        <top-nav></top-nav>
        <v-main class="grey lighten-3 my-auto">
            <v-container>
                <v-row class="primary main-header-div">
                    <v-col cols="12"> </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import TopNav from "../components/TopNav.vue";
export default {
    components: { TopNav },
    data: () => ({}),
};
</script>
