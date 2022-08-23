<template>
  <div>
    <div class="row justify-between q-pa-md" style="width: 100%">
      <div class="col-12 row justify-between">
        <parameter style="float: left"
          v-for="(parameter, index) in settings" :value="parameter" :key="parameter.name"
          @change-parameter="addParameter" @search="addParameter" :class="index + 1 == settings.length ? 'col-9' : 'col-12'"/>
        <div class="col-3 flex flex-center">
          <q-btn icon="remove" color="negative" round @click="removeWidget" style="transform: translateX(10px)"/>
        </div>
      </div>
    </div>
    <div v-if="show" style="width: 100%" class="row justify-center">
      <q-btn color="" type="a" href="https://unsplash.com/oauth/authorize?client_id=7AitDXHPp3hTmqQIUoO7o7tFZzimV8xUKgofk9SzKL0&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fsuccess-unsplash%2F&response_type=code&scope=public" label="Login To Unsplash Service" class="q-ma-md col-9"/>
      <q-btn color="" type="a" href="http://localhost:8080/login-spotify" label="Login To Spotify Service" class="q-ma-md col-9"/>
    </div>
    <div v-else-if="data && !loading">
      <q-toolbar class="q-pt-md">
        <q-toolbar-title class="flex flex-start">
        </q-toolbar-title>
      </q-toolbar>
      <div v-if="!show" v-html="data" class="q-ma-md text-white"/>
    </div>
    <q-spinner v-else size="50%" class="q-pa-md" color="primary"/>
  </div>
</template>

<script>
import {ref} from "vue";
import {Cookies} from "quasar";
import EventBus from "app/eventBus";
import Parameter from "components/Parameter";

export default {
  name: "WidgetData",
  props: {
    routeName: {
      type: String,
      required: true
    },
    refreshRate: {
      type: Number,
      required: true
    },
    id: String,
    parameters: Array,
  },

  components: {
    Parameter
  },

  methods: {
    blockBottomBar() {
      EventBus.$emit('blockDefaultBehavior');
      return 0;
    },
    getWidgetData() {
      const optionsLength = Object.keys(this.options).length;
      const settingsLength = this.settings.length;
      //? no override and all wanted element are presents
      if (this.pass || optionsLength !== settingsLength)
        return;
      console.log('this.options', this.options)
      this.pass = true;
      this.$api.get(`/api/widget/${this.routeName}/update/`, {
        headers: {
          "x-access-token": this.$q.cookies.get('token'),
          "spotify-access-token": this.$q.cookies.get('spotify_access_token'),
          "content-type": "application/json"
        },
        params: {
          options: this.options,
          id: this.id,
        },
      }).catch(err => {
        this.show = true;
        console.error(err);
      }).then((res) => {
        this.pass = false;
        if (!res) {
          console.log('null response');
          return;
        }
        //window.location.href = 'http://localhost:3000/login-spotify';
        if (res.status !== 200 || !res.data.data)
          return;
        this.data = res.data.data;
        // iframe on spotify widgets
        this.data = this.data.replace("250", (this.$q.screen.width / 4 - 30).toString());
      })
    },
    addParameter(parameter) {
      console.log(parameter)
      this.options[parameter.name] = parameter.value ?? "";
      this.getWidgetData();
    },
    removeWidget() {
      console.log(this.id);
      EventBus.$emit('removeWidget', this.id);
      this.blockBottomBar();
    }
  },

  mounted() {
    //this.getWidgetData();
    this.update = setInterval(() => {
      this.getWidgetData();
    }, this.refreshRate);
    setTimeout(() => {
      this.loading = false
    }, 500);
    EventBus.$on('change-refresh-rate', (newRefreshRateObject) => {
      const {id, refreshRate} = newRefreshRateObject;
      if (this.id !== id)
          return;
      clearInterval(this.update);
      this.update = setInterval(() => {
        this.getWidgetData();
      }, refreshRate);
    });
  },

  computed: {
    settings() {
      let possible_value = {label: "", value: ""}
      let parameter = {
        name: "",
        possible_values: [possible_value]
      };
      let parameters = [];

      this.parameters.forEach((p) => {
        if (p.param.required) {
          parameters.push({
            name: p.param.name,
            possible_values: p.possible_values.map(pv => {
              return {label: pv.name, value: pv.value}
            }),
          })
        }
      });
      return parameters;
    },
  },

  beforeUnmount() {
    clearInterval(this.update);
  },

  setup(props) {
    const data = ref("")
    const update = ref(null);
    const loading = ref(true);
    const options = ref({});
    const show = ref(false);
    const pass = ref(false);

    return {
      data,
      update,
      loading,
      options,
      show,
      pass
    }
  }
}
</script>
<style>
.q-field--standout.q-field--highlighted .q-field__native {
  color: #0D1B2A;
}
</style>
