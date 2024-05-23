<template>
  <h1>API workflow</h1>
  <p>
    This guide will allow you to understand how to interact with the Visual PDF API through 3 simple steps: creating a
    file processing pipeline, executing the pipeline, downloading files.
  </p>

  <h2>
    1. Creating a pipeline
  </h2>

  <h3>
    First, what exactly is a pipeline?
  </h3>
  <p>
    In the Visual PDF API, a pipeline corresponds to the description of a processing to be carried out on one or more
    files, through one or more tasks. It also describes different options, such as the format of the resulting files
    (zip, file names, etc.) and the waiting mode (should the request wait for the end of processing to return a result,
    or should it return a result as soon as possible and carry out processing in the background).
  </p>
  <p>
    Using a pipeline rather than just a single task allows you to combine different tools and thus increase your
    possibilities tenfold. Obviously, it is entirely possible to use only one tool in your pipeline, without combining
    it with other tasks.
  </p>
  <p>
    How pipelines work, their limitations and their options are more fully described in <router-link
      :to="{ name: 'guides-pipelines' }">this guide</router-link>.
  </p>

  <h3>
    Pipeline description
  </h3>
  <p>
    For the API to know what you want to do, it needs instructions. As we have just seen, these instructions are defined
    in the description of a pipeline.
  </p>
  <p>
    Pipelines must be sent with a <span class="inline-code">multipart/form-data</span> encoding type. JavaScript for
    instance allows us to send data with this format via the <span class="inline-code">FormData</span> object. You can
    build manually the <span class="inline-code">FormData</span> (as shown in the following example) or simply bind it
    to a <span class="inline-code">form</span> HTML element.
  </p>
  <p>
    Let's see a basic pipeline example:
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding PDF files (instances of the JavaScript File class)
      form.append('file-1', myFirstFile);
      form.append('file-2', mySecondFile);

      // Describing the pipeline tasks
      const tasks = [
        // For the 2 files, duplicate the first and last pages
        {
          tool: 'duplicate-pages',
          options: { pages: [0, 'last'] },
        },
        // Compress the resulting PDFs
        {
          tool: 'compress',
        },
      ];

      // Adding tasks description to the form data
      form.append('tasks', tasks);
    </code>
  </pre>
  <p>
    That's it! We have built the pipeline description, saved into a JavaScript <span class="inline-code">FormData</span>
    object. This pipeline will upload 2 files, duplicate their first and last pages, compress the resulting files, and
    finally save them, waiting for them to be downloaded.
  </p>

  <h2>2. Executing the pipeline</h2>
  <p>
    Now that we have built our pipeline, we can send it to the Visual PDF API in order to process it.
  </p>
  <p>
    Let's see how to do this, using the JavaScript Fetch API:
  </p>
  <pre>
    <code class="language-javascript">
      // Executing the pipeline by calling the API endpoint
      const pipelineResponse = await fetch(
        'https://api.visualpdf.com/v1/process',
        {
          method: 'POST',
          body: form,
          headers: {
            Authorization: `Bearer ${your_API_key}`,  // Don't forget to replace ${your_API_key} with a key created in your admin panel
          }
        },
      )
    </code>
  </pre>
  <p>
    And there you go! Your first pipeline has been processed successfully!
  </p>
  <p>
    Since we left our pipeline with its default configuration (no <span class="inline-code">options</span> field added
    in our <span class="inline-code">FormData</span>), the request will wait for processing to complete before returning
    a result. <span class="inline-code">pipelineResult</span> therefore contains
    information about the pipeline, and especially the links allowing you to download the new files.
  </p>

  <h2>3. Downloading the files</h2>
  <p>
    The pipeline now has been processed, and the query result allows us to retrieve the download links of the files.
    <b>You have up to 1 hour to download them</b>, after which they will be deleted from our servers and will no longer
    be downloadable.
  </p>
  <p>
    Let's see how we can download the first of our freshly created PDF files:
  </p>
  <pre>
    <code class="language-javascript">
      // Downloading the first processed file
      const fileResponse = await fetch(
        pipelineResult.links[0],  // Just use the already-built linked from the pipeline result
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${your_API_key}`,  // Don't forget to replace ${your_API_key} with a key created in your admin panel
          }
        }
      )

      // Saving the file into a File object
      const file = new File([await fileResponse.blob()], 'myNewFile.pdf', { type: 'application/pdf' });
    </code>
  </pre>
  <p>
    Simply repeat the process to download the second file.
  </p>

  <h2>
    Conclusion
  </h2>
  <p>
    You now know how to create a pipeline to interact with the Visual PDF API in 3 simple steps.
  </p>
  <p>
    Of course, the examples in this guide are very basic and the Visual PDF API has a lot more to offer you. We suggest
    you continue with the guide on pipelines to discover all the possibilities they offer, but also their limits.
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ApiWorkflowGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
