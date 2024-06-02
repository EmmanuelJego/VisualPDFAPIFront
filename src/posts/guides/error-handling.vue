<template>
  <h1>Error handling</h1>
  <p>
    Any request made to the Visual PDF API can return an error for any reason: authentication problem, non-compliant
    pipeline, error processing a file, etc.
  </p>
  <p>
    These errors can be recovered on your end to help you understand what went wrong.
  </p>
  <p>
    The example below shows you how you can catch these errors in JavaScript using a <span
      class="inline-code">try/catch</span> block:
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding a document to treat
      form.append('file-1', myFile);

      // Adding a compression task
      form.append('tasks', [{ tool: 'compress' }]);

      try {
        // Executing the pipeline
        const pipelineResponse = await fetch(
          'https://api.visualpdf.com/v1/process',
          {
            method: 'POST',
            body: form,
            headers: { Authorization: `Bearer ${my_API_key}` },
          },
        );

        const pipelineResult = await reponse.json();

        // Downloading the compressed PDF
        const fileResponse = await fetch(
          pipelineResult.files[0].link,
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${my_API_key}` },
          },
        );

        // Saving the file into a JavaScript File object
        const file = new File([await fileResponse.blob()], 'myNewFile.pdf', { type: 'application/pdf' });
      } catch (error) {
        // Something wrong happened
        console.error('Error while processing file', error);
      }
    </code>
  </pre>
  <p>
    You will find in the <router-link :to="{ name: 'docs-process', hash: '#errors' }">API documentation</router-link>
    the different errors that you can obtain as well as their meaning.
  </p>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorHandlingGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guide - Error handling',
    description: 'Any request made to the Visual PDF API can return an error for any reason: authentication problem, non-compliant pipeline, error processing a file, etc.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
