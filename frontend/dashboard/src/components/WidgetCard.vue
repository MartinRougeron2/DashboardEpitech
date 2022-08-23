<template>
  <div :class="(preview ? 'widgetCard' : 'widget' )+ ' shadow-3 q-ma-md bg-grey-1'" @mouseenter="addMode = true"
       @mouseleave="addMode = false">

    <div class="row justify-between"
         :style="'border-top-right-radius: 15px; border-top-left-radius: 15px; border-bottom-right-radius: 15px; background-color: ' + widget.primaryColor + '; color: ' + service.textColor">
      <div class="q-pa-xs q-pt-lg q-pl-lg text-weight-bold text-h5 col-8" :style="'color: ' + service.textColor">
        {{ service.name }}
        <div class="float-right" v-if="!preview">
          <q-btn flat @click="changeRefreshRate = true">
            <p class="text-h4">
              ...
            </p>
          </q-btn>
        </div>
        <div class="text-black text-bold col-12 q-pl-md" style="font-size: 17px">
          {{ widget.verboseName }}
        </div>
      </div>

      <div class="col-3 row justify-end" style="border-top-right-radius: 15px">
        <q-img ratio="1" :src="service.logoPath" style="border-top-right-radius: 15px" height="100%"
               width="100%"></q-img>
      </div>
    </div>

    <div class="flex flex-center"
         style="border-bottom-left-radius: 15px; border-bottom-right-radius: 15px; background-color: #0D1B2A">
      <!-- e887 -->
      <q-img :src="widget.coverImagePath"
             style="height: 100px; border-bottom-left-radius: 15px ;border-bottom-right-radius: 15px" v-if="preview"/>
      <div v-else>
        <WidgetData :route-name="widget.name" :refresh-rate="widget.refreshTime" :id="widget._id"
                    :parameters="widget.params"/>
      </div>
    </div>

    <q-btn v-show="addMode && preview" class="hoverButtonAdd" @click="addWidgets">
      <q-icon name="add" size="80px"/>
      <q-tooltip
        anchor="top middle"
        self="bottom middle"
        style="max-width: 20vh; font-size: 15px"
      >
        {{ widget.description.charAt(0).toUpperCase() + widget.description.slice(1) }}
      </q-tooltip>
    </q-btn>
    <q-inner-loading v-show="loading">
      <q-spinner>

      </q-spinner>
    </q-inner-loading>
    <q-dialog v-model="changeRefreshRate">
      <q-card>
        <q-card-section>
          <q-input class="q-pa-xl" label="refresh rate" v-model="refreshRate" debounce="500"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn icon="done" color="positive" @click="changeRefreshRateF()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import EventBus from "app/eventBus";
import WidgetData from "./WidgetData"

export default defineComponent({
  name: "Widget",

  methods: {
    addWidgets() {
      EventBus.$emit("addWidget", this.widget);
    },
    changeRefreshRateF() {
      this.changeRefreshRate = false;
      EventBus.$emit('change-refresh-rate', {refreshRate: this.refreshRate, id: this.widget._id});
    }
  },

  components: {
    WidgetData
  },

  computed: {
    loading() {
      return (!this.widget.loaded);
    }
  },

  props: {
    widget: {
      Object,
      required: true,
    },
    service: {
      Object,
      required: false,
      default: {
        name: "Spotify",
        primaryColor: "#2fdc28",
        textColor: "#fdfdfd",
        logoPath: "https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg",
        coverImage: "https://i1.wp.com/www.ultimatepocket.com/wp-content/uploads/2020/10/spotify-developing-ios-14-widgets-in-latest-beta.jpg?fit=400%2C396&ssl=1"
      }
    },
    preview: Boolean
  },

  mounted() {
    this.refreshRate = this.widget.refreshTime;
  },

  setup(props) {
    const addMode = ref(false);
    const changeRefreshRate = ref(false);
    const refreshRate = ref("");

    return {
      addMode,
      changeRefreshRate,
      refreshRate
    }
  },
});
</script>

<style>
.widgetCard {
  border-radius: 15px;
  background-color: #ffff;
}

.widgetCard:hover {
  animation: shake 0.5s infinite;
}

.widget {
  border-radius: 15px;
  background-color: #ffff;
}

.hoverButtonAdd {
  border-radius: 15px;
  position: absolute;
  transform: translateY(-100%);
  height: 101%;
  width: 100%;
  background-color: rgba(91, 83, 83, 0.5)
}

@keyframes shake {
  0% {
    transform: translate(1px, 0px)
  }
  40% {
    transform: translate(0px, 1px)
  }
  80% {
    transform: translate(-1px, -1px)
  }
}
</style>
