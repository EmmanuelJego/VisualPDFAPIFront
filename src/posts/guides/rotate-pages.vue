<template>
  <h1>Rotate PDF pages</h1>
  <p>
    Rotate PDF pages with an easy-to-use REST API.
  </p>

  <h2>Basic page rotation</h2>
  <p>
    The PDF page rotation tool can be used in a <router-link :to="{ name: 'guides-pipelines' }">pipeline</router-link>
    via a <span class="inline-code">rotate-pages</span> task.
  </p>
  <p>
    The <span class="inline-code">options</span> parameter allows you to specify which pages you want to rotate, based
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
            tool: 'rotate-pages',
            // Set first page rotation to 90 degrees
            options: { pages: [{ page: 0, rotation: 90 }] },
          },
        ],
      );
    </code>
  </pre>
  <p>
    You can specify a rotation of one of the following values:
  </p>
  <ul>
    <li>0</li>
    <li>90</li>
    <li>180</li>
    <li>270</li>
  </ul>

  <h2>Range page rotation</h2>
  <p>
    You can rotate multiple pages in a single statement by specifying a range rather than a list of indexes.
  </p>
  <pre>
    <code class="language-javascript">
      // The rotation of all pages to 90 degrees
      options: { pages: [{ range: [0, 'last'], rotation: 90 }] }
    </code>
  </pre>

  <h2>Target pages with a certain orientation</h2>
  <p>
    The rotation tool allows you to target pages that currently have a certain orientation, allowing you to target them
    without knowing their indexes.
  </p>
  <pre>
    <code class="language-javascript">
      // Update the rotation of all the upside down pages to put them right side up
      options: { pages: [{ current: 180, rotation: 0 }] }
    </code>
  </pre>

  <h2>Multiple rotation instructions</h2>
  <p>
    You can define several rotation instructions.
  </p>
  <p>
    The instructions are executed in the order given in the <span class="inline-code">pages</span> parameter. That means
    that if you give multiple rotation instructions, rotation instructions based on the current pages rotation may
    depand on the previous instructions.
  </p>
  <pre>
    <code class="language-javascript">
      options: {
        pages: [
          // Reversing page rotation...
          // Change the rotation of pages right side up to put them upside down
          { current: 0, rotation: 180 },
          // Change the rotation of pages upside down to put them right side up
          { current: 180, rotation: 0 },
        ],
      },
    </code>
  </pre>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeleteGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guides - How to rotate PDF pages',
    description: 'Learn in this guide how you can change the orientation of PDF pages with a simple REST API.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
