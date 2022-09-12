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
            <h3>Forget Password</h3>
            <v-form v-if="!getOTP" ref="form">
              <div class="mt-5">
                <v-text-field
                  label="Phone Number"
                  outlined
                  :rules="phoneRules"
                  v-model="form.phone"
                ></v-text-field>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  class="mr-2"
                  @click="getCode"
                >
                  Get Code
                </v-btn>
                <v-btn to="/login" plain> Login Account </v-btn>
              </div>
            </v-form>
            <v-form v-else ref="form">
              <div class="mt-5">
                <v-text-field
                  label="Verification Code"
                  outlined
                  :rules="otpRules"
                  v-model="form.code"
                ></v-text-field>
                <v-text-field
                  label="New Password"
                  outlined
                  :rules="passwordRules"
                  v-model="form.password"
                ></v-text-field>
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  class="mr-2"
                  @click="changePassword"
                >
                  Change Password
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
  data: () => ({
    loading: false,
    valid: true,
    form: {
      code: "",
      phone: "",
      password: "",
    },
    getOTP: false,
    phoneRules: [(v) => !!v || "Phone is required"],
    passwordRules: [(v) => !!v || "Password is required"],
    otpRules: [(v) => !!v || "OTP Code is required"],
  }),
  methods: {
    ...mapActions({
      attemptLogin: "auth/attemptLogin",
      showSnackbarAction: "alert/showSnackbarAction",
    }),
    async changePassword() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        axios
          .post("auth/forget-verify", this.form)
          .then((res) => {
            let response = res.data;
            if (response.success == true) {
              this.showSnackbarAction({
                show: true,
                message: response.message,
              });

              this.loading = false;

              setTimeout(() => {
                window.location.href = "/";
              }, 500);
            } else {
              this.showSnackbarAction({
                show: true,
                message: response.message,
              });
              this.loading = false;
            }
          })
          .catch((e) => {
            console.log(e);
            this.loading = false;
          });
      }
    },
    async getCode() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        axios
          .post("auth/forget-password", this.form)
          .then((res) => {
            let response = res.data;
            if (response.success == true) {
              this.showSnackbarAction({
                show: true,
                message: "OTP Send",
              });

              this.getOTP = true;
              this.loading = false;
            } else {
              if (response.flag == "already_exist") {
                this.getOTP = true;
              }

              this.showSnackbarAction({
                show: true,
                message: response.message,
              });
              this.loading = false;
            }
          })
          .catch((e) => {
            console.log(e);
            this.loading = false;
          });
      }
    },
  },
  mounted() {
    this.$ga.page("/forget-password");
  },
};
</script>
