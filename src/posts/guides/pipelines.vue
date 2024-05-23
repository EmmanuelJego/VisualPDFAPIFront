<template>
  <h1>Pipelines</h1>
  <p>
    In this guide we will discover in detail what a pipeline is in Visual PDF API, all the possibilities that this
    mechanism offers, with its different options and combinations of tasks.
  </p>
  <p>
    We will also see the functional limits that must be kept in mind so that you can create your own solution without
    unpleasant surprises.
  </p>

  <h2>What is a pipeline in Visual PDF API</h2>
  <p>
    A pipeline is the modeling of an action that will be requested from the Visual PDF API: which files are to be
    processed, in what way, and what is expected in return.
  </p>
  <p>
    It is composed as follows:
  </p>
  <ol>
    <li>
      <b>files</b>: these are the input files, which must be sent to the API so that they can be transformed in any way
    </li>
    <li>
      <b>tasks</b>: these are the different treatments that will be applied to the input files, with their different
      specific options
    </li>
    <li>
      <b>options</b>: these are the parameters which will make it possible to modify the behavior of a query, and to
      personalize the result it must return (names of output files, saving in a ZIP file, etc.)
    </li>
  </ol>
  <p>
    It is called "pipeline" because it will allow several tools to be combined into a single request. These tools will
    be called one after the other, in the order defined in the description of the pipeline.
  </p>
  <p>
    Thus, it will not be possible for you to combine just any tools: each tool expects a certain type of data as input,
    and produces a certain type of data as output, which may not be compatible with the next tool in the pipeline.
  </p>

  <h2>Creating a pipeline</h2>
  <p>
    Pipelines must be sent to the API with a <span class="inline-code">multipart/form-data</span> encoding type. In
    JavaScript, one can use the <span class="inline-code">FormData</span> object to create a pipeline with this format,
    but it is only one way among others.
  </p>

  <h3>Adding input files</h3>
  <p>
    The first thing to do to define a pipeline is to add files that will be processed.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding PDF files (instances of the JavaScript File class)
      form.append('file-1', myFirstFile);
      form.append('file-2', mySecondFile);
    </code>
  </pre>
  <p>
    Remember here that <b>the order in which the files are added is important</b>. It is in this order that the files
    will be processed in the tasks, which can, for some of them, have an impact on the final result.
  </p>
  <p>
    If some of your input PDF are password protected, you will need to specify these passwords in the pipeline <span
      class="inline-code">options</span> field, as described in the "options" part a little further down in this guide.
  </p>
  <p>
    Here you can only upload PDF and images files, as these are the only formats accepted by our tools. If the format of
    these input files does not match with the first task requirements, an error will be thrown.
  </p>

  <h3>Adding PDF processing tasks</h3>
  <p>
    Now that we have our files that need to be processed, we need to describe what processing should be applied to these
    files.
  </p>
  <p>
    This is done through the <span class="inline-code">tasks</span> field of a pipeline, where we will list all the
    treatments that will be applied, one after the other.
  </p>
  <p>
    Here too, the order of the tasks is critical, since it is in this order that the tasks will be called: the result of
    the previous task will serve as input data for the next task, and so on (for the first task , these are obviously
    the initial files which will be used).
  </p>
  <p>
    Let's try with a pipeline that would
  </p>
  <ol>
    <li>
      merge the 2 input files we added in the previous step
    </li>
    <li>
      add a custom watermark to all the pages
    </li>
    <li>
      protects the output file with a password
    </li>
  </ol>
  <pre>
    <code class="language-javascript">
      // Adding tasks description to the form data
      form.append(
        'tasks',
        [
          // Merging the 2 input PDF documents
          {
            tool: 'merge',
          },
          // Adding a watermark to all pages
          {
            tool: 'watermark',
            options: {
              text: 'confidential',
              color: '#ff0000',
              position: 'center',
              rotation: -45,
              opacity: 0.5,
              'bouding-box': [100w, 100w],
            },
          },
          // Protecting the file with a password
          {
            tool: 'add-password',
            options: {
              password: 'my_sup3r_s3cr3t_pwd',
            }
          }
        ],
      );
    </code>
  </pre>

  <h3>Setting pipeline options (optional)</h3>

  <h4>Download format</h4>
  <p>
    2 download formats are available to you, depending on your needs:
  </p>
  <ul>
    <li>
      <span class="inline-code">file</span>: this is the default behavior. In this configuration, each file will be
      available for download individually. This means you don't have to manage the management of archive files (zip) on
      your side. This also allows, for example in the case where the output files do not necessarily have to be
      downloaded at the same time, or by 2 different entities, that each file can be downloaded independently. On the
      other hand, this may represent a total file size greater than the archive format, and therefore a longer download
      time as well.
      <pre>
        <code class="language-javascript">
          form.append('options', {
            'format': 'file', // Not necessary as it is the default format
            // ...
          });
        </code>
      </pre>
    </li>
    <li>
      <span class="inline-code">archive</span>: in this configuration, all files output from the pipeline will be
      grouped into a single archive file (zip). This will allow you to download all of a pipeline's output files in a
      single request, which is particularly useful when you have a lot of files. This option also allows for faster
      downloading because an archive file is generally lighter than all the files it contains.
      <pre>
        <code class="language-javascript">
          form.append('options', {
            'format': 'archive',
            // ...
          });
        </code>
      </pre>
    </li>
  </ul>

  <h4>Output file names</h4>
  <p>
    The API allows you to customize the name of output files, either manually or using shortcuts.
  </p>
  <p>
    If you do not specify this option, a default name will be assigned to the output files.
  </p>
  <p>
    Vous avez ici le choix entre 2 options:
  </p>
  <ul>
    <li>
      <span class="inline-code">file-names</span>: this setting allows you to name the output files individually, based
      on the index of the output files of the last task (it is therefore important to calculate the order of the output
      files yourself, according to all the tasks applied and their options, to properly assign the right name to the
      right one file)
      <pre>
        <code class="language-javascript">
          // Example in the case of a pipeline with 2 output files
          form.append('options', {
            'file-names': ['corporate_copy', 'customer_copy_{date}'],
            // ...
          });
        </code>
      </pre>
    </li>
    <li>
      <span class="inline-code">file-names-pattern</span>: This setting allows you to define a pattern that will be used
      for all output files. If the indicated pattern does not allow having all different file names, a <span
        class="inline-code">{nb}</span> prefix will be automatically applied.
      <pre>
        <code class="language-javascript">
          form.append('options', {
            'file-names-pattern': '{nb}_invoice_{date}',
            // ...
          });
        </code>
      </pre>
    </li>
  </ul>

  <h4>Archive name</h4>
  <p>
    If you have configured the <span class="inline-code">format</span> parameter to <span
      class="inline-code">archive</span>, you can specify an archive file name using the <span
      class="inline-code">archive-name</span> parameter:
  </p>
  <pre>
    <code class="language-javascript">
      form.append('options', {
        'archive-name': 'invoices_{date}',
        // ...
      });
    </code>
  </pre>

  <h4>Shortcuts</h4>
  <p>
    As shown in the previous examples, you can use shortcuts, allowing you to include different information in the name
    of your files:
  </p>
  <ul>
    <li>
      <span class="inline-code">{nb}</span>: the index of the file, according to the result of the last task
    </li>
    <li>
      <span class="inline-code">{date}</span>: the current date when the file was generated by the API
    </li>
    <li>
      <span class="inline-code">{tool}</span>: the name of the last tool of the pipeline
    </li>
  </ul>

  <h4>Wait mode</h4>
  <p>
    The <span class="inline-code">mode</span> option allows you to choose between 2 waiting modes, and allows you to
    define when the query returns a result:
  </p>
  <ul>
    <li>
      <span class="inline-code">wait</span>: this is the default mode. In this mode, the API will wait until the
      pipeline is completely finished to return a result to you. The result will thus contain information about the
      pipeline (execution duration, etc.) as well as links allowing you to download the output files.
      <pre>
        <code class="language-javascript">
          form.append('options', {
            'mode': 'wait', // Not necessary as it is the default mode
            // ...
          });

          const pipelineResponse = await fetch('https://api.visualpdf.com/v1/process', { /* ... */ })
          const pipelineResult = await reponse.json();

          // pipelineResult:
          // {
          //  taskid: 'the-id-of-the-pipeline',
          //  duration: 823,
          //  links: [
          //    'https://api.visualpdf.com/v1/download/id-of-file1',
          //    'https://api.visualpdf.com/v1/download/id-of-file2'
          //  ],
          //  ...
          // }
        </code>
      </pre>
    </li>
    <li>
      <span class="inline-code">async</span>: In this mode, the API will return a result to you as soon as the pipeline
      has started. The result will contain information about the pipeline, which will then allow you to make the link
      once the pipeline is completed. In this mode, it will therefore be necessary to specify a webhook URL (<span
        class="inline-code">webhook-url</span> option), which will be called by the Visual PDF API once the pipeline is
      completed (as a <span class="inline-code">POST</span> request), to transmit the result of the pipeline.
      <pre>
        <code class="language-javascript">
          form.append('options', {
            'mode': 'async',
            'webhook-url': 'https://your-domain.com/visual-pdf-webhook',
            // ...
          });

          const pipelineResponse = await fetch('https://api.visualpdf.com/v1/process', { /* ... */ })
          const pipelineResult = await reponse.json();

          // pipelineResult:
          // {
          //  taskid: 'the-id-of-the-pipeline',
          //  webhook-url: 'https://your-domain.com/visual-pdf-webhook'
          //  ...
          // }
        </code>
      </pre>
      Then, in your webhook handler on your server:
      <pre>
        <code class="language-javascript">
          // Called once a Visual PDF pipeline is completed
          handlePipelineCompleted(req) {
            const pipelineResult = req.body

            // pipelineResult:
            // {
            //  taskid: 'the-id-of-the-pipeline',
            //  duration: 901,
            //  links: [
            //    'https://api.visualpdf.com/v1/download/id-of-file1',
            //    'https://api.visualpdf.com/v1/download/id-of-file2'
            //  ],
            //  ...
            // }

            // Do whatever you need
            // ...
          }
        </code>
      </pre>
    </li>
  </ul>

  <h4>Input file passwords</h4>
  <p>
    Some of your input PDF files may have a password protection. In this case, it is necessary to pass these passwords
    to the API so that your files can be processed.
  </p>
  <p>
    The <span class="inline-code">passwords</span> parameter allows you to do this. This is a key/value object, whose
    keys are the file names as given in the <span class="inline-code">multipart/form-data</span> content fields, and
    whose values are the associated passwords:
  </p>
  <pre>
    <code class="language-javascript">
      form.append('options', {
        'passwords': {
          'file-1': 'my_sup3r_s3cr3t_pwd',
          'file-2': 'my_0th3r_s3cr3t_pwd',
        },
        // ...
      });
    </code>
  </pre>

  <h2>Executing the pipeline and downloading the output files</h2>
  <p>
    These actions are described in the <router-link :to="{ name: 'guides-api-workflow' }">API workflow</router-link>
    guide.
  </p>

  <h2>Pipeline limits</h2>
  <p>
    Whether for reasons of consistency, limitation of abuse or technical constraints, certain limits must be respected
    when using the API.
  </p>
  <p>
    If any of these limits are violated, the pipeline will fail and an error will be returned.
  </p>

  <h3>
    Input files
  </h3>
  <p>
    Each pipeline is limited to
  </p>
  <ul>
    <li>
      100 input files
    </li>
    <li>
      500MB of total input file sizes (some tools allow a lower maximum size)
    </li>
  </ul>

  <h3>
    Output files
  </h3>
  <p>
    Each pipeline is limited to
  </p>
  <ul>
    <li>
      100 output files (beyond that, it will be necessary to configure the pipeline to produce an archive)
    </li>
    <li>
      500MB of total output file sizes (in the case where the files are saved in an archive file, this limit applies to
      the resulting non-archived files)
    </li>
  </ul>

  <h3>
    Number of tasks
  </h3>
  <p>
    You cannot combine more than 20 tasks in a single pipeline.
  </p>

  <h3>
    Tool combinations
  </h3>
  <p>
    Not all tools are compatible with each other, and not all of them can be used at any time:
  </p>
  <ul>
    <li>
      Some do not produce a file format compatible with others (for example the "PDF to images" tool produces image
      files, which will not be accepted by the "Merge PDF" tool)
    </li>
    <li>
      Some are to be used at the end of the pipeline only, such as the compression tool or the password addition tool
    </li>
  </ul>
  <p>
    These constraints are detailed in the respective tool guides.
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PipelinesGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
