<template>
  <q-dialog ref="dialog" @hide="onDialogHide" transition-show="jump-down" transition-hide="jump-down">
    <q-card class="q-pa-lg rounded-borders-lg">
      <template v-if="!sent && !moreSent">
        <h2>
          Join the waiting list and get <span class="text-primary">1000 free credits</span>
        </h2>
        <div class="q-my-lg text-muted">
          Before giving access to our API to creators and developers, we want to confirm a real interest from the public
          towards it.
        </div>
        <div class="q-my-lg text-muted">
          Let us know your interest by joining the waiting list in exchange for 1000 free credits.
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
      <template v-else-if="!moreSent">
        <h2>
          Thank you for joining the waiting list!
        </h2>
        <div class="q-my-lg text-muted">
          When the service is available, you will get 1000 credits upon creating your account.
        </div>
        <div class="q-my-lg text-muted">
          Can you tell us more about your project and what you want to do with the Visual PDF API?
        </div>
        <q-input ref="mail-input" filled v-model="info" type="textarea"
          placeholder="Information about your project, what you need, amount of files to process..." autofocus />
        <q-btn color="primary" class="q-mt-sm full-width text-subtitle1" unelevated no-caps label="Send"
          @click="sendMore" />
      </template>
      <template v-else>
        <h2>
          Thank you for your trust and for sharing this information with us.
        </h2>
        <div class="q-mt-lg text-muted">
          We will take your comment into account to provide the best possible service and we will keep you informed very
          soon.
        </div>
      </template>

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

interface RequestResponse {
  data: {
    id: string;
  };
}

export default defineComponent({
  name: 'VueWipModal',
  data() {
    return {
      icons,
      email: '',
      info: '',
      sent: false,
      moreSent: false,
      loading: false,
      dbItemId: '',
    };
  },
  emits: ['ok', 'hide'],
  computed: {
    dialog(): QDialog {
      return this.$refs.dialog as QDialog;
    },
  },
  methods: {
    async joinList() {
      const input = this.$refs['mail-input'] as QInput;

      if (this.email?.length) {
        const success = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.email);

        if (success) {
          try {
            this.loading = true;

            const formData = new FormData();
            formData.append('email', this.email);
            const requestResponse = await this.$api.post('/devapi/waitinglist', formData) as RequestResponse;

            this.dbItemId = requestResponse.data.id;
            this.sent = true;
          } catch (e) {
            this.onError();
          } finally {
            this.loading = false;
          }
        } else {
          input.focus();
        }
      } else {
        input.focus();
      }
    },
    async sendMore() {
      if (this.info?.length) {
        try {
          this.loading = true;

          const formData = new FormData();
          formData.append('id', this.dbItemId);
          formData.append('info', this.info);
          await this.$api.put('/devapi/waitinglist', formData);

          this.moreSent = true;
        } catch (e) {
          this.onError();
        } finally {
          this.loading = false;
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
