<template>
  <h1>Add PDF password</h1>
  <p>
    With this guide, you will learn how the Visual PDF API allows you to protect a PDF by adding a password that will
    prevent anyone from accessing the document without having entered it.
  </p>

  <h2>Basic password addition to PDF</h2>
  <p>
    The PDF protection tool by adding a password can be used in a <router-link
      :to="{ name: 'guides-pipelines' }">pipeline</router-link> via a <span class="inline-code">add-password</span> type
    task.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      form.append(
        'tasks',
        [
          {
            tool: 'add-password',
            options: {
              password: 'my_sup3r_s3cr3t_pwd',
            },
          },
        ],
      );
    </code>
  </pre>

  <h2>Constraint of using an add password task</h2>
  <p>
    If your pipeline contains multiple tasks, the add password task should be last.
  </p>
  <p>
    It is in fact useless and counter-productive to add a password to a temporary file which will be processed later by
    another task.
  </p>
  <p>
    Files saved (temporarily) on our servers are in all cases encrypted and therefore unreadable. So you don't have to
    worry that a non-password protected file saved on our servers can be obtained in any way and then read.
  </p>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddPasswordGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guide - Learn how to add a password to PDFs',
    description: 'With this guide, you will learn how the Visual PDF API allows you to protect a PDF by adding a password that will prevent anyone from accessing the document without having entered it.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
