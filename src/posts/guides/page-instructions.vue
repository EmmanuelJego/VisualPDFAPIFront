<template>
  <h1>Page instructions</h1>
  <p>
    Some tools allow you (or ask you) to specify which pages of a PDF are to be taken into account.
  </p>
  <p>
    In general, these instructions are to be given in a <span class="inline-code">pages</span> option.
  </p>

  <h2>Methods for targeting pages</h2>
  <p>
    2 methods allow you to indicate pages:
  </p>
  <ul>
    <li>
      <b>page index</b>: this method allows you to target a single page from its position in the file (more precisely
      its index, starting from 0)
      <pre>
        <code class="language-javascript">
          // Targeting the first and second pages
          options: { pages: [0, 1] }
        </code>
      </pre>
      The above instruction is equivalent to the following:
      <pre>
        <code class="language-javascript">
          // Targeting the first and second pages
          options: { pages: [{ page: 0 }, { page: 1 }] }
        </code>
      </pre>
      This format is used by certain tools to be able to add additional parameters (for example the <router-link
        :to="{ name: 'guides-duplicate-pages' }">page duplication tool</router-link>, to be able to add a number of
      duplicates, the position where to place the duplicates, etc.)
    </li>
    <li>
      <b>range</b>: this method allows you to target several successive pages by indicating the first and last page
      <pre>
        <code class="language-javascript">
          // Targeting pages 1 to 5
          options: { pages: [{ range: [0, 4]}] }
        </code>
      </pre>
    </li>
  </ul>
  <p>
    These 2 methods can be combined to indicate both single pages and ranges of pages.
  </p>

  <h2>Shortcuts</h2>
  <p>
    Some shortcuts will allow you to calculate page indexes more easily. These shortcuts are even more useful when you
    do not know in advance the number of pages contained in a PDF.
  </p>
  <p>
    They can be used for any method (single pages and ranges of pages).
  </p>
  <ul>
    <li><span class="inline-code">first</span>: targets the first page (same as specifying <span
        class="inline-code">0</span>)</li>
    <li><span class="inline-code">last</span>: targets the last page</li>
    <li>
      <b>calculation</b>: you can combine a shortcut with a calculation using the operator <span
        class="inline-code">-</span> or <span class="inline-code">/</span> to get the index of a page
      <pre>
        <code class="language-javascript">
          options: {
            pages: [
              'last',   // Last page
              'last-1'  // Second last page
              'last/2'  // Middle page
            ],
          }
        </code>
      </pre>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PagesInstructionsGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
