<template>
    <v-app id="inspire">
        <v-dialog v-model="isOffline" persistent max-width="290">
            <v-card>
                <v-card-title class="">
                    You are currently Offline.
                </v-card-title>
                <v-card-text
                    >Please, check you internet connection and try
                    again.</v-card-text
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="reloadPage">
                        Reload
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <router-view />
    </v-app>
</template>

<script>
export default {
    name: "App",
    component: {},
    data: () => ({
        isOffline: false,
    }),
    mounted() {},
    methods: {
        reloadPage() {
            window.location.reload();
        },
    },
};
</script>

<style>
.small-page-title {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.2px;
}
</style>
