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
        <v-dialog v-model="alert.show" persistent max-width="290">
            <v-card>
                <v-card-title class="">
                    {{ alert.title }}
                </v-card-title>
                <v-card-text>{{ alert.body }}</v-card-text>
                <v-card-actions>
                    <v-btn
                        v-if="alert.action == 'reload'"
                        color="primary"
                        text
                        @click="reloadPage"
                    >
                        Reload
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        v-if="alert.close"
                        color=""
                        text
                        @click="this.hideAlert"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <router-view />
    </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "App",
    computed: {
        ...mapGetters({
            alert: "general/getAlert",
        }),
    },
    component: {},
    data: () => ({
        isOffline: false,
    }),
    mounted() {
        this.storeOption();
        this.getTeams();
    },
    methods: {
        ...mapActions({
            storeOption: "options/storeOption",
            getTeams: "teams/getTeams",
        }),
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
