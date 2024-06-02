<template>
  <h1>Request workflow</h1>
  <p>
    File processing on the Visual PDF API is broken down into 2 main steps: execution of a pipeline and downloading of
    the files resulting from this processing.
  </p>

  <h2>1. Running a pipeline</h2>
  <p>
    A <router-link :to="{ name: 'guides-pipelines' }">pipeline</router-link> is a series of tasks, allowing file
    modification tools to be chained together, thus being able to combine
    functionalities.
  </p>
  <p>
    It also allows you to define various options to customize the behavior of the query.
  </p>
  <p>
    A pipelines must be sent to the API with a <span class="inline-code">multipart/form-data</span> encoding type.
  </p>
  <p>
    The execution of a pipeline is done via the <router-link :to="{ name: 'docs-process' }"><span
        class="inline-code">process</span> resource</router-link>.
  </p>

  <h2>2. Downloading the processed files</h2>
  <p>
    Once the pipeline is complete, you can download the processed files. These files will be downloadable for a period
    of 1 hour, after which the files will be automatically deleted from our servers.
  </p>
  <p>
    Downloading files is done with the <router-link :to="{ name: 'docs-download' }"><span
        class="inline-code">download</span> resource</router-link>.
  </p>

  <h2>Webhooks</h2>
  <p>
    The <span class="inline-code">mode</span> option of a pipeline allows you to modify the waiting mode for task
    execution. You can therefore choose to wait for the pipeline to be fully processed by our servers to obtain the
    result directly (containing the URLs allowing the files to be downloaded), or to launch the request in the
    background and be notified via a webhook when the processing is completed. The webhook will be called by our servers
    via a <span class="inline-code">POST</span> request containing the processing result, in a format similar to that
    used in "wait" mode.
  </p>
  <p>
    You will be able to link the pipeline to the result received in the webhook thanks to an id that you will obtain
    when launching the pipeline as well as in the data received by the webhook.
  </p>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RequestWorkflowDocsPost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API docs - Request workflow',
    description: 'File processing on the Visual PDF API is broken down into 2 main steps: execution of a pipeline and downloading of the files resulting from this processing.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
