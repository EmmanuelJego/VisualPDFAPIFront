<template>
  <div class="menu-dropdown" ref="dropdownTitle" :class="{ 'mobile-menu-dropdown': mobile }" :id="id">
    <span @click="openMobile" class="position-relative">
      <slot name="title"></slot>
    </span>
    <div ref="dropdownContent" class="menu-dropdown-content" :class="{ invisible: !loaded }"
      :style="`margin-left: ${xTranslation}px !important;`">
      <slot name="dropdown-content"></slot>
    </div>
  </div>
</template>

<script>
const MIN_X_MARGIN = 10;

export default {
  data() {
    return {
      xTranslation: 0,
      loaded: false,
      button: undefined,
    };
  },
  props: {
    mobile: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    openMobile() {
      if (this.mobile) {
        this.button.classList.add('active');
      }
    },
    onResize() {
      this.computePositions();
    },
    computePositions() {
      this.xTranslation = 0;

      this.$nextTick(() => {
        const popup = this.$refs.dropdownContent;
        const buttonWidth = this.button.clientWidth;
        const popupBounds = popup.getBoundingClientRect();

        const popupWidth = popupBounds.width;
        const popupX = popupBounds.x;

        let xDelta = -popupWidth / 2 + buttonWidth / 2;

        if (popupX + xDelta < MIN_X_MARGIN) {
          xDelta = MIN_X_MARGIN - popupX;
        } else if (
          popupX + xDelta + popupWidth
          > document.body.clientWidth - MIN_X_MARGIN
        ) {
          xDelta
            -= popupX
            + xDelta
            + popupWidth
            - document.body.clientWidth
            + MIN_X_MARGIN;
        }

        this.xTranslation = xDelta;

        popup.classList.add('animated');
      });
    },
  },
  mounted() {
    this.button = this.$refs.dropdownTitle;

    this.computePositions();

    this.loaded = true;

    const links = document.querySelectorAll(`#${this.id} .close-dropdown`);
    links.forEach((link) => link.addEventListener('click', () => {
      if (this.mobile) {
        this.button.classList.remove('active');
      } else {
        this.button.classList.add('blur');
        setTimeout(() => {
          this.button.classList.remove('blur');
        }, 300);
      }
    }));

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>
