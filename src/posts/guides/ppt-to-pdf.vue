<template>
  <h1>PowerPoint to PDF</h1>
  <p>
    The PowerPoint to PDF conversion tool will allow you to create your own solution or automate your conversions very
    simply.
  </p>

  <h2>Convert Microsoft PowerPoint to PDF</h2>
  <p>
    Converting a PowerPoint file to a PDF is done using a <span class="inline-code">ppt-to-pdf</span> task in a
    <router-link :to="{ name: 'guides-pipelines' }">pipeline</router-link>.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding a PowerPoint presentation
      form.append('ppt-1', myPresentation);

      // Turning the PPT into a PDF
      form.append('tasks', [{ tool: 'ppt-to-pdf' }]);
    </code>
  </pre>

  <p>
    As you can see, it is very simple to convert a PowerPoint to PDF using the Visual PDF API. It will also allow you,
    just as easily, to transform <router-link :to="{ name: 'guides-word-to-pdf' }">Word</router-link> documents and
    <router-link :to="{ name: 'guides-excel-to-pdf' }">Excel</router-link> spreadsheets into PDF.
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PPTToPDFGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
