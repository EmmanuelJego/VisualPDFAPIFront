<template>
  <q-page class="flex justify-center">
    <div class="hero-section gradient-section q-mt-xl">
      <h1 class="q-my-none">
        Simple <span class="text-primary">PDF API</span> to <span class="text-primary">automate</span> your PDF tasks
      </h1>
      <div class="text-muted text-subtitle1 q-my-xl">
        Build your own solution to automate PDF generation and edition.
        <br>
        Visual PDF's features as a REST API, and even more.
      </div>
      <div class="row q-gutter-lg justify-center">
        <q-btn unelevated no-caps color="primary" label="Get started" :ripple="false" class="text-subtitle2"
          to="/guides" />
        <q-btn unelevated no-caps color="secondary" label="Features" :ripple="false" class="q-px-lg text-subtitle2"
          to="/features" />
      </div>
      <div class="q-mt-xl text-muted flex q-gutter-x-lg justify-center">
        <div>
          <span :class="icons.badgeCheck" class="q-mr-xs" /> Low code
        </div>
        <div>
          <span :class="icons.badgeCheck" class="q-mr-xs" /> Data encryption
        </div>
        <div>
          <span :class="icons.badgeCheck" class="q-mr-xs" /> Free trial
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="header-bento">
        <div class="flex gradient-lite-card">
          <!-- top left -->
          <div class="text-bold absolute">Simple or advanced automations</div>
          <img class="q-ma-auto" src="../assets/img/home/hero/pipeline.png" alt="PDF automation pipeline" />
        </div>
        <div class="flex gradient-lite-card">
          <!-- bottom left -->
          <div class="text-bold absolute">Integrations</div>
          <img class="q-ma-auto" src="../assets/img/home/hero/integrations.png" alt="PDF automation integration" />
        </div>
        <div class="flex gradient-lite-card">
          <!-- right -->
          <div class="text-bold q-mb-md">Usage tracking</div>
          <img class="height-fit" src="../assets/img/home/hero/analytics.png" alt="PDF API analytics" />
        </div>
      </div>

      <!-- Features section -->
      <section>
        <div class="section-header">
          <q-badge outline color="primary" label="Features" class="header-badge q-mb-sm" />
          <h2>
            One API, all the PDF tools you need
          </h2>
        </div>

        <div class="row align-items-center q-gutter-xl">
          <div class="col self-center">
            <h3>
              Create and edit your PDFs in every possible way.
            </h3>
            <div class="q-mt-lg text-muted">
              <p>
                Start building or automating with many PDF creation and manipulation tools, whose effectiveness is
                validated by thousands of daily users.
              </p>
              <p class="q-mb-none">
                Visual PDF API is fast and easy to integrate, to bring you the best experience.
              </p>
            </div>
            <q-btn unelevated no-caps color="primary" label="See all PDF features" :ripple="false"
              class="text-subtitle2 q-mt-lg" to="/features" />
          </div>
          <div class="col self-center">
            <div id="features-illustration" class="gradient-lite-card illustration-container">
              <img src="../assets/img/home/features/features.png" alt="PDF API features" />
            </div>
          </div>
        </div>

        <div class="row align-items-center q-gutter-xl sm-reverse">
          <div class="col self-center">
            <div class="gradient-lite-card illustration-container">
              <img src="../assets/img/home/features/pipeline.png" alt="Simple PDF API process" />
            </div>
          </div>
          <div class="col self-center">
            <h3>
              Simple workflow, endless possibilities.
            </h3>
            <div class="q-mt-lg text-muted">
              <p>
                Automate more complex edits by chaining together PDF editing tasks.
              </p>
              <p class="q-mb-none">
                Pipelines allow you to easily make multiple changes at once, saving you from having to upload and
                download the file multiple times.
              </p>
            </div>
            <q-btn unelevated no-caps color="primary" label="See use cases" :ripple="false"
              class="text-subtitle2 q-mt-lg" to="/use-cases" />
          </div>
        </div>
      </section>
    </div>

    <!-- CTA -->
    <vue-main-cta />

    <div class="page-content">
      <!-- Advantages section -->
      <section>
        <div class="section-header">
          <q-badge outline color="primary" label="Advantages" class="header-badge q-mb-sm" />
          <h2>
            A PDF API that suits all needs
          </h2>
        </div>

        <div class="advantages-bento">
          <div class="gradient-lite-card flex column">
            <div>Data safety</div>
            <div class="text-muted text-body2">
              All your data passes via HTTPS, your files are encrypted and are never interpreted or analyzed on our
              servers.
            </div>
            <div class="flex flex-grow">
              <img class="q-ma-auto" src="../assets/img/home/advantages/safety.png" alt="Secure PDF API" />
            </div>
          </div>
          <div class="gradient-lite-card flex column">
            <div>Fast low code PDF solution</div>
            <div class="text-muted text-body2">
              No time to wait? Don't worry, we code for you and process your requests in milliseconds.
            </div>
            <div class="flex flex-grow">
              <img src="../assets/img/home/advantages/fast.png" alt="Fast PDF automation" />
            </div>
          </div>
          <div class="gradient-lite-card flex column">
            <div>Get started in no time</div>
            <div class="text-muted text-body2">
              The simple workflow of our API makes it quickly integrated into your solution.
            </div>
            <div class="flex flex-grow">
              <img src="../assets/img/home/advantages/workflow.png" alt="Easy integration" />
            </div>
          </div>
          <div class="gradient-lite-card flex column">
            <div>Resources</div>
            <div class="text-muted text-body2">
              Our guides and documentation with code examples will support your during Visual PDF API integration.
            </div>
            <div class="flex row flex-grow items-center no-wrap">
              <img class="q-my-auto" src="../assets/img/home/advantages/resources.png" alt="PDF API resources" />
              <div class="flex column q-gutter-y-sm flex-grow">
                <q-btn v-for="(link, linkIndex) in resourcesLinks" :key='`resource-${linkIndex}`' unelevated no-caps
                  class="border text-bold" color="white" text-color="secondary" :ripple="false" :to="link.to">
                  <div class="flex items-center flex-grow text-left text-body2">
                    {{ link.name }}
                  </div>
                </q-btn>
              </div>
            </div>
          </div>
          <div class="gradient-lite-card flex column">
            <div>Scalability</div>
            <div class="text-muted text-body2">
              Our API is designed to be able to process many requests simultaneously.
            </div>
            <div class="flex flex-grow">
              <img src="../assets/img/home/advantages/scale.png" alt="Scalable PDF API" />
            </div>
          </div>
        </div>

        <div class="text-center">
          <div class="text-subtitle1">
            Sign up now and start automating PDF with <b class="text-primary">200 free credits</b>
          </div>
          <div class="text-muted">
            No credit card required
          </div>
          <q-btn unelevated no-caps color="primary" label="Sign up" :ripple="false" class="text-subtitle2 q-mt-md"
            @click="displayWIPModal" />
        </div>
      </section>

      <!-- Analytics section -->
      <section>
        <div class="section-header">
          <q-badge outline color="primary" label="Analytics" class="header-badge q-mb-sm" />
          <h2>
            Keep an eye on what's going on
          </h2>
        </div>
        <div class="row align-items-center q-gutter-lg">
          <div class="col self-center flex column q-gutter-y-lg">
            <q-btn v-for="(step, stepIndex) in analyticsSteps" :key="`step-${step.id}`" unelevated no-caps
              class="analytics-btn lite-card q-pa-none rounded-borders-lg" :ripple="false"
              :class="{ 'active': activeAnalyticsStepIndex === stepIndex, 'q-mt-none': stepIndex === 0 }"
              @click="setActiveAnalyticsStep(stepIndex)">
              <div class="flex flex-grow q-pa-md no-wrap q-gutter-x-md">
                <div class="lite-card rounded-borders bg-white flex text-accent text-h3">
                  <span class=" q-ma-auto" :class="step.icon" />
                </div>
                <div class="text-left">
                  <div class="text-bold text-subtitle2 q-mb-sm">
                    {{ step.title }}
                  </div>
                  <div class="text-muted text-body2">
                    {{ step.subtitle }}
                  </div>
                </div>
              </div>
            </q-btn>
          </div>
          <div class="col self-stretch">
            <div
              class="gradient-lite-card illustration-container overflow-hidden full-height flex column justify-center">
              <div class="relative-position text-bold text-subtitle2 q-mb-sm">
                {{ activeAnalyticsStep.imageTitle }}
              </div>
              <q-img :src="require(`../assets/img/home/analytics/${activeAnalyticsStep.image}.png`)"
                spinner-color="accent" :alt="activeAnalyticsStep.title"
                @load="analyticsStepImageStyle = activeAnalyticsStep.imageStyle" :style="analyticsStepImageStyle" />
              <q-linear-progress class="absolute-bottom" :value="analyticsStepProgress" color="accent"
                :animation-speed="analyticsStepAnimationSpeed" size="md" />
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- FAQ section -->
    <div class="sm-page-content">
      <div>
        <h2 class="text-h5 text-bold q-mb-xl text-center">
          Frequently asked questions
        </h2>
        <vue-faq :questions="questions" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

import '../css/pages/index.scss';
import icons from '../resources/icons.js';

import vueFaq from '../components/vue-faq.vue';
import vueMainCta from '../components/vue-main-cta.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    vueFaq,
    vueMainCta,
  },
  mixins: [
    createMetaMixin(() => ({
      title: 'Visual PDF API - Automate PDF creation, edition, conversion',
      description: 'A simple PDF processing REST API for all your document creation, editing and conversion projects. Powerful and scalable PDF tools for automation.',
      equiv: {
        'http-equiv': 'Content-Type',
        content: 'text/html; charset=UTF-8',
      },
    })),
  ],
  data() {
    return {
      icons,
      analyticsSteps: [
        {
          id: 'real-time',
          icon: icons.clock,
          title: 'Real time usage tracking',
          subtitle: 'Track API usage in real time, with tasks details, to make sure everything runs smoothly.',
          image: 'history',
          imageTitle: 'Pipelines history and status',
          imageStyle: 'width: 130%;',
        },
        {
          id: 'analytics',
          icon: icons.chart,
          title: 'API and tools usage analytics',
          subtitle: 'Get analytics on your PDF task automations to monitor the evolution of your product.',
          image: 'dashboard',
          imageTitle: 'API dashboard',
          imageStyle: 'width: 120%; margin-bottom: -100px;',
        },
        {
          id: 'quota',
          icon: icons.notification,
          title: 'Quota management',
          subtitle: 'Get notified and block quota overruns if you wish to avoid unpleasant surprises.',
          image: 'quota',
          imageTitle: 'Allow or prevent quota overrun',
          imageStyle: '',
        },
      ],
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
          question: 'Can the Visual PDF API handle my large amount of document processing?',
          answer: 'Yes. Our API is designed to scale immediately based on demand, so it can handle lots of PDF file processing in parallel.\nYour calls to our API are still capped, to prevent a possible hacker who had access to your API identifiers from being able to charge you for a significant number of calls (quota overrun is also disabled by default).',
        },
        {
          question: 'How can I integrate Visual PDF API to my product?',
          answer: 'Visual PDF API currently only offers integration via a REST API. To find out more, you can consult our documentation.\nWe are actively working on other integration methods (Zappier, Make, etc.). If you have any requests or suggestions about integration methods, let us know by contacting us.',
        },
        {
          question: 'What can I build with Visual PDF API?',
          answer: 'Visual PDF API is a REST API that allows you to create or modify PDF documents on our servers, without you having to code these features yourself, manage hosting, security, scalability, etc. It therefore allows you to create your solutions very quickly, since all you need to do is make a call to our API (HTTP request) to carry out processing on a PDF file.\nThe possibilities are endless: adding a feature to your accounting software to add a watermark to your invoices, automating your cloud to compress all the PDFs saved there, extracting all the images from your PDFs to create a database pictures, etc.',
        },
        {
          question: 'Can I get analytics on API usage?',
          answer: 'Yes. Our dashboard allows you to quickly see the amount of requests made to our API, distribution of tools used, and the history of pipelines with their details (date, duration, status, etc.).',
        },
      ],
      resourcesLinks: [
        {
          name: 'Go to documentation',
          to: '/docs',
        },
        {
          name: 'See tool guides',
          to: '/guides',
        },
        {
          name: 'Discover use cases',
          to: '/use-cases',
        },
      ],
      activeAnalyticsStepIndex: 0,
      activeAnalyticsTimeout: 0,
      analyticsStepProgress: 0,
      analyticsStepProgressInterval: 0,
      analyticsStepAnimationSpeed: 0,
      analyticsStepImageStyle: '',
    };
  },
  computed: {
    activeAnalyticsStep() {
      return this.analyticsSteps[this.activeAnalyticsStepIndex];
    },
  },
  mounted() {
    this.setActiveAnalyticsStep(0);
  },
  methods: {
    setActiveAnalyticsStep(index: number) {
      this.activeAnalyticsStepIndex = index;
      this.analyticsStepProgress = 0;
      this.analyticsStepAnimationSpeed = 0;

      setTimeout(() => {
        this.analyticsStepAnimationSpeed = 1000;
      }, 200);

      if (this.activeAnalyticsTimeout) {
        clearTimeout(this.activeAnalyticsTimeout);
      }

      if (this.analyticsStepProgressInterval) {
        clearInterval(this.analyticsStepProgressInterval);
      }

      this.analyticsStepProgressInterval = window.setInterval(() => {
        this.analyticsStepProgress += (1 / 9);
      }, 1000);

      this.activeAnalyticsTimeout = window.setTimeout(() => {
        this.setActiveAnalyticsStep((this.activeAnalyticsStepIndex + 1) % this.analyticsSteps.length);
      }, 10000);
    },
    displayWIPModal() {
      this.$bus.emit('display-wip-modal');
    },
  },
});
</script>
