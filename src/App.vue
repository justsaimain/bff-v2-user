<template>
    <v-app id="inspire">
        <router-view />
    </v-app>
</template>

<script>
export default {
    name: "App",
    data: () => ({}),
};
</script>

<style>
.small-page-title {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.2px;
}
</style>
