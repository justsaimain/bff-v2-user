<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3 my-auto">
      <v-app-bar elevation="0" color="#eeeeee">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left-thin</v-icon>
        </v-btn>
      </v-app-bar>
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
      <v-snackbar v-model="showAlert" :timeout="5000">
        {{ alertMessage }}
      </v-snackbar>
      <v-container fill-height fluid>
        <v-row align="center" justify="center" class="">
          <v-col cols="12">
            <h3>Verify Phone Number</h3>
            <v-alert class="mt-5" outlined type="success" text>
              A verification code has been sent to your phone.
              {{ getNumber }}
            </v-alert>
            <div class="mt-5">
              <v-otp-input
                v-model="otp"
                length="6"
                type="number"
                @finish="onFinish"
              ></v-otp-input>
              <span v-if="timerCount > 0">
                Resend OTP in {{ timerCount }} s
              </span>
              <v-btn v-else color="primary" @click="resendOTP"
                >Resend OTP</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data: () => ({
    showAlert: false,
    alertMessage: "",
    loading: false,
    timerCount: 60,
    otp: "",
  }),
  computed: {
    ...mapGetters({
      getNumber: "auth/getNumber",
      getRequestID: "auth/getRequestID",
    }),
  },
  methods: {
    ...mapActions({
      storeOTP: "auth/storeOTP",
      attemptLogin: "auth/attemptLogin",
    }),
    onFinish(code) {
      this.loading = true;
      let request_id = this.getRequestID;
      let number = this.getNumber;
      axios
        .post("auth/verify", {
          code: code,
          request_id: request_id,
          number: number,
        })
        .then((res) => {
          console.log(res);
          let response = res.data;
          if (response.extra.status == true) {
            // success
            localStorage.setItem("token", response.data.token);
            this.attemptLogin(response.data.token);
            this.$router.replace({ name: "Setting" });
          } else {
            this.alertMessage = response.data.message;
            this.showAlert = true;
          }
          this.loading = false;
          this.otp = "";
        })
        .catch((e) => {
          this.loading = false;
          this.otp = "";
          console.log(e);
        });
    },
    resendOTP() {
      this.otp = "";
      let number = this.getNumber;
      this.loading = true;
      axios
        .post("auth/get-otp", {
          number: number,
        })
        .then((res) => {
          let response = res.data;
          if (response.flag === "resend_otp") {
            if (response.data.status == true) {
              this.storeOTP(response.data);
            } else {
              this.$router.replace({ name: "Register" });
            }
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
  mounted() {
    let number = this.getNumber;
    if (!number) {
      this.$router.replace({ name: "Register" });
    }
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
