<template>
  <h1>Images to PDF</h1>
  <p>
    Use the Visual PDF API to turn images (JPG, PNG) into PDF.
  </p>

  <h2>Basic images to PDF transformation</h2>
  <p>
    The images to PDF transformation tool is accessible in a <router-link
      :to="{ name: 'guides-pipelines' }">pipeline</router-link> using a <span class="inline-code">images-to-pdf</span>
    task.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding 2 images to the pipeline
      form.append('image-1', myFirstImage);
      form.append('image-2', mySecondImage);

      // Turning the images in a PDF
      form.append('tasks', [{ tool: 'images-to-pdf' }]);
    </code>
  </pre>

  <!-- WORKAROUND: comment needed when having a ul and pre tags following each other -->

  <h2>Custom page size</h2>
  <p>
    By default, the pages of the generated PDF will have the size of the images.
  </p>
  <p>
    You can however change this behavior by using the <span class="inline-code">page-size</span> option and choosing
    between one of the following values:
  </p>
  <ul>
    <li>
      <span class="inline-code">fit</span>: this is the default value. With this option, the pages will have the size of
      their image
    </li>
    <li>
      <span class="inline-code">A4</span>: with this option, the images will each be integrated into an A4 page
    </li>
  </ul>
  <pre>
    <code class="language-javascript">
      form.append(
        'tasks',
        [
          {
            tool: 'images-to-pdf',
            // Inserting images into A4 pages
            options: { 'page-size': 'A4' },
          },
        ],
      );
    </code>
  </pre>

  <h2>Custom page margins</h2>
  <p>
    You can add a margin around your images using the <span class="inline-code">margins</span> option.
  </p>
  <p>
    You can set a common margin for all sides (with a single value), or a custom margin for each side (with an array in
    the format <span class="inline-code">[left, top, right, bottom]</span>).
  </p>
  <pre>
    <code class="language-javascript">
      // Generating one PDF per image
      options: {
        'page-size': 'A4',
        // Adding a margin of 10 to the left and right, and a margin of 20 to the top and bottom
        margins: [10, 20, 10, 20],
      }
    </code>
  </pre>
  <p>
    Alternatively, you can use <b>relative units</b> to calculate margins based on image dimensions
  </p>
  <pre>
    <code class="language-javascript">
      // Generating one PDF per image
      options: {
        'page-size': 'A4',
        // Adding a margin of 10% of the image width
        margins: '10w',
      }
    </code>
  </pre>

  <h2>Get one file per image</h2>
  <p>
    If you want a PDF to be generated for each input image (instead of a single PDF containing multiple images), you can
    change the <span class="inline-code">split</span> option.
  </p>
  <pre>
    <code class="language-javascript">
      // Generating one PDF per image
      options: { split: true }
    </code>
  </pre>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ImagesToPDFGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guide - How to convert images to PDF',
    description: 'Create your image to PDF conversion solution easily and quickly with the Visual PDF API. More information in this guide.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
