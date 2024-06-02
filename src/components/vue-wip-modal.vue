<template>
  <q-dialog ref="dialog" @hide="onDialogHide" transition-show="jump-down" transition-hide="jump-down">
    <q-card class="q-pa-lg rounded-borders-lg">
      <template v-if="!sent">
        <h2>
          Join the waiting list and get <span class="text-primary">1000 free credits</span>
        </h2>
        <div class="q-my-lg text-muted">
          Thank you for choosing Visual PDF and joining the adventure!
        </div>
        <div class="q-my-lg text-muted">
          Before giving access to our API to creators and developers, we want to confirm a real interest from the public
          towards it.
        </div>
        <div>
          <q-input ref="mail-input" filled v-model="email" type="email" placeholder="Your email address" autofocus>
            <template v-slot:prepend>
              <span :class="icons.mail"></span>
            </template>
          </q-input>
          <q-btn color="primary" class="q-mt-sm full-width text-subtitle1" unelevated no-caps label="Join waiting list"
            @click="joinList" />
        </div>
        <div class="q-mt-xs text-muted text-caption">
          Your email will only be used to inform you of the progress of the project.
        </div>
      </template>
      <template v-else>
        <h2>
          Thank you for joining the waiting list!
        </h2>
        <div class="q-mt-lg text-muted">
          We will keep you updated very soon.
        </div>
      </template>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { QDialog, QInput } from 'quasar';
import { defineComponent } from 'vue';

import icons from 'src/resources/icons';

export default defineComponent({
  name: 'VueWipModal',
  data() {
    return {
      icons,
      email: '',
      sent: false,
    };
  },
  emits: ['ok', 'hide'],
  computed: {
    dialog(): QDialog {
      return this.$refs.dialog as QDialog;
    },
  },
  methods: {
    joinList() {
      const input = this.$refs['mail-input'] as QInput;

      if (this.email) {
        const success = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);
        if (success) {
          // TODO really save the email
          this.sent = true;
        } else {
          input.focus();
        }
      } else {
        input.focus();
      }
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
