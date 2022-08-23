import { boot } from 'quasar/wrappers'
import axios from 'axios'
import GAuth from 'vue3-google-oauth2'
import * as Sentry from "@sentry/vue"
import { Integrations } from "@sentry/tracing"

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:8080', timeout: 10_000 })



export default boot(({ app, router }) => {
  Sentry.init({
    app,
    dsn: "https://92aaed09106d46e098d48f1fa733264a@o1084397.ingest.sentry.io/6094181",
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost", "martinrougeron.me", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    trackComponents: true,
    hooks: ["create", "mount"],
  });
  app.use(router);
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const gAuthOptions = {
    clientId: '683963277714-6vtq1cc7lc944gnckjd997dobgkvfcor.apps.googleusercontent.com',
    scope: 'email', prompt: 'consent', fetch_basic_profile: false
  }

  app.use(GAuth, gAuthOptions)
  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
