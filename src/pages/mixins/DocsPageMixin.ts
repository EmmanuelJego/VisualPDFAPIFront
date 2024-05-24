import { defineComponent } from 'vue';
import { copyToClipboard } from 'quasar';

import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.min.css';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.min.js';
import 'prismjs/plugins/toolbar/prism-toolbar.js';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

import 'src/css/pages/docsPage.scss';
import 'src/css/pages/post.scss';

import vueDocsBottomNav from 'src/components/vue-docs-bottom-nav.vue';

export default defineComponent({
  components: {
    vueDocsBottomNav,
  },
  watch: {
    '$router.currentRoute.value.path': {
      handler: 'highlight',
    },
  },
  mounted() {
    Prism.manual = true;
    Prism.plugins.NormalizeWhitespace.setDefaults({
      'remove-trailing': true,
      'remove-indent': true,
      'left-trim': true,
      'right-trim': true,
    });

    if (!Prism.plugins.toolbar.registered) {
      Prism.plugins.toolbar.registerButton('copy', {
        text: 'Copy',
        onClick: (env: {code: string}) => {
          copyToClipboard(env.code)
            .then(() => {
              this.$q.notify({
                message: 'Code copied to your clipboard',
                color: 'green',
                badgeColor: 'white',
                badgeTextColor: 'dark',
                position: 'bottom-right',
              });
            })
            .catch(() => {
              // fail
            });
        },
      });
    }
    Prism.plugins.toolbar.registered = true;

    this.highlight();
  },
  methods: {
    highlight() {
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    },
  },
});
