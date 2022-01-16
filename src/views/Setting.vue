<template>
    <v-app id="inspire">
        <top-nav></top-nav>
        <v-main class="grey lighten-3 my-auto pt-10">
            <v-container>
                <v-row class="primary main-header-div">
                    <v-col cols="12">
                        <div class="text-center">
                            <v-avatar size="100" class="avatar">
                                <img
                                    src="https://randomuser.me/api/portraits/men/99.jpg"
                                    alt=""
                                />
                            </v-avatar>
                            <div class="mt-10">
                                <h3 class="profile-name">Aung Thu Hein</h3>
                                <p class="mb-0 profile-detail">
                                    Man Utd | 0997893487
                                </p>
                                <p class="mb-0 profile-detail">Yangon</p>
                                <!-- <v-btn class="primary edit-profile-btn" small
                                    >Edit Profile</v-btn
                                > -->
                                <v-btn
                                    to="/login"
                                    class="primary edit-profile-btn"
                                    small
                                    >Login</v-btn
                                >
                            </div>
                        </div>
                        <v-list color="mt-5 rounded" flat>
                            <v-list-item-group>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-icon class="mr-3"
                                                >mdi-clipboard-text</v-icon
                                            >
                                            <span class="list-text"
                                                >Terms & Conditions</span
                                            >
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-icon class="mr-3"
                                                >mdi-help</v-icon
                                            >
                                            <span class="list-text"
                                                >Frequently Asked Question</span
                                            >
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-icon class="mr-3"
                                                >mdi-star</v-icon
                                            >
                                            <span class="list-text"
                                                >Give Us Feedbacks</span
                                            >
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-icon class="mr-3"
                                                >mdi-phone-in-talk</v-icon
                                            >
                                            <span class="list-text"
                                                >Contact Us</span
                                            >
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-icon class="mr-3"
                                                >mdi-exit-to-app</v-icon
                                            >
                                            <span class="list-text"
                                                >Logout</span
                                            >
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
export default {
    components: { TopNav, BottomNavigation },
    data: () => ({
        model: 1,
    }),
};
</script>

<style scoped>
.main-header-div {
    max-height: 100px;
    border-radius: 0 0 20px 20px;
}

.avatar {
    display: absolute;
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