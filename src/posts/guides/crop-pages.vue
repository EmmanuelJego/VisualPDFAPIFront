<template>
  <h1>Crop PDF pages</h1>
  <p>
    In this guide we will discover how you can use the Visual PDF API to trim pages of a document, adjust their visible
    area, size and margins.
  </p>

  <h2>Basic page cropping</h2>
  <p>
    To use the PDF page cropping tool, you will need to use a <span class="inline-code">crop-pages</span> task in a
    <router-link :to="{ name: 'guides-pipelines' }">file processing pipeline</router-link>.
  </p>
  <p>
    The <span class="inline-code">options</span> parameter allows you to specify which pages you want to crop, based
    on their indexes.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      form.append(
        'tasks',
        [
          {
            tool: 'crop-pages',
            // Cropping the first page with a box in position x=10 y=20, with a width of 300 and height of 200
            options: { pages: [{ page: 0, box: [10, 20, 300, 200] }] },
          },
        ],
      );
    </code>
  </pre>
  <p>
    Different methodes are available to you to crop pages: crop box and margins.
  </p>

  <h3>Cropping with a crop box</h3>
  <p>
    This method allows you to directly indicate the new visible area of the pages, based on a position, a width and a
    height.
  </p>
  <p>
    It is important to know that on a PDF document, the coordinates are calculated starting from the <b>bottom left</b>
    corner. To learn more, consult the <router-link :to="{ name: 'guides-coordinates-sizes' }">guide on coordinates and
      sizes</router-link>.
  </p>
  <p>
    A crop box is always represented with the following format: <span class="inline-code">[x, y, width, height]</span>.
  </p>
  <p>
    There are 2 possible ways to indicate the crop box data:
  </p>
  <ul>
    <li>
      <b>absolute coordinates and dimensions</b>: the data is expressed in absolute size (based on the size of the PDF
      as indicated in its metadata)
      <pre>
        <code class="language-javascript">
          // Cropping the first page with a box in position x=10 y=20, with a width of 300 and height of 200
          options: { pages: [{ page: 0, box: [10, 20, 300, 200] }] }
        </code>
      </pre>
    </li>
    <li>
      <b>relative coordinates and dimensions</b>: the data is expressed in relative size (percentage of the full page
      height and width). This method is especially useful when you do not know the dimensions of the document.
      <pre>
        <code class="language-javascript">
          // Cropping the first page with a box in position x=5% of page width, y=8% of page height, with a width of 50% and height of 60%
          options: { pages: [{ page: 0, box: ['5w', '8h', '50w', '60h'] }] }
        </code>
      </pre>
    </li>
  </ul>
  <p>
    It is possible to mix these two units as you wish.
  </p>

  <h3>Cropping with margins</h3>
  <p>
    The API allows you to crop a page by specifying a margin to apply to all edges of the page rather than having to do
    the calculations yourself.
  </p>
  <p>
    Here also you can indicate the data in relative or absolute units.
  </p>
  <pre>
    <code class="language-javascript">
      // Cropping the first page specifying a margin
      options: { pages: [{ page: 0, margin: 10 }] }
    </code>
  </pre>
  <p>
    You can specify a different margin for each edge of the page (<span class="inline-code">[left, top, right,
      bottom]</span>):
  </p>
  <pre>
    <code class="language-javascript">
      // Cropping the first page specifying a margin for each edge
      options: { pages: [{ page: 0, margin: [10, 0, 10, 0] }] }
    </code>
  </pre>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CropGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guide - How to crop PDF pages',
    description: 'In this guide we will discover how you can use the Visual PDF API to trim pages of a document, adjust their visible area, size and margins.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
