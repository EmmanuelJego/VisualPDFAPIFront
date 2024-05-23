<template>
  <q-page class="flex justify-center overflow-x-hidden">
    <div class="page-content">
      <div class="flex justify-center q-my-xl q-py-xl text-center">
        <h1 class="sm-page-content">
          <span class="text-primary">Simple pricing</span> for any project size
        </h1>
        <div class="text-muted text-subtitle1 q-mt-xl sm-page-content">
          <p>Whether your project is personal or corporate, we have the right offer for you, with no hidden fees.</p>
          <p class="q-mb-none">Each new account gets <span class="text-primary">200 free credits</span>.</p>
        </div>
      </div>
      <div class="q-mb-xl q-pb-lg">
        <div class="flex justify-between items-center">
          <div class="text-h6 flex items-center">
            Number of files to process
            <vue-help-tooltip class="q-ml-sm text-muted text-body1">
              1 file credit corresponds to 1 file being processed by 1 tool.
            </vue-help-tooltip>
          </div>
          <div>
            <span class="text-muted q-mr-xs">Need to process more?</span>
            <q-btn unelevated flat no-caps color="primary" label="Contact us"
              class="text-body1 text-underline q-px-xs min-h-auto" />
          </div>
        </div>
        <q-slider v-model="stepIndex" :min="0" color="accent" :max="steps.length - 1" label label-always
          :label-value="steps[stepIndex]" switch-label-side markers :marker-labels="stepLabels" />
      </div>
      <div class="flex justify-center">
        <div class="row sm-page-content gap-xl">
          <!-- Subscription plan -->
          <div class="pricing-col col border bg-white rounded-borders-lg q-pa-md text-center height-fit">
            <h2 class="text-h5 text-bold q-mb-sm">
              Subscription plan
            </h2>
            <div class="text-muted">
              Monthly credit replenishment
            </div>
            <div class="q-mt-xl q-mb-lg">
              <div class="text-h1 text-accent">
                {{ stringifyCost(subscriptionCost) }}
              </div>
              <div class="text-muted">per month</div>
              <div class="text-muted" :class="{ 'invisible': subscriptionPeriod === 'month' }">
                billed annualy as {{ stringifyCost(annualSubscriptionCost) }}
              </div>
            </div>
            <div class="q-mb-xl flex justify-center">
              <div class="width-fit relative-position">
                <q-btn-toggle v-model="subscriptionPeriod" class="q-mt-sm pricing-period-toggle" toggle-color="primary"
                  no-caps unelevated :options="subscriptionPeriodOptions" :ripple="false" />
                <div id="yearly-gain-tag" class="absolute-top-right">-20%</div>
              </div>
            </div>
            <div class="text-muted">
              <div>
                Treat up to {{ steps[stepIndex] }} files per month
              </div>
              <div>
                {{ stringifyCost(overrunUnitaryPrice) }} per additional file
              </div>
            </div>
            <div class="q-mt-sm">
              <q-btn unelevated no-caps color="primary" label="Subscribe" :ripple="false"
                class="text-subtitle2 q-px-xl" />
            </div>
          </div>

          <!-- Prepaid package -->
          <div class="pricing-col col border bg-white rounded-borders-lg q-pa-md text-center height-fit">
            <h2 class="text-h5 text-bold q-mb-sm">
              Prepaid package
            </h2>
            <div class="text-muted">
              One time payement
            </div>
            <div class="text-h1 text-accent q-my-xl">
              {{ stringifyCost(packageCost) }}
            </div>
            <div class="text-muted">
              <div>
                Get {{ steps[stepIndex] }} file credits to spend anytime
              </div>
              <div>
                Can be combined with a subscription plan
              </div>
            </div>
            <div class="q-mt-sm">
              <q-btn unelevated no-caps color="primary" label="Checkout" :ripple="false"
                class="text-subtitle2 q-px-xl" />
            </div>
          </div>
        </div>
      </div>

      <div class="text-center q-mt-xl q-pt-xl">
        <div class="text-h5 q-mb-sm">
          Still in doubt?
        </div>
        <div>
          Create a free account and get started with <b class="text-primary">200 free credits</b>.
          <br>
          No credit card required.
        </div>
        <q-btn unelevated no-caps color="primary" label="Sign up" :ripple="false" class="text-subtitle2 q-mt-md" />
      </div>

      <!-- Features -->
      <div class="q-mt-xl q-pt-xl">
        <h2 class="text-h3 q-mb-lg">
          What's included in all plans?
        </h2>
        <div class="features-grid">
          <vue-feature-tile v-for="(feature, index) in features" :key="`feature-${index}`" :feature="feature" />
        </div>
      </div>

      <div class="q-mt-xl q-pt-xl" id="credit-info">
        <h2 class="text-h3 q-mb-lg">
          What exactly is a file credit?
        </h2>
        <div>
          <vue-feature-tile :feature="creditInfo" />
        </div>
      </div>

      <div class="q-mt-xl q-pt-xl">
        <h2 class="text-h3 q-mb-xl">
          Frequently asked questions
        </h2>
        <vue-faq :questions="questions" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import vueFeatureTile from 'src/components/vue-feature-tile.vue';
import vueFaq from 'src/components/vue-faq.vue';
import vueHelpTooltip from 'src/components/vue-help-tooltip.vue';

import '../css/pages/pricing.scss';
import icons from '../resources/icons.js';

const plans = [1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000];
const baseUnitaryPrice = 0.02;
const overrunUnitaryPrice = 0.03;
const baseStepPriceRebate = 0.02;
const annualBillingRatio = 0.8;
const packageRatio = 1.25;
const stepUnitaryPrices = Array(plans.length).fill(0);
stepUnitaryPrices.forEach((value, index, array) => {
  stepUnitaryPrices[index] = +((index === 0 ? baseUnitaryPrice : (array[index - 1] * (1 - (index * baseStepPriceRebate)))).toFixed(4));
});
const stepPrices = plans.map((plan, index) => (stepUnitaryPrices[index] * plan));

export default defineComponent({
  name: 'PricingPage',
  components: {
    vueFeatureTile,
    vueFaq,
    vueHelpTooltip,
  },
  data() {
    return {
      icons,
      stepIndex: 0,
      steps: plans.map((plan) => plan.toLocaleString('en-US')),
      subscriptionPeriodOptions: [
        {
          label: 'Monthly',
          value: 'month',
        },
        {
          label: 'Yearly',
          value: 'year',
        },
      ],
      subscriptionPeriod: 'month',
      overrunUnitaryPrice,
      features: [
        {
          name: 'High data protection',
          description: 'Exchanges secured by HTTPS, encryption of files stored on our servers (AES-256), no analysis of the content of your files.',
          icon: icons.shieldLock,
        },
        {
          name: '1 hour file storage',
          description: 'You have 1 hour once your files have been processed to download them.',
          icon: icons.database,
        },
        {
          name: 'Up to 100 files and 500 MB per task',
          description: 'Process up to 100 files and 500 MB in a single call to our API.',
          icon: icons.export,
        },
        {
          name: 'Analytics and history',
          description: 'Analyze and track calls made to our API to follow the evolution of your use of our tools.',
          icon: icons.chart,
        },
        {
          name: '24h email support',
          description: 'Need a little helping hand? We are at your disposal and answer your questions within 24 hours.',
          icon: icons.feedback,
        },
      ],
      creditInfo: {
        name: 'How credits work',
        description: '1 credit corresponds to the processing of 1 file by 1 tool. If a pipeline processes 10 files with 2 tools, you will be charged 20 (10 x 2) credits.\nIf a pipeline fails for any reason, you will not be charged for credits consumed by it.\nCredits obtained through a subscription expire with each renewal (once a month, even for subscriptions paid annually). Credits obtained through a prepaid package never expire, you can spend them at any time.',
        icon: icons.coin,
      },
      questions: [
        {
          question: 'Can I start with free credits?',
          answer: 'Yes. We are offering you 200 free credits to allow you to try all of our tools. No credit card is required until you sign up for a subscription or purchase credits. 1 credit corresponds to the processing of 1 file by 1 tool. Merging multiple files into one only uses 1 credit.',
        },
        {
          question: 'Are my files and their data safe?',
          answer: 'Yes. The data passing through our servers is fully encrypted (HTTPS). Your files stored on our servers are also heavily encrypted. No files processed on our servers are analyzed in any way. All files processed via our API are only stored for 1 hour after editing, for the sole purpose of giving you time to download them.',
        },
        {
          question: 'Is the payment process secure?',
          answer: 'Yes. We rely on Stripe services to process payments.\nStripe is a widely used payment platform. It implements very strong security protocols and is certified PCI DSS, ISO 27001, HIPAA, GDPR compliant, and more. <a href="https://docs.stripe.com/security" target="_blank">Learn more</a>.',
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes. You can cancel your subscription in your account settings anymtime. You will then not be charged again for the subscription. Note that any renewal of subscription already paid cannot be refunded.',
        },
        {
          question: 'Can I update my subscription plan anytime?',
          answer: 'Yes. You can update your subscription plan in your account settings anytime.\nSubscription changes are prorated. For example, if you sign up on May 1 for a $100 plan, you will be billed $100 immediately. If on May 15 you switch to a $200 plan, then on June 1 you will be billed $250 ($200 for a renewal of your subscription, plus a $50 prorating adjustment for half of the previous month\'s $100 difference). Similarly, a downgrade generates a credit that is applied to the next invoice.',
        },
        {
          question: 'What happens if my account runs out of credit?',
          answer: 'If quota overflow is disabled on your account (it is by default), calls to the Visual PDF API will immediately return an error indicating that you no longer have credits.\nIf the quota overrun is authorized, calls to the Visual PDF API will be billed individually at a price of $0.03.\nIf you still want to process files, you must either change your subscription plan to one offering more credits, or purchase a prepaid package to obtain more credits temporarily.',
        },
        {
          question: 'Will I be notified when my account is low on credit?',
          answer: 'Yes. You will receive an email notification as soon as you have consumed 80% of your monthly quota.\nIf you have purchased only prepaid packages, you will receive an email notification as soon as you have used 80% of your total credits at the time of purchasing your last package.',
        },
        {
          question: 'In what order are my credits consumed?',
          answer: 'Credits are always consumed first from your subscription plan, then from your prepaid credits. This way, credits that have an expiration date will always be used first.',
        },
      ],
    };
  },
  computed: {
    stepLabels() {
      const labels = [
        { value: 0, label: this.steps[0] },
        { value: 3, label: this.steps[3] },
        { value: 6, label: this.steps[6] },
        { value: 9, label: this.steps[9] },
      ];

      // Do not display a marker label for the selected amount as it is already shown in the slider "bubble"
      delete labels[labels.findIndex((label) => label.value === this.stepIndex)];

      return labels;
    },
    subscriptionCost() {
      return Math.round(stepPrices[this.stepIndex] * (this.subscriptionPeriod === 'month' ? 1 : annualBillingRatio));
    },
    annualSubscriptionCost() {
      return Math.round(this.subscriptionCost * 12);
    },
    packageCost() {
      return Math.round(stepPrices[this.stepIndex] * packageRatio);
    },
  },
  methods: {
    stringifyCost(cost: number) {
      return `$${cost.toLocaleString('en-US')}`;
    },
  },
});
</script>
