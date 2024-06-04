import { boot } from 'quasar/wrappers';
import { api } from './axios';

const plausibleURL = 'https://analytics.visualpdf.com/api/event';
const domain = 'dev.visualpdf.com';

export default boot(({ app, router }) => {
  app.config.globalProperties.$plausible = {
    event: (name, props) => {
      const url = router.currentRoute.value.path;
      if (process.env.PROD) {
        api.post(`${plausibleURL}`, {
          name, url, domain, props,
        });
      } else {
        // eslint-disable-next-line no-console
        console.log('track event', {
          name, url, domain, props,
        });
      }
    },
  };
});
