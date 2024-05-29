<template>
  <h1>Order PDF pages</h1>
  <p>
    Learn how to use the PDF page move tool to reorder your PDFs.
  </p>

  <h2>Basic page moving</h2>
  <p>
    The PDF reordering tool can be used in a <router-link :to="{ name: 'guides-pipelines' }">pipeline</router-link>
    via a <span class="inline-code">order-pages</span> task.
  </p>
  <p>
    The <span class="inline-code">options</span> parameter allows you to specify which pages you want to move, based
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
            tool: 'order-pages',
            // Shifting the first page by 2 positions downward
            options: { pages: [{ page: 0, shift: 2 }] },
          },
        ],
      );
    </code>
  </pre>
  <p>
    The <span class="inline-code">shift</span> parameter allows you to specify:
  </p>
  <ul>
    <li>an offset towards the end of the file if its value is positive</li>
    <li>an offset towards the start of the file if its value is negative</li>
  </ul>

  <h2>Moving a page range</h2>
  <p>
    If you want to move several successive pages at once, you can use a <span class="inline-code">range</span>
    instruction rather than giving a list of indexes.
  </p>
  <pre>
    <code class="language-javascript">
      // Shifting the first 3 pages by 1 position downward
      options: { pages: [{ range: [0, 2], shift: 1 }] }
    </code>
  </pre>

  <h2>Moving pages to a specific position</h2>
  <p>
    In addition to being able to use a shift, you can also use a target position to move pages.
  </p>
  <pre>
    <code class="language-javascript">
      // Moving the last page to the first position
      options: { pages: [{ page: 'last', position: 0 }] }
    </code>
  </pre>
  <p>
    When using a <span class="inline-code">range</span> instruction, the given position indicates the position of the
    first page. The next pages in the range will be moved following.
  </p>
  <pre>
    <code class="language-javascript">
      // Moving the last 3 pages to the start of the document
      options: { pages: [{ range: ['last-3', 'last'], position: 0 }] }
    </code>
  </pre>

  <h2>Multiple ordering instructions</h2>
  <p>
    You can define several PDF pages ordering instructions.
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
          // Moving the first page to the end of the document
          { page: 0, position: 'last' },
          // Moving the second, third and forth pages to the start of the document
          { range: [1, 3], shift: -1 },
        ],
      },
    </code>
  </pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OrderGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
