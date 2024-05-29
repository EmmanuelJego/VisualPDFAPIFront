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
      <td>Array of <a href="/docs/process#task-object">task objects</a></td>
      <td>Yes</td>
    </tr>
    <!-- Options -->
    <tr>
      <td>options</td>
      <td>Pipeline options.</td>
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

  <h3 id="task-object">Task object</h3>
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

  <h3>Task options</h3>

  <!-- Add password -->
  <h4 id="add-password">Add PDF password</h4>
  <span class="inline-code">add-password</span>
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

  <!-- Compress -->
  <h4 id="compress">compress</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Default']">
    <tr>
      <td>level</td>
      <td>The level of compression used.</td>
      <td><a href="/docs/process#compression-levels">Compression level</a></td>
      <td><span class="inline-code">{{ CompressionLevel.Medium }}</span></td>
    </tr>
  </vue-parameters-table>
  <div class="indent">
    <h5 id="compression-levels">Compression levels:</h5>
    <ul>
      <li v-for="level in CompressionLevel" :key="`compression-${level}`"><span class="inline-code">{{ level }}</span>:
        {{
      getCompressionLevelInfo(level)
    }}</li>
    </ul>
  </div>

  <!-- Crop -->
  <h4 id="crop-pages">crop-pages</h4>
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

  <!-- Delete -->
  <h4 id="delete-pages">delete-pages</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>pages</td>
      <td>Pages or ranges to delete.</td>
      <td>Array of <router-link :to="{ name: 'guides-page-instructions' }">page
          instructions</router-link></td>
      <td>True</td>
    </tr>
  </vue-parameters-table>

  <!-- Duplicate -->
  <h4 id="duplicate-pages">duplicate-pages</h4>
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

  <!-- Excel to PDF -->
  <h4 id="excel-to-pdf">excel-to-pdf</h4>
  <p>
    This tool does not offer additional options.
  </p>

  <!-- Images to PDF -->
  <h4 id="images-to-pdf">images-to-pdf</h4>
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

  <!-- Merge -->
  <h4 id="merge">merge</h4>
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

  <!-- Order -->
  <h4 id="order-pages">order-pages</h4>
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

  <!-- PDF to images -->
  <h4 id="pdf-to-images">pdf-to-images</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>pages</td>
      <td>Pages or ranges to convert. By default, all the pages will be converted.</td>
      <td>Array of <router-link :to="{ name: 'guides-page-instructions' }">page
          instructions</router-link></td>
      <td>No</td>
    </tr>
  </vue-parameters-table>

  <!-- PowerPoint to PDF -->
  <h4 id="ppt-to-pdf">ppt-to-pdf</h4>
  <p>
    This tool does not offer additional options.
  </p>

  <!-- Remove password -->
  <h4 id="remove-password">remove-password</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Required']">
    <tr>
      <td>password</td>
      <td>The current password.</td>
      <td>String</td>
      <td>Yes</td>
    </tr>
  </vue-parameters-table>

  <!-- Rotate -->
  <h4 id="rotate-pages">rotate-pages</h4>
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

  <!-- Sign -->
  <h4 id="sign">sign</h4>
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
        <td><span class="inline-code">[0]</span>, <span class="inline-code">[0, 'last']</span>, <span class="inline-code">[{range: [0, 3]}]</span></td>
        <td>Yes</td>
        <td></td>
      </tr>
      <tr>
        <td>box</td>
        <td>Rectangle in which the signature will be contained. Allows you to indicate the position and size of the signature. The signature will occupy as much space as possible in this rectangle and will be centered.</td>
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
        <td>The field name used in the <span class="inline-code">multipart/form-data</span> request for the signature file. Alternatively, use the <span class="inline-code">text</span> option to add a signature from text.</td>
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
        <td>The color of the text in hexadecimal format. Only useful when using the <span class="inline-code">text</span> option.</td>
        <td>String</td>
        <td><span class="inline-code">#ff00ff</span></td>
        <td>No</td>
        <td><span class="inline-code">#000000</span></td>
      </tr>
      <tr>
        <td>font</td>
        <td>The font of the text, among <router-link :to="{ name: 'guides-fonts' }">those available</router-link>. Only useful when using the <span class="inline-code">text</span> option.</td>
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

  <!-- Split -->
  <h4 id="split">split</h4>
  <vue-parameters-table :cols="['Name', 'Description', 'Type', 'Examples', 'Required']">
    <tr>
      <td>cuts</td>
      <td>Positions where to cut the original file.</td>
      <td>Array of numbers (indexes of pages after which to cut) or <router-link :to="{ name: 'guides-page-instructions', hash: '#shortcuts' }">shortcuts</router-link></td>
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
      <td>Page interval after which a new cut is created. For sintance, an interval of <span class="inline-code">2</span> allows the file to be split every 2 pages.</td>
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

  <!-- Watermark -->
  <h4 id="watermark">watermark</h4>
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
        <td><span class="inline-code">['all']</span>, <span class="inline-code">[0, 'last']</span>, <span class="inline-code">[{range: [0, 3]}]</span></td>
        <td>Yes</td>
        <td></td>
      </tr>
      <tr>
        <td>box</td>
        <td>Rectangle in which the watermark will be contained. Allows you to indicate the position and size of the watermark. The watermark will occupy as much space as possible in this rectangle and will be centered.</td>
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
        <td>The field name used in the <span class="inline-code">multipart/form-data</span> request for the watermark file. Alternatively, use the <span class="inline-code">text</span> option to add a watermark from text.</td>
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
        <td>The color of the text in hexadecimal format. Only useful when using the <span class="inline-code">text</span> option.</td>
        <td>String</td>
        <td><span class="inline-code">#ff00ff</span></td>
        <td>No</td>
        <td><span class="inline-code">#000000</span></td>
      </tr>
      <tr>
        <td>font</td>
        <td>The font of the text, among <router-link :to="{ name: 'guides-fonts' }">those available</router-link>. Only useful when using the <span class="inline-code">text</span> option.</td>
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

  <!-- Word to PDF -->
  <h4 id="word-to-pdf">word-to-pdf</h4>
  <p>
    This tool does not offer additional options.
  </p>
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
