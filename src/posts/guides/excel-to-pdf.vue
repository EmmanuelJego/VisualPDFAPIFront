<template>
  <h1>Excel to PDF</h1>
  <p>
    Create your own Microsoft Excel spreadsheet to PDF conversion solution in no time using the Visual PDF API.
  </p>

  <h2>Convert Microsoft Excel to PDF</h2>
  <p>
    The Excel to PDF conversion tool is accessible in a <router-link :to="{ name: 'guides-pipelines' }">file processing
      pipeline</router-link> using the <span class="inline-code">excel-to-pdf</span> task
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding an Excel spreadsheet
      form.append('spreadsheet-1', myExcelSpreadsheet);

      // Turning the spreadsheet into a PDF
      form.append('tasks', [{ tool: 'excel-to-pdf' }]);
    </code>
  </pre>

  <p>
    So, in just a few lines of code, you will be able to transform an Excel file into a PDF. Our API also allows you to
    convert other Microsft office file types, such as <router-link
      :to="{ name: 'guides-word-to-pdf' }">Word</router-link> documents and <router-link
      :to="{ name: 'guides-ppt-to-pdf' }">PowerPoint</router-link> presentations.
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExcelToPDFGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
