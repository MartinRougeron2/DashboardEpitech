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
    this.$q.cookies.set('unsplash_code' , this.$route.query.code);
    console.log(this.$q.cookies.get('unsplash_code'));
    this.$router.push({path: '/'});
  }
})
</script>

<style scoped>

</style>
