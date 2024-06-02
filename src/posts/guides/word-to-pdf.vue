<template>
  <h1>Word to PDF</h1>
  <p>
    Automate the transformation of Microsoft Word documents to PDF easily and quickly using our REST API.
  </p>

  <h2>Convert Microsoft Word to PDF</h2>
  <p>
    To be able to convert a Word document to PDF, you must create a <router-link
      :to="{ name: 'guides-pipelines' }">pipeline</router-link> and use a <span class="inline-code">word-to-pdf</span>
    task.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding a Word document
      form.append('doc-1', myWordDoc);

      // Turning the doc into a PDF
      form.append('tasks', [{ tool: 'word-to-pdf' }]);
    </code>
  </pre>

  <p>
    In this guide, we have seen how to very easily transform a Word document into PDF via the Visual PDF API. Other
    Microsoft Office formats can also be converted, such as <router-link
      :to="{ name: 'guides-ppt-to-pdf' }">PowerPoint</router-link> presentations and <router-link
      :to="{ name: 'guides-excel-to-pdf' }">Excel</router-link> spreadsheets.
  </p>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WordToPDFGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guides - How to convert Word to PDF',
    description: 'Automate the transformation of Microsoft Word documents to PDF easily and quickly using our REST API.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
