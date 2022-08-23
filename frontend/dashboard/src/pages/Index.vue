<template>
  <q-page class="flex flex-center">
    <div class="row justify-center items-start q-pa-md" style="width: 100vw; overflow-y: hidden;">

      <transition-group name="insert"
                        tag="p" class="col-12 row justify-evenly items-start q-pa-md" mode="">

        <Widget v-for="(item, index) in widgets" :service="item.service" :key="index" :widget="item"
                class="col-xl-5 col-lg-3 col-md-3 col-sm-3 col-xs-5"/>

      </transition-group>

      <q-btn class="col-12 shadow-2 q-pa-md flex flex-center"
             style="height: 200px; width: 200px; border-radius: 25px" @click="showBottomBar" color="primary">
        <q-icon name="add" size="150px" color="white"/>
      </q-btn>

      <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="needToBeLogged" no-shake persistent seamless>
          <loginCard @login="sendUsernameToLayout"/>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue';
import EventBus from "app/eventBus";
import LoginCard from "components/LoginCard";
import Widget from "components/WidgetCard";
import {Cookies} from "quasar";

export default defineComponent({
  name: 'pageIndex',

  components: {
    LoginCard,
    Widget
  },

  methods: {
    loginAuto() {
      console.log(this)
      this.$api.post("/api/auth/refreshToken", {}, {
          headers: {
            "x-access-token": this.$q.cookies.get('token'),
            "content-type": "application/json"
          }
        }
      ).catch((err) => {
        console.error(err);
        this.needToBeLogged = true;
      }).then((res) => {
        if (!res) {
          this.needToBeLogged = true;
          return
        }
        if (res.status !== 200) {
          this.needToBeLogged = true;
          return;
        }
        this.sendUsernameToLayout(res.data);
      });
    },
    widgetAdd(widget, service) {
      return this.$api.post("/api/widget/add/", {widget: widget, id: this.id}, {
          headers: {
            "x-access-token": this.$q.cookies.get('token'),
            "content-type": "application/json"
          }
        }
      ).catch((err) => {
        console.error(err);
      }).then((res) => {
        if (!res)
          return
        let widget = res.data.widget;
        widget.service = service;
        console.log('widget', widget);
        this.widgets.push(widget);
      });
    },
    removeWidget(widget) {
      this.$api.post("/api/widget/remove/", {widget: widget, id: this.id}, {
          headers: {
            "x-access-token": this.$q.cookies.get('token'),
            "content-type": "application/json"
          }
        }
      ).catch((err) => {
        console.error(err);
      }).then((res) => {});
    },
    sendUsernameToLayout(info) {
      console.log(info)
      EventBus.$emit('username', info.name);

      this.id = info.id;
      this.needToBeLogged = false;

      info.widgets.forEach(wp => {
        wp.widget._id = wp._id;
        wp.widget.service = wp.service;
      });
      console.log(info)
      this.widgets = info.widgets.map(wp => wp.widget);
    },
    showBottomBar() {
      EventBus.$emit('selectWidgets', true);
    }
  },

  setup() {
    const displayLoginForm = ref(true);
    const needToBeLogged = ref(false);
    const widgets = ref([]);
    const id = ref('')

    return {
      displayLoginForm,
      needToBeLogged,
      widgets,
      id
    }
  },

  mounted() {
    EventBus.$on("displayLoginForm", (val) => {
      this.needToBeLogged = val;
    });
    EventBus.$on("addWidget", async (widgetToAdd) => {
      console.log("widgetssss", widgetToAdd);
      const service = widgetToAdd.service;
      widgetToAdd.service.widgets = [];
      this.widgetAdd(widgetToAdd, service)
    });
    EventBus.$on("removeWidget", (val) => {
      this.widgets = this.widgets.filter(el => el._id !== val);
      this.removeWidget(val);
    });

    this.loginAuto();
  }
})
</script>
<style scoped lang="scss">
.q-btn:before {
  box-shadow: none;
}

.insert {
  &-enter, &-leave-to {
    opacity: 0;
  }

  &-move {
    transition: all .5s ease-in-out;
  }
}

</style>
