<template>
    <v-app id="inspire">
        <v-main class="grey lighten-3 my-auto">
            <v-app-bar elevation="0" color="#eeeeee">
                <v-btn icon @click="$router.go(-1)">
                    <v-icon>mdi-arrow-left-thin</v-icon>
                </v-btn>
            </v-app-bar>
            <v-container fill-height fluid>
                <v-row align="center" justify="center" class="">
                    <v-col cols="12">
                        <h3>Login</h3>
                        <v-form>
                            <div class="mt-5">
                                <v-text-field
                                    label="Phone Number"
                                    outlined
                                    v-model="phone"
                                ></v-text-field>
                                <v-text-field
                                    label="Password"
                                    outlined
                                    v-model="password"
                                ></v-text-field>
                                <v-btn class="mr-2" color="primary">
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
export default {
    components: {},
    data: () => ({
        form: {
            phone: "",
            password: "",
        },
    }),
    methods: {
        login() {},
    },
};
</script>
