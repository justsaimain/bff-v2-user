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
                        <h3>Login</h3>
                        <v-form @submit.prevent="login">
                            <div class="mt-5">
                                <v-text-field
                                    label="Phone Number"
                                    outlined
                                    v-model="form.phone"
                                ></v-text-field>
                                <v-text-field
                                    label="Password"
                                    outlined
                                    v-model="form.password"
                                ></v-text-field>
                                <v-btn
                                    type="submit"
                                    class="mr-2"
                                    color="primary"
                                >
                                    Login
                                </v-btn>
                                <v-btn to="/register" plain>
                                    Register account
                                </v-btn>
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
    components: {},
    data: () => ({
        loading: false,
        form: {
            phone: "",
            password: "",
        },
    }),
    methods: {
        ...mapActions({
            attemptLogin: "auth/attemptLogin",
        }),
        login() {
            this.loading = true;

            axios
                .post("auth/login", this.form)
                .then((res) => {
                    console.log(res);
                    let response = res.data;
                    if (response.success == true) {
                        this.attemptLogin(response.data.token);
                        this.$router.replace({ name: "Setting" });
                    }
                    this.loading = false;
                })
                .catch((e) => {
                    console.log(e);
                    this.loading = false;
                });
        },
    },
};
</script>
