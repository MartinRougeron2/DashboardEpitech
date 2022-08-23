<template>
  <q-scroll-area
    class="on-left q-mb-md borderArea"
    style="height: 210px"
  >
    <div class="row no-wrap">
        <Widget v-for="item in widgets" :service="item.service" :key="item._id" :widget="item"
                class="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-5" preview/>
    </div>
  </q-scroll-area>
</template>

<script>
import {defineComponent, ref} from "vue";
import Widget from "../components/WidgetCard";
import {Cookies} from "quasar";

export default defineComponent({
  name: "WidgetArea",

  data() {
    return {};
  },

  mounted() {
    this.getAllWidgets();
  },

  methods: {
    getAllWidgets() {
      this.$api.get('/api/services', {
        headers: {
          "x-access-token": this.$q.cookies.get('token'),
          "content-type": "application/json"
        }
      }).then((res) => {
        if (!res)
          return;
        if (res.status !== 200)
          return;
        res.data.services.forEach(s => {
          s.widgets.forEach(w => {
            w.service = s;
            this.widgets.push(w);
          })
        })
      })
    }
  },

  components: {
    Widget,
  },

  setup() {
    const widgets = ref([]);

    return {
      widgets
    }
  },
});
</script>

<style>

.borderArea {
  height: 22vh;
  width: 100%;
}

</style>
