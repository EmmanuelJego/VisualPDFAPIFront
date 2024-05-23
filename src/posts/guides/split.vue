<template>
  <h1>Split and extract PDF pages</h1>
  <p>
    Through this guide, discover how you can create new PDFs by extracting pages from existing documents.
  </p>
  <p>
    Splitting documents and extracting pages can be achieved with a single tool. You have different options for
    extracting pages, allowing you to create new documents based on the input file pages.
  </p>
  <p>
    In your <router-link :to="{ name: 'guides-pipelines' }">pipeline</router-link> definition, add a task for the <span
      class="inline-code">split</span> tool.
  </p>

  <h2>Pages extraction methods</h2>

  <h3>Cut a PDF into several parts</h3>
  <p>
    This method allows you to cut a PDF at precise positions.
  </p>
  <p>
    Each cut creates a new output PDF. Each cut creates a new output PDF. So, one cut will result in 2 output files, 2
    cuts in 3 files, and so on.
  </p>
  <p>
    Use the <span class="inline-code">cut</span> parameter to choose this method.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      form.append(
        'tasks',
        [
          {
            tool: 'split',
            options: {
              // Cutting the document after the 2nd and 6th pages (3 new documents)
              cuts: [2, 6],
            },
          },
        ],
      );
    </code>
  </pre>

  <h3>Create PDFs from pages</h3>
  <p>
    With this method, you will be able to create one or more files, giving the pages you want to include in each.
  </p>
  <p>
    Use the <span class="inline-code">files</span> parameter to choose this method.
  </p>
  <pre>
    <code class="language-javascript">
      options: {
        files: [
          // Creating one file taking the first and second pages
          { pages: [0, 1] },
          // Creating another file taking the 3rd to 7th pages, plus the last one
          { pages: [{ range: [2, 8], 'last' }] },
        ],
      }
    </code>
  </pre>

  <h3>Cut a PDF with an interval</h3>
  <p>
    This last method allows you to split a PDF every <span class="inline-code">X</span> pages (<span
      class="inline-code">X</span> being the given interval).
  </p>
  <p>
    For example, let's take a file of 1 to pages, with an interval of 2. This method will allow you to obtain 5 files,
    each containing 2 pages.
  </p>
  <p>
    Use the <span class="inline-code">interval</span> parameter to choose this method.
  </p>
  <pre>
    <code class="language-javascript">
      options: {
        // Cut the PDF every 2 pages
        interval: 2,
      }
    </code>
  </pre>

  <h2>Handling multiple input files</h2>
  <p>
    When multiple files are processed by a split/extract task, you must ensure that the task options are compatible with
    all files.
  </p>
  <p>
    If you know in advance that the options cannot match all the files in the task, you will need to create several
    tasks, each processing the file(s) compatible with its options.
  </p>
  <p>
    If the options are not compatible with a file to be processed, an error will be returned and the pipeline will fail.
  </p>
  <pre>
    <code class="language-javascript">
      const form = new FormData();

      // My pipeline treats 2 files
      form.append('file-1', myFirstFile);
      form.append('file-2', mySecondFile);

      form.append('tasks', [
        {
          tool: 'split',
          // Splitting the first file
          files: [0],
          options: {
            // Creating 2 output files
            files: [
              {pages: [0, 10]},
              {pages: [1, 11]},
            ],
          },
        },
        {
          tool: 'split',
          // Splitting the second file
          files: [1],
          options: {
            // Cut the PDF at the middle
            cuts: ['last/2'],
          },
        },
      ]);
    </code>
  </pre>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExtractGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
