<template>
  <v-app id="inspire">
    <top-nav></top-nav>
    <v-main class="grey lighten-3 my-auto pt-10">
      <v-container>
        <v-row class="primary main-header-div">
          <v-dialog v-model="logoutDialog" max-width="290">
            <v-card>
              <v-card-title class=""> Are you sure? </v-card-title>
              <v-card-text
                >You will be logged out from your account.</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="logout">
                  Logout
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-col cols="12">
            <div class="text-center">
              <v-avatar
                v-if="authenticated && user != null"
                size="100"
                class="avatar"
                color="white"
              >
                <div v-if="previewImage">
                  <img
                    @click="selectImage"
                    :style="{
                      'background-size': 'cover',
                      'background-image': `url(${previewImage})`,
                    }"
                  />
                </div>

                <img
                  v-else
                  @click="selectImage"
                  :style="{
                    'background-size': 'cover',
                    'background-image': `url(${
                      user.profile
                        ? env.mediaUrl + '/profiles/' + user.profile
                        : 'https://resources.premierleague.com/premierleague/badges/70/t' +
                          user.fav_team +
                          '.png'
                    })`,
                  }"
                />

                <input
                  style="display: none"
                  ref="fileInput"
                  type="file"
                  @input="pickFile"
                />
              </v-avatar>
              <v-avatar v-else size="100" class="avatar" color="white">
                <img
                  :style="{
                    'background-size': 'contain',
                    'background-position': 'center',
                    'background-image': `url(${require('../assets/logo.jpg')})`,
                  }"
                  alt=""
                />
              </v-avatar>
              <div class="mt-10">
                <template v-if="authenticated && user != null">
                  <h3 class="profile-name">
                    {{ user.name }}
                  </h3>
                  <p class="mb-0 profile-detail">
                    {{ fav_team_name }} | {{ user.phone }}
                  </p>
                  <p class="mb-0 profile-detail">
                    {{ user.region }}
                  </p>
                </template>
                <v-btn v-if="authenticated" class="primary edit-profile-btn"
                  >Edit Profile</v-btn
                >
                <v-btn v-else to="/login" class="primary edit-profile-btn"
                  >Login Account</v-btn
                >
              </div>
            </div>
            <v-list color="mt-5 rounded" flat>
              <v-list-item-group>
                <v-list-item @click="showDataDialog('terms')">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon class="mr-3">mdi-clipboard-text</v-icon>
                      <span class="list-text">Terms & Conditions</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="showDataDialog('faq')">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon class="mr-3">mdi-help</v-icon>
                      <span class="list-text">Frequently Asked Question</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="showDataDialog('feedback')">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon class="mr-3">mdi-star</v-icon>
                      <span class="list-text">Give Us Feedbacks</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="showDataDialog('contact')">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon class="mr-3">mdi-phone-in-talk</v-icon>
                      <span class="list-text">Contact Us</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="logoutDialog = true" v-if="authenticated">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon class="mr-3">mdi-exit-to-app</v-icon>
                      <span class="list-text">Logout</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
      <bottom-navigation></bottom-navigation>
    </v-main>
  </v-app>
</template>
<script>
import BottomNavigation from "../components/BottomNavigation.vue";
import TopNav from "../components/TopNav.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import env from "../env";
export default {
  components: { TopNav, BottomNavigation },
  data: () => ({
    env,
    logoutDialog: false,
    fav_team_name: "",
    previewImage: null,
    avatar: null,
    dialogTitle: "",
    dialogBody: "",
    dialogList: null,
    dialogLink: null,
    dialogLinkText: "",
  }),
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
      teams: "teams/teams",
    }),
  },
  methods: {
    ...mapActions({
      logoutAction: "auth/Logout",
      showSnackbarAction: "alert/showSnackbarAction",
      showDialogAction: "alert/showDialogAction",
      storeUser: "auth/storeUser",
    }),
    logout() {
      this.logoutAction().then(() => {
        (this.logoutDialog = false),
          this.showSnackbarAction({
            show: true,
            color: "red accent-2",
            message: "Successfully Logout",
          });
        this.$router
          .replace({
            name: "Setting",
          })
          .catch(() => {});
      });
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);

        let frm = new FormData();
        frm.append("profile", file[0]);
        axios
          .post("profile", frm)
          .then((res) => {
            this.previewImage = null;
            this.avatar = env.mediaUrl + "/profiles/" + this.user.profile;
            this.storeUser(res.data.extra);
            this.showSnackbarAction({
              show: true,
              message: "Profile picture updated.",
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    showDataDialog(data) {
      switch (data) {
        case "terms":
          this.dialogTitle = "Terms and Conditions";
          this.dialogBody = "အမှတ်ပေးစည်းမျဉ်း";
          this.dialogList = [
            "❖ အရှုံး၊ အနိုင်၊ သရေ ရလဒ် မှန်အောင်ခန့်မှန်းနိုင်ပါက တစ်ပွဲလျှင် ၃ မှတ်",
            "❖ အသင်းတစ်သင်းအတွက် ဂိုးရလဒ်မှန်အောင်ခန့်မှန်းနိုင်ပါက တစ်သင်းလျှင် ၁ မှတ်",
            "❖ ဂိုးကွာခြားချက်မှန်ကန်ပါက ၁ မှတ်",
            "❖ 2x booster ရွေးထားတဲ့ပွဲရဲ့ ရလဒ်အတွက် ရမှတ် x 2ဆ",
            "❖ ရမှတ်တူရှိရင် မဲနှိုက်ရွေးချယ်ပေးသွားပါမယ်",
          ];
          this.dialogLink = null;
          this.dialogLinkText = "";
          break;
        case "faq":
          this.dialogTitle = "Frequently Asked Questions";
          this.dialogList = [
            `❖ Burmese Fantasy Football (BFF) ဆိုတာဘာလဲ။ ဘောလုံးပွဲခန့်မှန်းရတာ၊ Fantasy Football ဂိမ်းတွေဆော့ရတာနှစ်ခြိုက်တဲ့ ဘောလုံးဖန်တွေအတွက် ပြိုင်ပွဲတွေဝင်ရောက်ယှဉ်ပြိုင်ပြီး ဆုလက်ဆောင်တွေရယူနိုင်မယ့် App ပဲ ဖြစ်ပါတယ်။`,
            `❖ ဝင်ကြေးရှိလား။ ဝင်ကြေး အခမဲ့ပါ။`,
            `❖ ဆုကြေးကဘယ်လိုလဲ။ အပတ်စဉ်တိုင်းမှာ အမှတ်အများဆုံးသူက "တစ်သောင်းကျပ်" ရရှိမှာဖြစ်ပါတယ်။`,
          ];
          this.dialogBody = "";
          this.dialogLink = null;
          this.dialogLinkText = "";
          break;
        case "contact":
          this.dialogTitle = "Contact Us";
          this.dialogBody = "(+95) 9972709001 သို့ ဆက်သွယ်နိုင်ပါသည်။.";
          this.dialogList = null;
          this.dialogLink = null;
          this.dialogLinkText = "";
          break;
        case "feedback":
          this.dialogTitle = "Give Us Feedbacks";
          this.dialogBody =
            "Burmese Fantasy Football ၏ Facebook Messenger တွင် Feedback ပေးနိုင်ပါသည်။";
          this.dialogList = null;
          this.dialogLink = "https://m.me/BurmeseFantasyFootball";
          this.dialogLinkText = "BFF Messenger";
          break;
        default:
          break;
      }
      this.showDialogAction({
        title: this.dialogTitle,
        body: this.dialogBody,
        list: this.dialogList,
        link: this.dialogLink,
        linkText: this.dialogLinkText,
      });
    },
  },
  async mounted() {
    this.$ga.page("/setting");
    if (this.authenticated) {
      this.avatar = env.mediaUrl + "/profiles/" + this.user?.profile;
      if (this.teams) {
        this.fav_team_name = this.teams.find(
          (x) => x.code == this.user?.fav_team
        ).name;
      }
    }
  },
};
</script>

<style scoped>
.main-header-div {
  max-height: 100px;
  border-radius: 0 0 20px 20px;
}

.avatar {
  display: absolute;
  border-radius: 100% !important;
  outline: 2px solid #fff;
  border: 3px solid #4c2fe3;
  top: 30px;
}

.profile-detail {
  font-size: 13px;
}

.edit-profile-btn {
  margin-top: 10px;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: capitalize;
}

.list-text {
  font-size: 15px;
  letter-spacing: 0.2px;
}
</style>
