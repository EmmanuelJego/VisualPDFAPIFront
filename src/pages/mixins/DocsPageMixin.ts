import { VNode, defineComponent } from 'vue';
import { QTreeNode, copyToClipboard } from 'quasar';

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
  data() {
    return {
      summaryItems: [] as Array<QTreeNode>,
      selectedSummaryItem: undefined as string | undefined,
      summaryReady: false,
      observer: undefined as IntersectionObserver | undefined,
      nodesVisibility: [] as Array<{ elem: HTMLElement; visibility: number; }>,
    };
  },
  watch: {
    '$router.currentRoute.value.path': {
      handler: 'handleNav',
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

    this.handleNav();
  },
  methods: {
    handleNav() {
      this.highlight();
      this.goToHash();
    },
    highlight() {
      this.$nextTick(() => {
        Prism.highlightAll();
      });
    },
    goToHash() {
      this.$nextTick(() => {
        this.$nextTick(() => {
          const { hash } = this.$router.currentRoute.value;
          if (hash) {
            const element = document.getElementById(hash.slice(1));
            if (element) {
              const top = element.offsetTop - 5;
              window.scrollTo(0, top);
            }
          }
        });
      });
    },
    onViewMounted(node: VNode) {
      this.summaryItems = [] as Array<QTreeNode>;
      this.selectedSummaryItem = undefined;
      this.summaryReady = false;
      this.nodesVisibility = [];

      if (this.observer) {
        this.observer.disconnect();
      }

      this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          // Updating the visibility ratio for that node
          const visibilityItem = this.nodesVisibility.find((item) => item.elem === entry.target);
          if (visibilityItem) {
            visibilityItem.visibility = entry.intersectionRatio;
          }
        });

        // Comparing nodes to get the most visible
        let mostVisibleItem = this.nodesVisibility[0];
        this.nodesVisibility.forEach((nodeVisibility) => {
          if (nodeVisibility.visibility > mostVisibleItem.visibility) {
            mostVisibleItem = nodeVisibility;
          }
        });

        // When no header is visible, it is probably because we scrolled too far
        // In that case, do not change the select item
        if (this.nodesVisibility.every((item) => item.visibility === 0)) {
          return;
        }

        this.selectedSummaryItem = mostVisibleItem.elem.textContent || '';
      }, {
        root: null,
        rootMargin: '-51px',
        threshold: Array(100).fill('').map((value, index) => (index + 1) / 100),
      });

      let h2Parent: QTreeNode | undefined;
      let h3Parent: QTreeNode | undefined;

      node.el?.parentNode.childNodes.forEach((child: Node) => {
        if (['H1', 'H2', 'H3', 'H4'].includes(child.nodeName)) {
          const elem = child.childNodes[0].parentElement;

          const item = {
            label: child.textContent ?? '',
            children: [] as QTreeNode[],
            node: child,
            selectable: true,
            handler: () => {
              if (elem) {
                const top = elem.offsetTop - 5;
                window.scrollTo(0, top);
              }
            },
          };

          if (elem) {
            this.observer?.observe(elem);
            this.nodesVisibility.push({ elem, visibility: 0 });
          }

          if (child.nodeName === 'H1') {
            this.summaryItems.push(item);
          } else if (child.nodeName === 'H2') {
            h2Parent = item;
            h3Parent = undefined;

            this.summaryItems.push(item);
          } else if (child.nodeName === 'H3') {
            h3Parent = item;

            if (h2Parent) {
              h2Parent?.children?.push(item);
            } else {
              this.summaryItems.push(item);
            }
          } else if (child.nodeName === 'H4') {
            if (h3Parent) {
              h3Parent?.children?.push(item);
            } else {
              this.summaryItems.push(item);
            }
          }
        }
      });

      if (this.summaryItems.length) {
        this.$nextTick(() => {
          this.summaryReady = true;
        });
      }
    },
  },
});
