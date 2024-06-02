<template>
  <q-page class="flex justify-center use-cases">
    <div class="page-content">
      <div class="flex justify-center q-my-xl q-py-xl text-center">
        <h1 class="sm-page-content">
          Our PDF tools <span class="text-primary">adapt to your needs</span>, not the other way around
        </h1>
        <div class="text-muted text-subtitle1 q-mt-xl sm-page-content">
          <p>
            Build just about anything with a single, simple API that offers customizable tools that you can combine.
          </p>
        </div>
      </div>

      <div class="use-cases-bento">
        <div class="gradient-lite-card flex column">
          <h2>For creators and developers</h2>
          <div class="text-muted">
            Create your solution or add functionality to your existing product very quickly, without hassle, in a
            protected and scalable way.
          </div>
        </div>
        <div class="gradient-lite-card flex column">
          <h3>Add a "one-click quote signing" functionality to your CRM</h3>
          <div class="text-muted text-body2">
            Allow your users to add their already saved signature with just one click, to a predefined location.
          </div>
          <div class="flex flex-grow">
            <img class="q-ma-auto" src="../assets/img/useCases/sign-button.png" alt="Quick sign PDF API" />
          </div>
        </div>
        <div class="gradient-lite-card flex column">
          <h3>Microsoft Office files preview on your storage platform</h3>
          <div class="text-muted text-body2">
            View thumbnails of Word, PowerPoint or Excel files by converting them to PDF or images.
          </div>
          <div class="flex flex-grow">
            <img class="q-ma-auto" src="../assets/img/useCases/office.png" alt="Secure PDF API" />
          </div>
        </div>
        <div class="gradient-lite-card flex column">
          <h3>Split completed PDF forms for better storage</h3>
          <div class="text-muted text-body2">
            Split PDF contracts to save the supplier copy on one side and the customer copy on the other.
          </div>
          <div class="flex flex-grow">
            <img class="q-ma-auto" src="../assets/img/useCases/split.png" alt="Secure PDF API" />
          </div>
        </div>
        <div class="gradient-lite-card flex column">
          <h3>Automatic analysis of PDF text content </h3>
          <div class="text-muted text-body2">
            Retrieve the text content of a document so that you can quickly analyze it using an analysis tool.
          </div>
          <div class="flex flex-grow">
            <img class="q-ma-auto" src="../assets/img/useCases/analysis.png" alt="Secure PDF API" />
          </div>
        </div>
      </div>

      <div class="use-cases-bento right">
        <div class="gradient-lite-card flex column">
          <h2>For businesses</h2>
          <div class="text-muted">
            Integrate our PDF solutions into your internal processes to reduce your costs, improve the security of your
            data and increase efficiency.
          </div>
        </div>
        <div class="gradient-lite-card flex column">
          <h3>Compressing documents for storage</h3>
          <div class="text-muted text-body2">
            Save storage costs by compressing your documents before sending them to your servers or disks.
          </div>
          <div class="flex flex-grow">
            <img class="q-ma-auto" src="../assets/img/useCases/compress.png" alt="Secure PDF API" />
          </div>
        </div>
        <div class="gradient-lite-card flex column">
          <h3>Securing sensitive data via password-protected documents</h3>
          <div class="text-muted text-body2">
            Increase the security of your documents by automatically protecting them with a password known only to your
            employees.
          </div>
          <div class="flex flex-grow">
            <img class="q-ma-auto" src="../assets/img/useCases/password.png" alt="Secure PDF API" />
          </div>
        </div>
        <div class="gradient-lite-card flex column">
          <h3>Signing documents with automatic addition of date and legal mentions</h3>
          <div class="text-muted text-body2">
            Make sure you don't forget the legal notices on your documents to be signed by automating this process.
          </div>
          <div class="flex flex-grow">
            <img class="q-ma-auto" src="../assets/img/useCases/sign.png" alt="Secure PDF API" />
          </div>
        </div>
        <div class="gradient-lite-card flex column">
          <h3>Securing internal processes with automatic watermarking</h3>
          <div class="text-muted text-body2">
            Inform your colleagues or clients of the status of a document by adding a watermark (confidential, draft,
            etc.)
          </div>
          <div class="flex flex-grow">
            <img class="q-ma-auto" src="../assets/img/useCases/watermark.png" alt="Secure PDF API" />
          </div>
        </div>
      </div>

      <div class="text-center text-muted text-subtitle1 q-mx-auto sm-page-content">
        <p>
          Multiply these use cases infinitely by combining multiple tools using pipelines.
          <br>A PDF API has never been so powerful.
        </p>
      </div>
    </div>

    <vue-main-cta />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createMetaMixin } from 'quasar';

import 'src/css/pages/useCases.scss';

import icons from '../resources/icons.js';
import vueMainCta from '../components/vue-main-cta.vue';

export default defineComponent({
  name: 'UseCasesPage',
  components: {
    vueMainCta,
  },
  mixins: [
    createMetaMixin(() => ({
      title: 'PDF processing API for all use cases - Visual PDF API',
      description: 'Whether you\'re building a personal project with PDF file processing or a large-scale enterprise solution, our PDF tools adapt to your needs.',
      equiv: {
        'http-equiv': 'Content-Type',
        content: 'text/html; charset=UTF-8',
      },
    })),
  ],
  data() {
    return {
      icons,
    };
  },
  computed: {},
  methods: {},
});
</script>
