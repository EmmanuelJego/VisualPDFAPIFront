<template>
  <h1>Duplicate PDF pages</h1>
  <p>
    Learn how to clone one or more pages from a PDF and how to position them using the Visual PDF REST API.
  </p>

  <h2>Basic page duplication</h2>
  <p>
    In your <router-link :to="{ name: 'guides-pipelines' }">pipeline</router-link> definition, add a task for the <span
      class="inline-code">duplicate-pages</span> tool.
  </p>
  <p>
    The <span class="inline-code">options</span> parameter allows you to specify which pages you want to duplicate from
    the PDF, based on their indexes.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      form.append(
        'tasks',
        [
          {
            tool: 'duplicate-pages',
            // Duplicate the first and second pages
            options: { pages: [0, 1] },
          },
        ],
      );
    </code>
  </pre>

  <h2>Position of new pages</h2>
  <p>
    By default, new pages are inserted following their source page.
  </p>
  <p>
    However, it is possible to define the position of the new pages
  </p>
  <pre>
    <code class="language-javascript">
      // Duplicate the second page and move it to the first position
      options: { pages: [{ page: 1, position: 0 }] }
    </code>
  </pre>

  <h2>Range duplication</h2>
  <p>
    The API allows you to duplicate a range of pages, rather than listing all indexes one-by-one.
  </p>
  <pre>
    <code class="language-javascript">
      // Duplicate the first 5 pages
      options: { pages: [{ range: [0, 4] }] }
    </code>
  </pre>

  <h3>Grouping new pages</h3>
  <p>
    By default, when you duplicate a range of pages, the new pages will be grouped after the initial pages.
  </p>
  <p>
    You can change this behavior by specifying the <span class="inline-code">group</span> parameter.
  </p>
  <pre>
    <code class="language-javascript">
      // Duplicate the first 5 pages, and insert them each following their initial page
      options: { pages: [{ range: [0, 4], group: false }] }
    </code>
  </pre>
  <p>
    In that case, you will not be able to use the <span class="inline-code">position</span> parameter.
  </p>

  <h2>Multiple duplicates</h2>
  <p>
    By default, pages are only duplicated once, but you can define a custom number of duplications.
  </p>
  <pre>
    <code class="language-javascript">
      // Duplicate the first page twice
      options: { pages: [{ page: 0, duplicates: 2 }] }
    </code>
  </pre>

  <h2>Combine duplications</h2>
  <p>
    You can define several duplication instructions.
  </p>
  <p>
    The instructions are executed in the order given in the <span class="inline-code">pages</span> parameter. That way,
    you can use the previously duplicated pages in the next duplication instruction, or compute the right indexes
    according to the previous duplications.
  </p>
  <pre>
    <code class="language-javascript">
      options: {
        pages: [
          // Duplicate the first page
          0,
          // Duplicate the second page and move it to the last position
          { page: 1, position: 'last' },
          // Duplicate the 3 last pages twice, insterting new pages next to their source page
          { range: ['last-3', 'last'], group: false, duplicates: 2 },
        ],
      },
    </code>
  </pre>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DuplicateGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guide - How to duplicate PDF pages',
    description: 'Learn how to clone one or more pages from a PDF and how to position them using the Visual PDF REST API.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
