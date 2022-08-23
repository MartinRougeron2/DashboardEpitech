<template>
      <q-card class="login_card bg-primary q-pa-lg">
        <q-card-section class="text-left">
          <p class="header_login_title text-left">
            Welcome to <br/>
            <span class="text-weight-bolder">your dashboard</span>
          </p>
        </q-card-section>

        <q-tabs
          v-model="tab"
          class=""
          indicator-color="secondary text-secondary"
        >
          <q-tab label="Signup" class="to-signup" name="signup"/>
          <q-tab label="Signin" class="to-signin" name="signin"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" animated class="bg-primary text-center">
          <q-tab-panel name="signup" class="login_card_body">
            <q-card-section>
              <q-input
                class="q-mb-md emailRef"
                ref="emailRef"
                filled
                type="email"
                v-model="email"
                label="Email"
                bebounce="1000"
                lazy-rules
                :rules="emailRules"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" class="q-pr-sm"/>
                  <q-separator vertical inset spaced="sm"/>
                </template>
              </q-input>

              <q-input
                class="q-mb-md usernameRef"
                ref="usernameRef"
                filled
                v-model="username"
                label="Username"
                lazy-rules
                :rules="nameRules"
              >
                <template v-slot:prepend>
                  <q-icon name="person" class="q-pr-sm"/>
                  <q-separator vertical inset spaced="sm"/>
                </template>
              </q-input>

              <q-input
                class="q-mb-sm passwordRef"
                ref="passwordRef"
                v-model="password"
                filled
                :type="isPwd ? 'password' : 'text'"
                label="Password"
                lazy-rules
                :rules="passwordRules"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" class="q-pr-sm"/>
                  <q-separator vertical inset spaced="sm"/>
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-btn
                class="login_submit text-weight-bold q-pa-sm"
                label="Create Account"
                @click="onSubmit"
              />
            </q-card-section>
          </q-tab-panel>

          <q-tab-panel name="signin">
            <q-card-section class="login_card_body">
              <q-input
                class="q-mb-md usernameRef"
                ref="usernameRef"
                filled
                v-model="username"
                label="Username"
                lazy-rules
                :rules="nameRules"
              >
                <template v-slot:prepend>
                  <q-icon name="person" class="q-pr-sm"/>
                  <q-separator vertical inset spaced="sm"/>
                </template>
              </q-input>

              <q-input
                class="q-mb-sm passwordRef"
                ref="passwordRef"
                v-model="password"
                filled
                :type="isPwd ? 'password' : 'text'"
                label="Password"
                lazy-rules
                :rules="passwordRules"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" class="q-pr-sm"/>
                  <q-separator vertical inset spaced="sm"/>
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-btn class="login_submit text-weight-bold q-pa-sm" label="Login" @click="onSubmit"/>
            </q-card-section>
          </q-tab-panel>
        </q-tab-panels>
        <q-card-section class="text-center">
          <q-btn @click="loginWithGoogle" color="white" rounded class="sign-with-google">
            <img alt="google's logo" src="../assets/logo-google-g.png" style="max-width: 70px; transform: translateX(-10px)"/>
            <p class="row items-center full-height q-pt-md text-black" style="transform: translateX(-10px)">
              Continue with Google
            </p>
          </q-btn>
        </q-card-section>
      </q-card>
</template>


<script>
import {defineComponent, ref} from "vue";
import EventBus from "app/eventBus";

// Button to login
export default defineComponent({
  name: "loginCard",

  methods: {
    auth(req) {
      if (typeof req === undefined)
        return;

      this.$q.loading.hide();
      if (req == null) {
        this.$q.notify({
          type: "warning",
          message: "Login failed",
        });
        return;
      }

      if (req.status !== 200) {
        this.$q.notify({
          type: "Error",
          message: "Error type " + req.status,
        });
        return;
      }

      EventBus.$emit('displayLoginForm', false);
      console.log()
      this.$emit('login', req.data);

      console.log(req.data);


      this.username = "";
      this.password = "";
      this.email = "";

      this.$q.cookies.set("token", req.data.token, {
        expires: 7,
        secure: true,
      });

      this.$q.notify({
        icon: "done",
        color: "positive",
        message: "Connected !",
      });
    },
    loginWithGoogle() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          this.$q.loading.show();
          this.$api
            .post("/api/auth/signWithGoogle", {
              token: GoogleUser.getId(),
              email: GoogleUser.getBasicProfile().getEmail(),
              idToken: GoogleUser.getAuthResponse().id_token,
            }).then((req) => this.auth(req))
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    onSubmit() {
      if (this.tab === "signup") {
        this.postAuth(
          [this.emailRef, this.usernameRef, this.passwordRef],
          {
            username: this.username,
            email: this.email,
            password: this.password,
          }, "api/auth/signup")
      } else {
        this.postAuth(
          [this.usernameRef, this.passwordRef],
          {
            username: this.username,
            password: this.password,
          }, "/api/auth/signin")
      }
    },
    postAuth(refs, data, uri) {
      console.log(data);
      refs.forEach(a => a.resetValidation());
      refs.forEach(a => a.validate());

      if (refs.map(a => a.hasError).indexOf(true) >= 0) {
        console.log("error in form")
        return 1;
      }
      this.$q.loading.show();
      this.$api
        .post(uri, data)
        .catch((err) => {
          this.$q.loading.hide();
          console.error(err);
        })
        .then((req) => this.auth(req));
    }
  },

  mounted() {
    if (!this.clientId) {
      throw new Error("Client Id must be specified.");
    }
  },

  setup() {
    let displayLoginForm = ref(true);

    let username = ref("");
    const usernameRef = ref(null);

    let password = ref("");
    const passwordRef = ref(null);
    let isPwd = ref(true);

    let email = ref("");
    const emailRef = ref(null);
    const tab = ref("signup");

    const clientId = "683963277714-6vtq1cc7lc944gnckjd997dobgkvfcor";

    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
      let regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
      return regExp.test(password);
    }

    return {
      displayLoginForm,
      username,
      password,
      email,
      isPwd,
      usernameRef,
      passwordRef,
      emailRef,
      clientId,
      tab,

      nameRules: [(val) => (val && val.length > 0) || "Please type something"],

      passwordRules: [
        (val) =>
          (val && val.length > 8) || "Password must be at least 8 characters",
        (val) =>
          (val && val.length > 0) || "Please type something",
        (val) =>
          (val && validatePassword(val)) || "Password is not strong enough",
      ],

      emailRules: [
        (val) =>
          (val && val.length > 0) || "Please type something",
        (val) =>
          (val && validateEmail(val)) || "bad Email",
      ],
    };
  },
});
</script>

<style scoped lang="scss">
.test {
  vertical-align: bottom;
}

.login_card {
  color: $secondary;
}

.login_card_body {
  padding-top: 5px;
  padding-bottom: 5px;
}

.header_login_title {
  font: $title_font;
  font-size: 60px;
  line-height: 90%;
}

.header_login_subtitle {
  font: $accent;
  font-size: 16px;
  margin-bottom: -7px;
}

.login_submit {
  width: 80%;
  border-radius: 25px;
  background-color: $secondary;
  color: $primary;
}
</style>
