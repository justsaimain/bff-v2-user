<template>
    <v-app id="inspire">
        <v-main class="grey lighten-3 my-auto">
            <v-container fill-height fluid>
                <v-row align="center" justify="center" class="">
                    <v-col cols="12">
                        <h3>Verify Phone Number</h3>
                        <v-alert class="mt-5" outlined type="success" text>
                            A verification code has been sent to your phone.
                        </v-alert>
                        <div class="mt-5">
                            <v-otp-input
                                v-model="otp"
                                length="6"
                                type="number"
                                @finish="onFinish"
                            ></v-otp-input>
                            <v-btn class="mr-2" color="primary"> Verify </v-btn>
                            <span v-if="timerCount > 0">
                                Resend OTP in {{ timerCount }} s
                            </span>
                            <v-btn v-else plain>Resend OTP</v-btn>
                        </div>
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
        timerCount: 60,
        otp: "",
        expectedOtp: "000000",
    }),
    methods: {
        onFinish(rsp) {
            console.log(rsp);
        },
    },
    watch: {
        timerCount: {
            handler(value) {
                if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                }
            },
            immediate: true, // This ensures the watcher is triggered upon creation
        },
    },
};
</script>
