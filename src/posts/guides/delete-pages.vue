<template>
  <h1>Delete PDF pages</h1>
  <p>
    The removal tool allows you to delete one or more pages from a PDF. Find out how to use it very simply in this
    guide.
  </p>

  <h2>Basic page deletion</h2>
  <p>
    In order to use the page deletion tool, add a task in your <router-link
      :to="{ name: 'guides-pipelines' }">pipeline</router-link> that targets the <span
      class="inline-code">delete-pages</span> tool.
  </p>
  <p>
    The <span class="inline-code">options</span> parameter allows you to specify which pages you want to delete from
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
            tool: 'delete-pages',
            // Delete the first and second pages
            options: { pages: [0, 1] },
          },
        ],
      );
    </code>
  </pre>

  <h2>Range deletion</h2>
  <p>
    The API allows you to remove a range of pages, rather than listing all indexes one-by-one.
  </p>
  <pre>
    <code class="language-javascript">
      // Delete the first 5 pages
      options: { pages: [{ range: [0, 4] }] }
    </code>
  </pre>

  <h2>Multiple removal instructions</h2>
  <p>
    You can define several removal instructions.
  </p>
  <p>
    The instructions are executed in the order given in the <span class="inline-code">pages</span> parameter. It is
    therefore important to know that for instruction <span class="inline-code">n</span>, the indices must be calculated
    taking into account instruction <span class="inline-code">n-1</span>.
  </p>
  <pre>
    <code class="language-javascript">
      options: {
        pages: [
          // Delete the first page
          0,
          // Delete the 3 last pages
          { range: ['last-3', 'last'] },
        ],
      },
    </code>
  </pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeleteGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
