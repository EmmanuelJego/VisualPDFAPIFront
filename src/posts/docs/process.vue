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

  <h2>Parameters</h2>
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
      <td>Array of <a href="/docs/process#task-object">task objects</a></td>
      <td>Yes</td>
    </tr>
    <!-- Options -->
    <tr>
      <td>options</td>
      <td>Pipeline options (filenames, wait/async, archive, etc.).</td>
      <td><a href="/docs/process#pipeline-options">Pipeline options object</a></td>
      <td>No</td>
    </tr>
  </vue-parameters-table>

  <h2>Example</h2>

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

  <h2 id="task-object">Task object</h2>
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
    <li v-for="tool in tools" :key="tool.id">
      <span class="inline-code">{{ tool.id }}</span>: {{ tool.name }}. <a :href="`/docs/process#${tool.id}`">options</a>
    </li>
  </ul>

  <h2>Task options</h2>

  <!-- Add password -->
  <h4 id="add-password">Add PDF password</h4>
  <!-- <span class="inline-code">add-password</span> -->
  <vue-parameters-table>
    <tr>
      <td>password</td>
      <td>The password that will be used to protect the access to the PDF.</td>
      <td>String</td>
      <td>Yes</td>
    </tr>
  </vue-parameters-table>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'add-password',
        options: { password: 'my_sup3r_s3cr3t_pwd' },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Compress -->
  <h4 id="compress">Compress PDF</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Default']">
    <tr>
      <td>level</td>
      <td>The level of compression used.</td>
      <td><a href="/docs/process#compression-levels">Compression level</a></td>
      <td><span class="inline-code">{{ CompressionLevel.Medium }}</span></td>
    </tr>
  </vue-parameters-table>
  <div class="indent">
    <h5 id="compression-levels">Compression levels</h5>
    <ul>
      <li v-for="level in CompressionLevel" :key="`compression-${level}`"><span class="inline-code">{{ level }}</span>:
        {{
      getCompressionLevelInfo(level)
    }}</li>
    </ul>
  </div>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'compress',
        options: { level: 'high' },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Crop -->
  <h4 id="crop-pages">Crop pages</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>pages</td>
      <td>Page trimming instructions.</td>
      <td>Array of <a href="/docs/process#page-cropping-instruction">page cropping instructions</a></td>
      <td>True</td>
    </tr>
  </vue-parameters-table>
  <div class="indent">
    <div class="flex q-gutter-x-md items-center">
      <h5 id="page-cropping-instruction">Page cropping instruction</h5>
      <div class="text-body2">Inherits from <router-link :to="{ name: 'guides-page-instructions' }">Page
          instruction</router-link></div>
    </div>
    <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Examples', 'Required']">
      <tr>
        <td>page</td>
        <td>Page index.</td>
        <td>Number or <router-link :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcut</router-link>
        </td>
        <td><span class="inline-code">0</span>, <span class="inline-code">last</span></td>
        <td>No, if <span class="inline-code">range</span> is set</td>
      </tr>
      <tr>
        <td>range</td>
        <td>Pages range.</td>
        <td>Array of 2 numbers or <router-link
            :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcuts</router-link></td>
        <td><span class="inline-code">[0, 2]</span>, <span class="inline-code">['last-1', 'last']</span></td>
        <td>No, if <span class="inline-code">page</span> is set</td>
      </tr>
      <tr>
        <td>box</td>
        <td>Cropping box.</td>
        <td>Array of <router-link
            :to="{ name: 'guides-coordinates-sizes', hash: '#coordinates' }">coordinates</router-link> and <router-link
            :to="{ name: 'guides-coordinates-sizes', hash: '#sizes' }">sizes</router-link> (<span
            class="inline-code">[left, top, width, height]</span>)</td>
        <td><span class="inline-code">[20, 20, '50w', '70h']</span></td>
        <td>No, if <span class="inline-code">margins</span> is set</td>
      </tr>
      <tr>
        <td>margins</td>
        <td>Margins of the 4 edges of the page to calculate the cropping area.</td>
        <td>Array of <router-link :to="{ name: 'guides-coordinates-sizes', hash: '#sizes' }">sizes</router-link> (<span
            class="inline-code">[left, top, right, bottom]</span>)</td>
        <td><span class="inline-code">[20, '10h', 20, '10h']</span></td>
        <td>No, if <span class="inline-code">box</span> is set</td>
      </tr>
    </vue-parameters-table>
  </div>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'crop-pages',
        options: { pages: [{ page: 'all', box: [10, 20, 300, 200] }] },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Delete -->
  <h4 id="delete-pages">Delete pages</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>pages</td>
      <td>Pages or ranges to delete.</td>
      <td>Array of <router-link :to="{ name: 'guides-page-instructions' }">page
          instructions</router-link></td>
      <td>True</td>
    </tr>
  </vue-parameters-table>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'delete-pages',
        options: { pages: [0, { range: ['last-1', 'last'] }] },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Duplicate -->
  <h4 id="duplicate-pages">Duplicate pages</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>pages</td>
      <td>Page duplication instructions.</td>
      <td>Array of <a href="/docs/process#page-duplication-instruction">page duplication instructions</a></td>
      <td>True</td>
    </tr>
  </vue-parameters-table>
  <div class="indent">
    <div class="flex q-gutter-x-md items-center">
      <h5 id="page-duplication-instruction">Page duplication instruction</h5>
      <div class="text-body2">Inherits from <router-link :to="{ name: 'guides-page-instructions' }">Page
          instruction</router-link></div>
    </div>
    <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Examples', 'Required', 'Default']">
      <tr>
        <td>page</td>
        <td>Page index.</td>
        <td>Number or <router-link :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcut</router-link>
        </td>
        <td><span class="inline-code">0</span>, <span class="inline-code">last</span></td>
        <td>No, if <span class="inline-code">range</span> is set</td>
        <td></td>
      </tr>
      <tr>
        <td>range</td>
        <td>Pages range.</td>
        <td>Array of 2 numbers or <router-link
            :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcuts</router-link></td>
        <td><span class="inline-code">[0, 2]</span>, <span class="inline-code">['last-1', 'last']</span></td>
        <td>No, if <span class="inline-code">page</span> is set</td>
        <td></td>
      </tr>
      <tr>
        <td>duplicates</td>
        <td>Number of duplicates to create.</td>
        <td>Number</td>
        <td><span class="inline-code">1</span>, <span class="inline-code">5</span></td>
        <td>No</td>
        <td>1</td>
      </tr>
      <tr>
        <td>group</td>
        <td>When duplicating a range of pages, indicates whether the pages will be inserted consecutively (grouped) or
          each following its original page.</td>
        <td>Boolean</td>
        <td><span class="inline-code">true</span>, <span class="inline-code">false</span></td>
        <td>No</td>
        <td><span class="inline-code">true</span></td>
      </tr>
      <tr>
        <td>position</td>
        <td>The position at which the duplicate page will be inserted. In the case of a range duplication, indicates the
          position of the first duplicate (only if <span class="inline-code">group</span> = <span
            class="inline-code">true</span>).</td>
        <td>Number or <router-link :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcut</router-link>
        </td>
        <td><span class="inline-code">0</span>, <span class="inline-code">last</span></td>
        <td>No</td>
        <td>The original page index + 1</td>
      </tr>
    </vue-parameters-table>
  </div>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'duplicate-pages',
        options: { pages: [{ page: 0, duplicates: 2, position: 'last' }] },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Excel to PDF -->
  <h4 id="excel-to-pdf">Excel to PDF</h4>
  <p>
    This tool does not offer additional options.
  </p>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'excel-to-pdf',
      }
    </code>
  </pre>

  <q-separator />

  <!-- Images to PDF -->
  <h4 id="images-to-pdf">Images to PDF</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required', 'Default']">
    <tr>
      <td>page-size</td>
      <td>The size of the generated pages. <span class="inline-code">fit</span> allows you to generate pages of the size
        of the images, <span class="inline-code">A4</span> allows you to create an A4 page in which the image is
        inserted.</td>
      <td>String (<span class="inline-code">fit</span> or <span class="inline-code">A4</span>)</td>
      <td>No</td>
      <td><span class="inline-code">fit</span></td>
    </tr>
    <tr>
      <td>margins</td>
      <td>Margins around images.</td>
      <td><router-link :to="{ name: 'guides-coordinates-sizes', hash: '#sizes' }">Size</router-link> (for a common
        margin) or array of <router-link :to="{ name: 'guides-coordinates-sizes', hash: '#sizes' }">sizes</router-link>
        (<span class="inline-code">[left, top, right, bottom]</span>)</td>
      <td>No</td>
      <td>0</td>
    </tr>
    <tr>
      <td>split</td>
      <td>Whether a PDF is created for each image or a single PDF containing all images.</td>
      <td>Boolean</td>
      <td>No</td>
      <td><span class="inline-code">false</span></td>
    </tr>
  </vue-parameters-table>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'images-to-pdf',
        options: {
            'page-size': 'A4',
            margins: '10h',
          }
      }
    </code>
  </pre>

  <q-separator />

  <!-- Merge -->
  <h4 id="merge">Merge PDFs</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required', 'Example']">
    <tr>
      <td>order</td>
      <td>The order in which the files will be merged. The values correspond to the indexes of the files resulting from
        the previous task (or the order of adding the files to the pipeline if this task is first).</td>
      <td>Array of numbers</td>
      <td>No</td>
      <td><span class="inline-code">[1, 0, 2]</span></td>
    </tr>
  </vue-parameters-table>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'merge',
        options: { order: [1, 0] },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Order -->
  <h4 id="order-pages">Order pages</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>pages</td>
      <td>Page ordering instructions.</td>
      <td>Array of <a href="/docs/process#page-ordering-instruction">page ordering instructions</a></td>
      <td>True</td>
    </tr>
  </vue-parameters-table>
  <div class="indent">
    <div class="flex q-gutter-x-md items-center">
      <h5 id="page-ordering-instruction">Page ordering instruction</h5>
      <div class="text-body2">Inherits from <router-link :to="{ name: 'guides-page-instructions' }">Page
          instruction</router-link></div>
    </div>
    <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Examples', 'Required']">
      <tr>
        <td>page</td>
        <td>Page index.</td>
        <td>Number or <router-link :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcut</router-link>
        </td>
        <td><span class="inline-code">0</span>, <span class="inline-code">last</span></td>
        <td>No, if <span class="inline-code">range</span> is set</td>
      </tr>
      <tr>
        <td>range</td>
        <td>Pages range.</td>
        <td>Array of 2 numbers or <router-link
            :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcuts</router-link></td>
        <td><span class="inline-code">[0, 2]</span>, <span class="inline-code">['last-1', 'last']</span></td>
        <td>No, if <span class="inline-code">page</span> is set</td>
      </tr>
      <tr>
        <td>shift</td>
        <td>The offset positions to apply to the page or range (positive to move to the end of the file, negative to
          shift to the beginning).</td>
        <td>Number</td>
        <td><span class="inline-code">1</span>, <span class="inline-code">-2</span></td>
        <td>No, if <span class="inline-code">position</span> is set</td>
      </tr>
      <tr>
        <td>position</td>
        <td>The new position of the page or range. When using a <span class="inline-code">range</span> instruction, the
          given position indicates the position of the first page, and the next pages in the range will be moved
          following.</td>
        <td>Number (index) or <router-link
            :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcut</router-link>
        </td>
        <td><span class="inline-code">2</span>, <span class="inline-code">last-1</span></td>
        <td>No, if <span class="inline-code">shift</span> is set</td>
      </tr>
    </vue-parameters-table>
  </div>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'order-pages',
        options: { pages: [{ page: 0, shift: 2 }, { page: 'last', position: 0 }] },
      }
    </code>
  </pre>

  <q-separator />

  <!-- PDF to images -->
  <h4 id="pdf-to-images">PDF to images</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>pages</td>
      <td>Pages or ranges to convert. By default, all the pages will be converted.</td>
      <td>Array of <router-link :to="{ name: 'guides-page-instructions' }">page
          instructions</router-link></td>
      <td>No</td>
    </tr>
  </vue-parameters-table>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'pdf-to-images',
        options: { pages: ['all'] },
      }
    </code>
  </pre>

  <q-separator />

  <!-- PowerPoint to PDF -->
  <h4 id="ppt-to-pdf">PowerPoint to PDF</h4>
  <p>
    This tool does not offer additional options.
  </p>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'ppt-to-pdf',
      }
    </code>
  </pre>

  <q-separator />

  <!-- Remove password -->
  <h4 id="remove-password">Remove PDF password</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>password</td>
      <td>The current password.</td>
      <td>String</td>
      <td>Yes</td>
    </tr>
  </vue-parameters-table>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'remove-password',
        options: { password: 'pwd_t0_r3m0v3' },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Rotate -->
  <h4 id="rotate-pages">Rotate pages</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>pages</td>
      <td>Page rotation instructions</td>
      <td>Array of <a href="/docs/process#page-rotation-instruction">page rotation instructions</a></td>
      <td>True</td>
    </tr>
  </vue-parameters-table>
  <div class="indent">
    <div class="flex q-gutter-x-md items-center">
      <h5 id="page-rotation-instruction">Page rotation instruction</h5>
      <div class="text-body2">Inherits from <router-link :to="{ name: 'guides-page-instructions' }">Page
          instruction</router-link></div>
    </div>
    <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Examples', 'Required']">
      <tr>
        <td>page</td>
        <td>Page index.</td>
        <td>Number or <router-link :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcut</router-link>
        </td>
        <td><span class="inline-code">0</span>, <span class="inline-code">last</span></td>
        <td>No, if <span class="inline-code">range</span> or <span class="inline-code">current</span> is set</td>
      </tr>
      <tr>
        <td>range</td>
        <td>Pages range.</td>
        <td>Array of 2 numbers or <router-link
            :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcuts</router-link></td>
        <td><span class="inline-code">[0, 2]</span>, <span class="inline-code">['last-1', 'last']</span></td>
        <td>No, if <span class="inline-code">page</span> or <span class="inline-code">current</span> is set</td>
      </tr>
      <tr>
        <td>current</td>
        <td>All pages currently having this rotation value.</td>
        <td>Number (<span class="inline-code">0</span>, <span class="inline-code">90</span>, <span
            class="inline-code">180</span> or <span class="inline-code">270</span>)</td>
        <td><span class="inline-code">90</span></td>
        <td>No, if <span class="inline-code">page</span> or <span class="inline-code">range</span> is set</td>
      </tr>
      <tr>
        <td>rotation</td>
        <td>The new rotation of the targeted pages</td>
        <td>Number (<span class="inline-code">0</span>, <span class="inline-code">90</span>, <span
            class="inline-code">180</span> or <span class="inline-code">270</span>)</td>
        <td><span class="inline-code">180</span></td>
        <td>Yes</td>
      </tr>
    </vue-parameters-table>
  </div>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'rotate-pages',
        options: { pages: [{ page: 'all', rotation: 90 }] },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Sign -->
  <h4 id="sign">Sign PDF</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>signatures</td>
      <td>Signatures to add</td>
      <td>Array of <a href="/docs/process#signature-instruction">signature instructions</a></td>
      <td>True</td>
    </tr>
  </vue-parameters-table>
  <div class="indent">
    <h5 id="signature-instruction">Signature instruction</h5>
    <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Examples', 'Required', 'Default']">
      <tr>
        <td>pages</td>
        <td>The pages on which to add the signature.</td>
        <td>Array of <router-link :to="{ name: 'guides-page-instructions' }">page instructions</router-link></td>
        <td><span class="inline-code">[0]</span>, <span class="inline-code">[0, 'last']</span>, <span
            class="inline-code">[{range: [0, 3]}]</span></td>
        <td>Yes</td>
        <td></td>
      </tr>
      <tr>
        <td>box</td>
        <td>Rectangle in which the signature will be contained. Allows you to indicate the position and size of the
          signature. The signature will occupy as much space as possible in this rectangle and will be centered.</td>
        <td>Array of <router-link
            :to="{ name: 'guides-coordinates-sizes', hash: '#coordinates' }">coordinates</router-link> and <router-link
            :to="{ name: 'guides-coordinates-sizes', hash: '#sizes' }">sizes</router-link> (<span
            class="inline-code">[left, top, width, height]</span>)</td>
        <td><span class="inline-code">['90w', '80h', 200, 100]</span></td>
        <td>Yes</td>
        <td></td>
      </tr>
      <tr>
        <td>file</td>
        <td>The field name used in the <span class="inline-code">multipart/form-data</span> request for the signature
          file. Alternatively, use the <span class="inline-code">text</span> option to add a signature from text.</td>
        <td>String</td>
        <td><span class="inline-code">'my-signature'</span></td>
        <td>No, if <span class="inline-code">text</span> is set</td>
        <td></td>
      </tr>
      <tr>
        <td>text</td>
        <td>The text to use to generate a signature or any text content.</td>
        <td>String</td>
        <td><span class="inline-code">'Mr. John Doe'</span></td>
        <td>No, if <span class="inline-code">file</span> is set</td>
        <td></td>
      </tr>
      <tr>
        <td>color</td>
        <td>The color of the text in hexadecimal format. Only useful when using the <span
            class="inline-code">text</span> option.</td>
        <td>String</td>
        <td><span class="inline-code">#ff00ff</span></td>
        <td>No</td>
        <td><span class="inline-code">#000000</span></td>
      </tr>
      <tr>
        <td>font</td>
        <td>The font of the text, among <router-link :to="{ name: 'guides-fonts' }">those available</router-link>. Only
          useful when using the <span class="inline-code">text</span> option.</td>
        <td>String</td>
        <td><span class="inline-code">special-elite</span></td>
        <td>No</td>
        <td><span class="inline-code">libre-baskerville</span></td>
      </tr>
      <tr>
        <td>rotation</td>
        <td>A rotation to apply to the signature, in degrees.</td>
        <td>Number</td>
        <td><span class="inline-code">25</span></td>
        <td>No</td>
        <td><span class="inline-code">0</span></td>
      </tr>
    </vue-parameters-table>
  </div>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'sign',
        options: {
          signatures: [
            {
              box: [30, 50, 150, 100],
              file: 'signature-1',
              pages: ['last'],
            },
          ],
        },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Split -->
  <h4 id="split">Split/extract PDF pages</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Examples', 'Required']">
    <tr>
      <td>cuts</td>
      <td>Positions where to cut the original file.</td>
      <td>Array of numbers (indexes of pages after which to cut) or <router-link
          :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcuts</router-link></td>
      <td><span class="inline-code">[2, 5]</span></td>
      <td>No, if <span class="inline-code">files</span> or <span class="inline-code">interval</span> is set</td>
    </tr>
    <tr>
      <td>files</td>
      <td>List of files to create from pages.</td>
      <td>Array of <a href="/docs/process#split-file-instruction">split file instructions</a></td>
      <td><span class="inline-code">[{pages: [0, 10]}]</span></td>
      <td>No, if <span class="inline-code">cuts</span> or <span class="inline-code">interval</span> is set</td>
    </tr>
    <tr>
      <td>interval</td>
      <td>Page interval after which a new cut is created. For sintance, an interval of <span
          class="inline-code">2</span> allows the file to be split every 2 pages.</td>
      <td>Number</td>
      <td><span class="inline-code">2</span></td>
      <td>No, if <span class="inline-code">files</span> or <span class="inline-code">cuts</span> is set</td>
    </tr>
  </vue-parameters-table>
  <div class="indent">
    <h5 id="split-file-instruction">Split file instruction</h5>
    <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Examples', 'Required']">
      <tr>
        <td>pages</td>
        <td>Pages or ranges to include in that file.</td>
        <td>Array of <router-link :to="{ name: 'guides-page-instructions' }">page
            instructions</router-link></td>
        <td><span class="inline-code">[0, 1]</span>, <span class="inline-code">[{ range: [2, 8] }, 'last']</span></td>
        <td>Yes</td>
      </tr>
    </vue-parameters-table>
  </div>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'split',
        options: { cuts: ['last/2'] },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Watermark -->
  <h4 id="watermark">Add watermark</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>watermarks</td>
      <td>Watermarks to add</td>
      <td>Array of <a href="/docs/process#watermark-instruction">watermark instructions</a></td>
      <td>True</td>
    </tr>
  </vue-parameters-table>
  <div class="indent">
    <h5 id="watermark-instruction">Watermark instruction</h5>
    <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Examples', 'Required', 'Default']">
      <tr>
        <td>pages</td>
        <td>The pages on which to add the watermark.</td>
        <td>Array of <router-link :to="{ name: 'guides-page-instructions' }">page instructions</router-link></td>
        <td><span class="inline-code">['all']</span>, <span class="inline-code">[0, 'last']</span>, <span
            class="inline-code">[{range: [0, 3]}]</span></td>
        <td>Yes</td>
        <td></td>
      </tr>
      <tr>
        <td>box</td>
        <td>Rectangle in which the watermark will be contained. Allows you to indicate the position and size of the
          watermark. The watermark will occupy as much space as possible in this rectangle and will be centered.</td>
        <td>Array of <router-link
            :to="{ name: 'guides-coordinates-sizes', hash: '#coordinates' }">coordinates</router-link> and <router-link
            :to="{ name: 'guides-coordinates-sizes', hash: '#sizes' }">sizes</router-link> (<span
            class="inline-code">[left, top, width, height]</span>)</td>
        <td><span class="inline-code">['90w', '80h', 200, 100]</span></td>
        <td>Yes</td>
        <td></td>
      </tr>
      <tr>
        <td>file</td>
        <td>The field name used in the <span class="inline-code">multipart/form-data</span> request for the watermark
          file. Alternatively, use the <span class="inline-code">text</span> option to add a watermark from text.</td>
        <td>String</td>
        <td><span class="inline-code">'my-watermark'</span></td>
        <td>No, if <span class="inline-code">text</span> is set</td>
        <td></td>
      </tr>
      <tr>
        <td>text</td>
        <td>The text to use to generate a watermark.</td>
        <td>String</td>
        <td><span class="inline-code">'Mr. John Doe'</span></td>
        <td>No, if <span class="inline-code">file</span> is set</td>
        <td></td>
      </tr>
      <tr>
        <td>color</td>
        <td>The color of the text in hexadecimal format. Only useful when using the <span
            class="inline-code">text</span> option.</td>
        <td>String</td>
        <td><span class="inline-code">#ff00ff</span></td>
        <td>No</td>
        <td><span class="inline-code">#000000</span></td>
      </tr>
      <tr>
        <td>font</td>
        <td>The font of the text, among <router-link :to="{ name: 'guides-fonts' }">those available</router-link>. Only
          useful when using the <span class="inline-code">text</span> option.</td>
        <td>String</td>
        <td><span class="inline-code">special-elite</span></td>
        <td>No</td>
        <td><span class="inline-code">libre-baskerville</span></td>
      </tr>
      <tr>
        <td>rotation</td>
        <td>A rotation to apply to the watermark, in degrees.</td>
        <td>Number</td>
        <td><span class="inline-code">45</span></td>
        <td>No</td>
        <td><span class="inline-code">0</span></td>
      </tr>
      <tr>
        <td>opacity</td>
        <td>Watermark opacity.</td>
        <td>Number (between 0 and 1, 0 being full transparency, and 1 being full opacity)</td>
        <td><span class="inline-code">0.5</span></td>
        <td>No</td>
        <td><span class="inline-code">1</span></td>
      </tr>
    </vue-parameters-table>
  </div>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'sign',
        options: {
          watermarks: [
            {
              box: ['50w', '50h', 300, 300],
              text: 'confidential',
              color: '#ff0000',
              font: 'special-elite',
              rotation: -45,
              opacity: 0.5,
              pages: ['all'],
            },
          ],
        },
      }
    </code>
  </pre>

  <q-separator />

  <!-- Word to PDF -->
  <h4 id="word-to-pdf">Word to PDF</h4>
  <p>
    This tool does not offer additional options.
  </p>
  <h5>Example</h5>
  <pre>
    <code class="language-javascript">
      {
        tool: 'word-to-pdf',
      }
    </code>
  </pre>

  <q-separator />

  <h2 id="pipeline-options">Pipeline options</h2>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Default']">
    <!-- Download format -->
    <tr>
      <td>format</td>
      <td>The download format of files generated by the pipeline (separate files or archived in a zip file).</td>
      <td>String, <span class="inline-code">file</span> or <span class="inline-code">archive</span></td>
      <td><span class="inline-code">file</span></td>
    </tr>
    <!-- File names -->
    <tr>
      <td>file-names</td>
      <td>Pipeline output file names. This array must be based on the order of the files output from the last task in
        the pipeline. You can include <a href="/docs/process#filename-shortcuts">filename shortcuts</a>.</td>
      <td>Array of strings</td>
      <td>None, <span class="inline-code">file-names-pattern</span> is used by default.</td>
    </tr>
    <!-- File names pattern -->
    <tr>
      <td>file-names-pattern</td>
      <td>A pattern to generate the name of output files. You can include <a
          href="/docs/process#filename-shortcuts">filename shortcuts</a>. If the indicated pattern does not allow having
        all different file names, a <span class="inline-code">{nb}</span> prefix will be automatically applied.</td>
      <td>String</td>
      <td><span class="inline-code">{tool}_{nb}</span></td>
    </tr>
    <!-- Archive name -->
    <tr>
      <td>archive-name</td>
      <td>The name of the zip archive file, if <span class="inline-code">format</span> is <span
          class="inline-code">archive</span>. You can use <span class="inline-code">file-names</span> or <span
          class="inline-code">file-names-pattern</span> to customize the name of files inside the archive.</td>
      <td>String</td>
      <td><span class="inline-code">{tool}</span></td>
    </tr>
    <!-- Wait mode -->
    <tr>
      <td>mode</td>
      <td>If the query waits for the pipeline to be processed completely to return a result or if the query triggers the
        pipeline (executed in the background) and immediately returns a result.</td>
      <td><a href="/docs/process#wait-modes">Wait mode</a></td>
      <td><span class="inline-code">wait</span></td>
    </tr>
    <tr>
      <td>webhook-url</td>
      <td>Webhook called with a <span class="inline-code">POST</span> request when the pipeline is complete. Only taken
        into account when <span class="inline-code">mode</span> is <span class="inline-code">async</span>.</td>
      <td>String</td>
      <td></td>
    </tr>
    <!-- Input files passwords -->
    <tr>
      <td>passwords</td>
      <td>Input files passwords. Object whose keys are the names of the fields used for the <span
          class="inline-code">multipart/form-data</span> files and whose values are the associated passwords.</td>
      <td>Object</td>
      <td></td>
    </tr>
  </vue-parameters-table>
  <div class="indent">
    <h5 id="filename-shortcuts">Filename shortcuts</h5>
    <ul>
      <li><span class="inline-code">{nb}</span>: the index of the file, according to the result of the last task</li>
      <li><span class="inline-code">{date}</span>: the current date when the file was generated by the API</li>
      <li><span class="inline-code">{tool}</span>: the name of the last tool of the pipeline</li>
    </ul>
    <h5 id="wait-modes">Wait modes</h5>
    <ul>
      <li>
        <span class="inline-code">wait</span>: the request will wait until the pipeline is completely finished to return
        a
        result.
        <h5>Response example</h5>
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
      </li>
      <li>
        <span class="inline-code">async</span>: the request will return a result as soon as the pipeline has started.
        <span class="inline-code">webhook-url</span> will be called when the pipeline is completed, with a body in the
        format of a <span class="inline-code">wait</span> mode response.
        <h5>Response example</h5>
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
      </li>
    </ul>
  </div>

  <h2>Errors</h2>
  <vue-parameters-table :cols="['HTTP code', 'Description']">
    <!-- Download format -->
    <tr>
      <td>400 - Bad Request</td>
      <td>The request was unacceptable, often due to missing or incompatible parameters or tasks.</td>
    </tr>
    <tr>
      <td>401 - Unauthorized</td>
      <td>No valid API key provided.</td>
    </tr>
    <tr>
      <td>403 - Forbidden</td>
      <td>The API key doesn't have permissions to perform the request, often due to insufficient number of credits.</td>
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

import tools from 'src/resources/tools.js';
import { CompressionLevel, getCompressionLevelInfo } from 'src/types/compressionLevel';
import Feature from 'src/types/feature';

import vueParametersTable from '../../components/docs/vue-parameters-table.vue';

export default defineComponent({
  name: 'ProcessDocsPost',
  components: {
    vueParametersTable,
  },
  data() {
    return {
      tools: tools.sort((a: Feature, b: Feature) => ((a.id && b.id && a.id > b.id) ? 1 : -1)),
      CompressionLevel,
    };
  },
  methods: {
    getCompressionLevelInfo,
  },
});
</script>
