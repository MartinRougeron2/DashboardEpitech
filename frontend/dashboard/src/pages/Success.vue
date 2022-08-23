<template>
  <div>
    redirect to app...
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {Cookies} from "quasar";

export default defineComponent({
  name: "SpotifySuccessPage",
  mounted() {
    this.$q.cookies.set('spotify_access_token' , this.$route.query.access_token);
    this.$q.cookies.set('spotify_refresh_token', this.$route.query.refresh_token);
    console.log(this.$q.cookies.get('spotify_access_token'));
    console.log(this.$q.cookies.get('spotify_refresh_token'));
    this.$router.push({path: '/'});
  }
})
</script>

<style scoped>

</style>
