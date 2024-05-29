<template>
  <h1>Sign PDF</h1>
  <p>
    Learn with this guide how you can add one or more signatures to a PDF, in the location of your choice.
  </p>

  <h2>Basic signature addition</h2>
  <p>
    To add signatures with the Visual PDF API, use a <span class="inline-code">sign</span> task in a <router-link
      :to="{ name: 'guides-pipelines' }">file processing pipeline</router-link>.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding the PDF to add the signature to
      form.append('file-1', myFile);

      // Adding the signature image
      form.append('signature-1', mySignature);

      // Inserting the signature on the PDF
      form.append(
        'tasks',
        [
          {
            tool: 'sign',
            options: {
              signatures: [
                {
                  // Inserting the signature at x=30 y=50 (center)
                  // with a maximum width of 150 and maximum height of 100
                  box: [30, 50, 150, 100],
                  // Indicate which file is to be used for signature
                  file: 'signature-1',
                  pages: [0],
                },
                // We could have added additional signatures here
              ],
            },
          },
        ],
      );
    </code>
  </pre>

  <!-- WORKAROUND: comment needed when having a ul and pre tags following each other -->

  <h2>Adding text signature or content</h2>
  <p>
    The add text signature functionality allows you to add for example
  </p>
  <ul>
    <li>a name</li>
    <li>any mention ("Read and approved", "Good for agreement", etc.)</li>
    <li>a date</li>
  </ul>
  <pre>
    <code class="language-javascript">
      options: {
        signatures: [
          {
            box: [250, 50, 200, 100],
            text: 'Good for agreement',
            color: '#0000ff',
            font: 'libre-baskerville',
            pages: ['last'],
          },
        ],
      }
    </code>
  </pre>

  <h2>Adding multiple signatures</h2>
  <p>
    You can insert as many signatures as needed on a PDF.
  </p>
  <p>
    To achieve this, you will need to add all the necessary signature images, and add several instructions in the <span
      class="inline-code">signatures</span> option:
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding the PDF to add the signature to
      form.append('file-1', myFile);

      // Adding the signature images
      form.append('signature-1', mySignature);
      form.append('signature-2', johnSignature);

      // Inserting the signature on the PDF
      form.append(
        'tasks',
        [
          {
            tool: 'sign',
            options: {
              signatures: [
                {
                  box: [30, 50, 150, 100],
                  file: 'signature-1',
                  pages: ['all'],
                },
                {
                  box: [250, 50, 150, 100],
                  file: 'signature-2',
                  pages: ['all'],
                },
                {
                  box: [250, 100, 200, 100],
                  text: 'John\'s signature',
                  color: '#000000',
                  font: 'libre-baskerville',
                  pages: ['all'],
                },
              ],
            },
          },
        ],
      );
    </code>
  </pre>

  <h2>Signature settings</h2>
  <p>
    We have seen in the previous examples that various parameters are available to position and personalize the
    signatures.
  </p>
  <p>
    Let's see here an exhaustive list of these options, their meaning and their possible values.
  </p>

  <h3>Box</h3>
  <p>
    This is a rectangle in which the signature will be included. It will not be visible on the PDF, but allows you to
    indicate the position, maximum width and maximum height of the signature. Depending on the shape of the signature,
    it will occupy the
    entire width or the entire height of this rectangle.
  </p>
  <p>
    It is represented by an array in the format <span class="inline-code">[x, y, width, height]</span> and can be
    expressed in <router-link :to="{ name: 'guides-coordinates-sizes' }">relative or absolute values</router-link>.
  </p>
  <p>
    The <span class="inline-code">x</span> and <span class="inline-code">y</span> parameters represent the coordinates
    of the <b>center of the box</b>. This way, if you rotate the signature, this coordinate will always be the center of
    the signature.
  </p>

  <h3>Rotation</h3>
  <p>
    This parameter allows you to rotate a signature, with the angle of your choice, expressed in degrees.
  </p>
  <p>
    The origin of the rotation is the center of the signature.
  </p>
  <pre>
    <code class="language-javascript">
      options: {
        signatures: [
          {
            box: [250, 50, 200, 100],
            file: 'signature-1',
            pages: [0],
            // Rotate the signature 15 degrees
            rotation: 15,
          },
        ],
      }
    </code>
  </pre>

  <h3>Text options</h3>
  <p>
    When you add a signature in text format, you can configure its appearance via various options:
  </p>
  <ul>
    <li><span class="inline-code">color</span>: the color of the text</li>
    <li><span class="inline-code">font</span>: the font of the text, among <router-link
        :to="{ name: 'guides-fonts' }">those available</router-link></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
