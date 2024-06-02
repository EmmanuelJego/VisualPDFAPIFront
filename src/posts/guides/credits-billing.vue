<template>
  <h1>Credits and billing</h1>
  <p>
    To be able to process files through the API, you must first obtain credits.
  </p>
  <p>
    We will see in this guide that credits can be obtained in different ways. We will also see what a credit is and what
    happens if your account runs out of credit.
  </p>

  <h2>What is a credit in Visual PDF API</h2>
  <p>
    1 credit corresponds to the processing of 1 file by 1 tool.
  </p>
  <p>
    If a pipeline processes 10 files with 2 tools, you will be charged 20 (10 x 2) credits. If a pipeline processes 1
    file with 1 tool, you will be charged 1 (1 x 1) credit.
  </p>

  <h2>How can I get credits</h2>
  <p>
    Visual PDF API allows you to obtain credits via 2 different methods: subscriptions and prepaid packages.
  </p>
  <p>
    These 2 methods are not incompatible: you can, while having taken out a subscription, purchase additional credits
    via a prepaid package.
  </p>

  <h3>Subscription plans</h3>
  <p>
    Subscription plans allow you to top up your account with credit every month.
  </p>
  <p>
    With each new monthly payment, your credits will be reset to the subscribed amount automatically. This means that
    any credits not used during a month will be lost. It is therefore wise to subscribe to the plan that best
    corresponds to your monthly API call load.
  </p>

  <h3>Prepaid packages</h3>
  <p>
    Prepaid packages allow you to obtain credits through a one-time payment.
  </p>
  <p>
    Unlike credits obtained via a subscription, those obtained via a prepaid package do not expire. They will remain
    available to you until consumed.
  </p>
  <p>
    Prepaid packages can be used in addition to a subscription, for example to meet a temporary charge or to have enough
    credits without having to subscribe to the higher plan which would offer too many credits.
  </p>
  <p>
    If you have obtained prepaid credits in addition to a subscription plan, the credits will always be debited from
    your subscription plan first.
  </p>

  <h2>Quota overrun</h2>
  <p>
    From your administration panel, you can authorize or not allow quota to be exceeded.
  </p>

  <h3>Unauthorized quota overrun</h3>
  <p>
    By default your account will be configured to not allow quota overruns.
  </p>
  <p>
    In this mode, you cannot use more credits than you have available. You cannot therefore be billed for additional
    credits.
  </p>

  <h3>Authorized quota overrun</h3>
  <p>
    In this mode, if you run out of credits, your API calls will continue to work, but you will be billed for any
    additional credits used.
  </p>
  <p>
    Please note that non-quota credits are billed at a higher rate than credits purchased via subscriptions or prepaid
    packages.
  </p>

  <h2>Credit notification</h2>
  <p>
    If your account is running out of credits soon, a notification email will be sent to you to notify you and to allow
    you to recharge if necessary.
  </p>

  <h3>Notification for subscription plans</h3>
  <p>
    If you have purchased a subscription, you will receive an email notification as soon as you have consumed 80% of
    your monthly quota.
  </p>

  <h3>Notification for prepaid packages only</h3>
  <p>
    If you have purchased only prepaid packages, you will receive an email notification as soon as you have used 80% of
    your total credits at the time of purchasing your last package.
  </p>

  <h2>Credit consumption in case of failure</h2>
  <p>
    If a <router-link :to="{ name: 'guides-pipelines' }">pipeline</router-link> fails for any reason, you will not be
    charged for credits consumed by its tasks.
  </p>
  <p>
    Only successful pipelines will result in a debit of credits.
  </p>

  <h2>Change your subscription plan</h2>
  <p>
    You can update your subscription plan in your account settings anytime.
  </p>
  <p>
    Subscription changes are prorated. For example, if you sign up on May 1 for a $100 plan, you will be billed $100
    immediately. If on May 15 you switch to a $200 plan, then on June 1 you will be billed $250 ($200 for a renewal of
    your subscription, plus a $50 prorating adjustment for half of the previous month's $100 difference). Similarly, a
    downgrade generates a credit that is applied to the next invoice.
  </p>

  <h2>Cancel your subscription plan</h2>
  <p>
    You can cancel your subscription in your account settings anymtime.
  </p>
  <p>
    You will then not be charged again for the subscription. Note that any renewal of subscription already paid cannot
    be refunded.
  </p>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreditsBillingGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guide - Credits and billing',
    description: 'To be able to process files through the API, you must first obtain credits. We will see in this guide that credits can be obtained in different ways. We will also see what a credit is and what happens if your account runs out of credit.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
