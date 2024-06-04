<template>
  <q-dialog ref="dialog" @hide="onDialogHide" transition-show="jump-down" transition-hide="jump-down">
    <q-card class="q-pa-lg rounded-borders-lg">
      <template v-if="!sent">
        <h2>
          Contact
        </h2>
        <div class="q-my-lg text-muted">
          We are at your disposal for any questions, suggestions or comments.
        </div>
        <div>
          <q-input ref="mail-input" class="q-mb-sm" filled v-model="email" type="email" placeholder="Your email address"
            autofocus>
            <template v-slot:prepend>
              <span :class="icons.mail"></span>
            </template>
          </q-input>
          <q-input filled v-model="content" type="textarea" placeholder="Your message..." autofocus />
          <q-btn color="primary" class="q-mt-sm full-width text-subtitle1" unelevated no-caps label="Send"
            @click="send" />
        </div>
        <div class="q-mt-xs text-muted text-caption">
          Your email will only be used to respond to this message.
        </div>
      </template>
      <template v-else>
        <h2>
          Thank you for contacting us.
        </h2>
        <div class="q-mt-lg text-muted">
          We will try to answer you as soon as possible.
        </div>
      </template>

      <q-btn class="absolute-top-right q-ma-sm" round color="dark" flat :icon="icons.cross" v-close-popup />

      <q-inner-loading :showing="loading">
        <q-spinner-oval size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { QDialog, QInput } from 'quasar';
import { defineComponent } from 'vue';

import icons from 'src/resources/icons';

export default defineComponent({
  name: 'VueContactModal',
  data() {
    return {
      icons,
      email: '',
      content: '',
      sent: false,
      loading: false,
    };
  },
  emits: ['ok', 'hide'],
  computed: {
    dialog(): QDialog {
      return this.$refs.dialog as QDialog;
    },
  },
  methods: {
    async send() {
      const mailInput = this.$refs['mail-input'] as QInput;

      if (this.email?.length && this.content?.length) {
        const isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);

        if (isEmailValid) {
          try {
            this.loading = true;

            const formData = new FormData();
            formData.append('email', this.email);
            formData.append('content', this.content);
            await this.$api.post('/devapi/contact', formData);

            this.sent = true;
          } catch (e) {
            this.onError();
          } finally {
            this.loading = false;
          }
        } else {
          mailInput.focus();
        }
      }
    },
    onError() {
      this.$q.notify({
        message: 'Sorry, something went wrong',
        color: 'red',
        badgeColor: 'white',
        badgeTextColor: 'dark',
        position: 'bottom-right',
      });
    },
    // === Dialog related methods ===
    show() {
      this.dialog.show();
    },
    hide() {
      this.dialog.hide();
    },
    onDialogHide() {
      this.$emit('hide');
    },
    onOKClick() {
      this.$emit('ok');
      this.hide();
    },
    onCancelClick() {
      this.hide();
    },
  },
});
</script>
