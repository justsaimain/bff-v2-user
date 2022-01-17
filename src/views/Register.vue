<template>
    <v-app id="inspire">
        <v-main class="grey lighten-3 my-auto">
            <v-dialog v-model="loading" persistent width="100">
                <v-card
                    class="d-flex justify-center align-center"
                    width="100"
                    height="100"
                >
                    <v-progress-circular
                        :size="30"
                        color="primary"
                        indeterminate
                    ></v-progress-circular
                ></v-card>
            </v-dialog>
            <v-container fill-height fluid>
                <v-row align="center" justify="center" class="">
                    <v-col cols="12">
                        <v-btn class="mx-5 mb-5" icon @click="$router.go(-1)">
                            <v-icon>mdi-arrow-left-thin</v-icon>
                            Go Back
                        </v-btn>
                        <h3>Register</h3>
                        <v-form @submit.prevent="register">
                            <div class="mt-5">
                                <v-text-field
                                    label="Name"
                                    outlined
                                    v-model="form.name"
                                ></v-text-field>
                                <v-text-field
                                    v-model="form.phone"
                                    label="Phone Number"
                                    outlined
                                ></v-text-field>
                                <v-select
                                    :items="regions"
                                    v-model="form.region"
                                    label="Regions"
                                    outlined
                                ></v-select>
                                <v-select
                                    v-model="form.fav_team"
                                    :items="teams"
                                    label="Favorite Team"
                                    outlined
                                ></v-select>
                                <v-text-field
                                    v-model="form.password"
                                    label="Password"
                                    outlined
                                ></v-text-field>
                                <v-text-field
                                    v-model="form.password_confirmation"
                                    label="Confirm Password"
                                    outlined
                                ></v-text-field>
                                <v-btn
                                    type="submit"
                                    color="primary"
                                    :loading="loading"
                                    :disabled="loading"
                                >
                                    <template v-slot:loader>
                                        <span>Loading...</span>
                                    </template>
                                    Create Account
                                </v-btn>
                                <v-btn to="/login" plain> Login Account </v-btn>
                            </div>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
    mounted() {
        // this.$loading(true);
    },
    components: {},
    data: () => ({
        regions: ["Yangon", "Mandalay", "Naypyidaw"],
        teams: ["Arsenal", "Chelsea", "Man U"],
        loading: false,
        form: {
            name: "",
            phone: "",
            region: "",
            fav_team: "",
            password: "",
            password_confirmation: "",
        },
    }),
    methods: {
        ...mapActions({
            storeOTP: "auth/storeOTP",
        }),
        register() {
            this.loading = true;
            axios
                .post("auth/register", this.form)
                .then((res) => {
                    let response = res.data;
                    if (response.flag === "verify_otp") {
                        if (response.extra.status == true) {
                            this.storeOTP(response.extra);
                        }
                        this.$router.replace({
                            name: "Verify",
                        });
                    }
                    console.log(response);
                    this.loading = false;
                })
                .catch((e) => {
                    this.loading = false;
                    console.log(e);
                });
        },
    },
};
</script>
