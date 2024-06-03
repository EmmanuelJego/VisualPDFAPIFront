import { usePlausible } from 'v-plausible/vue';
import { boot } from 'quasar/wrappers';

// const plausible = createPlausible({
//   init: {
//     domain: 'dev.visualpdf.com',
//     apiHost: 'https://analytics.visualpdf.com',
//     trackLocalhost: false,
//   },
// });

export default boot(({ app }) => {
  // app.use(plausible);
});
