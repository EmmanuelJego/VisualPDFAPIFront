<template>
  <h1>Service status</h1>

  <p class="endpoint">
    <code>
      <span class="get">GET</span> https://api.visualpdf.com/v1/status
    </code>
  </p>

  <p>
    Retrieves the service status. Also allows you to test your authentication.
  </p>

  <h2>Example</h2>

  <h4>Request (NodeJS)</h4>
  <pre>
    <code class="language-javascript">
      const statusResponse = await fetch(
        'https://api.visualpdf.com/v1/status',
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${my_API_key}` },
        },
      );
    </code>
  </pre>

  <h4>Response</h4>
  <pre class="response">
    <code class="language-javascript">
      {
        message: 'You are correctly authenticated!',
        status: 'available',
      }
    </code>
  </pre>
  <h5>Status values</h5>
  <ul>
    <li><span class="inline-code">available</span>: the service is available</li>
    <li><span class="inline-code">unavailable</span>: the service is not accessible, we cannot process your requests at
      the moment</li>
  </ul>

  <h2>Errors</h2>
  <vue-parameters-table :cols="['HTTP code', 'Description']">
    <!-- Download format -->
    <tr>
      <td>401 - Unauthorized</td>
      <td>No valid API key provided.</td>
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
  name: 'QuotaDocsPost',
  components: {
    vueParametersTable,
  },
  data() {
    return {};
  },
});
</script>
