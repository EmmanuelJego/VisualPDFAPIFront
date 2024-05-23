<template>
  <h1>Remove PDF password</h1>
  <p>
    Learn from this guide how you can integrate the Visual PDF API to remove password protection from a PDF file.
  </p>

  <h2>Basic PDF password removal</h2>
  <p>
    To remove the password from a PDF, nothing could be simpler: in the description of your <router-link
      :to="{ name: 'guides-pipelines' }">pipeline</router-link>, add a <span class="inline-code">remove-password</span>
    type task.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      form.append(
        'tasks',
        [
          {
            tool: 'remove-password',
            password: 'my_sup3r_s3cr3t_pwd',
          },
        ],
      );
    </code>
  </pre>

  <h2>Constraint of using a password removal task</h2>
  <p>
    A password removal task should always be called first in a pipeline. It is indeed necessary for the following tasks
    to process files that are not password protected.
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RemovePasswordGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
