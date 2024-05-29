<template>
  <h1>Pipeline status</h1>

  <p class="endpoint">
    <code>
      <span class="get">GET</span> https://api.visualpdf.com/v1/pipeline/{id}
    </code>
  </p>

  <p>
    Retrieves the status of a pipeline from its id.
  </p>

  <h2>Path parameters</h2>
  <vue-parameters-table>
    <!-- Files -->
    <tr>
      <td>id</td>
      <td>The id of the pipeline.</td>
      <td>String</td>
      <td>Yes</td>
    </tr>
  </vue-parameters-table>

  <h2>Example</h2>

  <h4>Request (NodeJS)</h4>
  <pre>
    <code class="language-javascript">
      // Getting the status of a pipeline
      const pipelineStatusResponse = await fetch(
        'https://api.visualpdf.com/v1/pipeline/6ecd8c99-4036-403d-bf84-cf8400f67836',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${my_API_key}` },
        },
      );
    </code>
  </pre>

  <h4>Responses</h4>
  <pre class="response">
    <code class="language-javascript">
      {
        pipelineid: '6ecd8c99-4036-403d-bf84-cf8400f67836',
        'webhook-url': 'https://your-domain.com/visual-pdf-webhook',
        status: 'running',
        started: '2024-05-29T16:08:43.511Z',
      }
    </code>
  </pre>
  <pre class="response">
    <code class="language-javascript">
      {
        pipelineid: '6ecd8c99-4036-403d-bf84-cf8400f67836',
        duration: 823,
        files: [
          {
            name: 'compress_1',
            id: '40e6215d-b5c6-4896-987c-f30f3678f608',
            link: 'https://api.visualpdf.com/v1/download/40e6215d-b5c6-4896-987c-f30f3678f608',
          },
        ],
        status: 'succeeded',
        started: '2024-05-29T16:08:43.511Z',
      }
    </code>
  </pre>

  <h2>Errors</h2>
  <vue-parameters-table :cols="['HTTP code', 'Description']">
    <!-- Download format -->
    <tr>
      <td>400 - Bad Request</td>
      <td>The request was unacceptable, often due to missing or invalid pipeline id.</td>
    </tr>
    <tr>
      <td>401 - Unauthorized</td>
      <td>No valid API key provided.</td>
    </tr>
    <tr>
      <td>404 - Not found</td>
      <td>The requested pipeline doesn't exist.</td>
    </tr>
    <tr>
      <td>429 - Too Many Requests</td>
      <td>Too many requests hit the API too quickly.</td>
    </tr>
    <tr>
      <td>5xx - Server Errors</td>
      <td>Something went wrong on our end.</td>
    </tr>
  </vue-parameters-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import vueParametersTable from '../../components/docs/vue-parameters-table.vue';

export default defineComponent({
  name: 'PipelineStatusDocsPost',
  components: {
    vueParametersTable,
  },
  data() {
    return {};
  },
});
</script>
