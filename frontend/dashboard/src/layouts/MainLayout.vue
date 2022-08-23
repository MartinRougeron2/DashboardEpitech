<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-grey-9">
      <q-toolbar>
        <q-toolbar-title class="text-bold text-h5">
          <q-avatar class="q-pr-xl">
            <img src="icons/dashboard_icon_transparent.png" alt="Icon" class="cursor-pointer"/>
          </q-avatar>
            The 5 senses
        </q-toolbar-title>
        <div id="login-button" v-if="username.length">
          <q-btn-dropdown :label="username" flat icon="person">
            <q-list>
              <q-item clickable v-close-popup @click="logout" class="bg-primary">
                <q-item-section avatar>
                  <q-avatar icon="logout" color="negative" text-color="white" />
                </q-item-section>
                <q-item-section class="text-basic">
                  Logout
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <q-btn id="login-email" v-else icon="person" label="Login" flat @click="displayLoginForm"/>
      </q-toolbar>
    </q-header>

    <q-page-container @click="hideBar">
      <router-view/>
    </q-page-container>

    <transition name="slide-fade">
      <q-footer elevated class="bg-primary text-white" v-model="selectWidgets" v-if="username.length">
        <q-toolbar>
          <WidgetArea />
        </q-toolbar>
      </q-footer>
    </transition>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from "vue";
import EventBus from "app/eventBus";
import {Cookies} from "quasar";
import WidgetArea from '../components/WidgetArea'

export default defineComponent({
  name: 'MainLayout',

  components: {
    WidgetArea
  },

  methods: {
    logout() {
      this.username = "";
      this.$q.cookies.remove('token');
      this.$q.notify({
        type: 'positive',
        message: 'Logout successfully !',
        icon: 'logout'
      });
      window.location.reload();
    },
    hideBar() {
      if (!this.selectWidgetsByGoogle)
        this.selectWidgets = false;
    }
  },

  mounted() {
    EventBus.$on('username', (val) => {
      this.username = val;
    })
    EventBus.$on('selectWidgets', (val) => {
      this.selectWidgets = val;
      this.selectWidgetsByGoogle = true;
      setTimeout(() => {this.selectWidgetsByGoogle = false}, 500);
    })
    EventBus.$on('blockDefaultBehavior', () => {
      this.selectWidgetsByGoogle = true;
      setTimeout(() => {this.selectWidgetsByGoogle = false}, 500);
    })
  },

  setup() {
    const username = ref('');
    const selectWidgets = ref(false);
    const selectWidgetsByGoogle = ref(false);

    return {
      username,
      selectWidgets,
      selectWidgetsByGoogle,
      displayLoginForm() {
        EventBus.$emit('displayLoginForm', true);
      }
    }
  }
})
</script>

<style>

.slide-fade-enter-active {
  transition: all .5s ease-out;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(60px);
}

.text-basic {
  color: #424242;
  font-weight: 500;
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0;  /* Remove scrollbar space */
  background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #FF0000;
}
</style>
