<template>
  <h1>Process</h1>

  <p class="endpoint">
    <code>
      <span class="post">POST</span> https://api.visualpdf.com/v1/process
    </code>
  </p>

  <p>
    Process a pipeline by uploading files and executing the given tasks.
  </p>
  <p>
    To send files to process as well as the tasks to be performed on these files, you must send the content in <span
      class="inline-code">multipart/form-data</span> format.
  </p>

  <h3>Parameters</h3>
  <vue-parameters-table>
    <!-- Files -->
    <tr>
      <td>files</td>
      <td>One or more files to be processed. Each file should be an individual field in the <span
          class="inline-code">multipart/form-data</span> request. The field names will be the identifiers to use as
        reference in the tasks, if necessary.</td>
      <td>File (<span class="inline-code">multipart/form-data</span>)</td>
      <td>Yes</td>
    </tr>
    <!-- Tasks -->
    <tr>
      <td>tasks</td>
      <td>The tasks to run on the uploaded files with their options.</td>
      <td>Array of objects</td>
      <td>Yes</td>
    </tr>
    <!-- Options -->
    <tr>
      <td>options</td>
      <td>Pipeline options</td>
      <td>Object</td>
      <td>No</td>
    </tr>
  </vue-parameters-table>

  <h3>Example</h3>

  <h4>Request (NodeJS)</h4>
  <pre>
    <code class="language-javascript">
      const myPDF = fs.readFileSync('@/path/to/a/doc.pdf');

      const form = new FormData();
      form.append('myPDF', myPDF);
      form.append('tasks', [
        {
          tool: 'compress',
          options: { level: 'high' },
        },
      ]);

      const requestResponse = await fetch(
        'https://api.visualpdf.com/v1/process',
        {
          method: 'POST',
          body: form,
          headers: { Authorization: `Bearer ${my_API_key}` },
        },
      );
    </code>
  </pre>

  <h4>Response</h4>
  <pre class="response">
    <code class="language-javascript">
      {
        pipelineid: '6ecd8c99-4036-403d-bf84-cf8400f67836',
        duration: 823,
        links: [
          'https://api.visualpdf.com/v1/download/40e6215d-b5c6-4896-987c-f30f3678f608',
        ],
        filescount: 1,
        status: "succeeded",
      }
    </code>
  </pre>

  <h3>Task object</h3>
  <vue-parameters-table>
    <!-- Tool -->
    <tr>
      <td>tool</td>
      <td>The identifier of a file processing tool, among those available.</td>
      <td>String</td>
      <td>Yes</td>
    </tr>
    <!-- Options -->
    <tr>
      <td>options</td>
      <td>Task options. Options vary from task to task.</td>
      <td>Object</td>
      <td>No</td>
    </tr>
    <!-- Files -->
    <tr>
      <td>files</td>
      <td>The indexes of the files to be processed by this task. By default all files will be taken into account. The
        index of a file is given by the result of the previous task, or the order of adding files to the query for the
        first task.</td>
      <td>Array of numbers</td>
      <td>No</td>
    </tr>
  </vue-parameters-table>

  <h4 id="available-tools">Available tools</h4>
  <ul>
    <li v-for="tool in tools" :key="tool.id"><span class="inline-code">{{ tool.id }}</span>: {{ tool.name }}. <q-btn
        @click="goto(tool.id)" unelevated flat no-caps color="accent" label="options" class="link-btn" />
    </li>
  </ul>

  <h3>Task options</h3>

  <h4 id="add-password">add-password</h4>
  <vue-parameters-table>
    <tr>
      <td>password</td>
      <td>The password that will be prompted to open the PDF</td>
      <td>String</td>
      <td>Yes</td>
    </tr>
  </vue-parameters-table>

  <h4 id="compress">compress</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Default']">
    <tr>
      <td>level</td>
      <td>The level of compression used</td>
      <td><q-btn @click="goto('compression-levels')" unelevated flat no-caps color="accent" label="Compression level"
          class="link-btn" /></td>
      <td><span class="inline-code">{{ CompressionLevel.Medium }}</span></td>
    </tr>
  </vue-parameters-table>

  <h5 id="compression-levels">Compression levels:</h5>
  <ul>
    <li v-for="level in CompressionLevel" :key="`compression-${level}`"><span class="inline-code">{{ level }}</span>: {{
      getCompressionLevelInfo(level)
    }}</li>
  </ul>

  <h4 id="crop-pages">crop-pages</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Default']">
    <tr>
      <td>pages</td>
      <td>The level of compression used</td>
      <td><q-btn @click="goto('compression-levels')" unelevated flat no-caps color="accent" label="Compression level"
          class="link-btn" /></td>
      <td><span class="inline-code">{{ CompressionLevel.Medium }}</span></td>
    </tr>
  </vue-parameters-table>

  <h4 id="delete-pages">delete-pages</h4>
  <h4 id="duplicate-pages">duplicate-pages</h4>
  <h4 id="excel-to-pdf">excel-to-pdf</h4>
  <h4 id="images-to-pdf">images-to-pdf</h4>
  <h4 id="merge">merge</h4>
  <h4 id="order-pages">order-pages</h4>
  <h4 id="pdf-to-images">pdf-to-images</h4>
  <h4 id="ppt-to-pdf">ppt-to-pdf</h4>
  <h4 id="remove-password">remove-password</h4>
  <h4 id="rotate-pages">rotate-pages</h4>
  <h4 id="sign">sign</h4>
  <h4 id="split">split</h4>
  <h4 id="watermark">watermark</h4>
  <h4 id="word-to-pdf">word-to-pdf</h4>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import tools from 'src/resources/tools.js';
import { CompressionLevel, getCompressionLevelInfo } from 'src/types/compressionLevel';

import vueParametersTable from '../../components/docs/vue-parameters-table.vue';

export default defineComponent({
  name: 'ProcessDocsPost',
  components: {
    vueParametersTable,
  },
  data() {
    return {
      tools: tools.sort((a: { id: number; }, b: { id: number; }) => (a.id > b.id ? 1 : -1)),
      CompressionLevel,
    };
  },
  methods: {
    goto(id: string) {
      const element = document.getElementById(id);
      if (element) {
        const top = element.offsetTop;
        window.scrollTo(0, top);
      }
    },
    getCompressionLevelInfo,
  },
});
</script>
