<template>
  <h1>Add watermark</h1>
  <p>
    Integrate the Visual PDF API into your solution to easily add a watermark to your PDFs. Follow this guide to learn
    how to use this tool and integrate it in just a few minutes.
  </p>

  <h2>Basic watermark addition</h2>
  <p>
    The add watermark tool is very similar to the <router-link :to="{ name: 'guides-sign' }">add signature
      tool</router-link>. You will therefore find a lot of common points between these two tools.
  </p>
  <p>
    To add watermarks with the Visual PDF API, use a <span class="inline-code">watermark</span> task in a <router-link
      :to="{ name: 'guides-pipelines' }">file processing pipeline</router-link>.
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding the PDF to add the signature to
      form.append('file-1', myFile);

      // Adding the watermark image (my company logo)
      form.append('company-logo', companyLogo);

      // Inserting the watermark on the PDF
      form.append(
        'tasks',
        [
          {
            tool: 'watermark',
            options: {
              watermarks: [
                {
                  // Inserting the watermark at the middle of the pages
                  position: [50w, 50h],
                  // The watermark will be contained in a rectangle with a width of 150 and height of 100
                  'bouding-box': [150, 100],
                  // Indicate which file is to be used for watermark
                  file: 'company-logo',
                  pages: ['all'],
                },
              ],
            },
          },
        ],
      );
    </code>
  </pre>

  <!-- WORKAROUND: comment needed when having a ul and pre tags following each other -->

  <h2>Adding a text watermark</h2>
  <p>
    If adding an image watermark can be useful to add your company logo for example, it can also be interesting to add
    textual watermarks to add an emmention to your documents (for example "confidential", "supplier copy ", "private
    document", etc.).
  </p>
  <p>
    Let's see how we can add this type of watermark:
  </p>
  <pre>
    <code class="language-javascript">
      options: {
        watermarks: [
          {
            position: [50w, 50h],
            'bouding-box': [100w, 100w],
            // Adding a red "confidential" watermark
            text: 'confidential',
            color: '#ff0000',
            font: 'special-elite',
            rotation: -45,
            opacity: 0.5,
            pages: ['all'],
          },
        ],
      }
    </code>
  </pre>

  <h2>Adding multiple watermarks</h2>
  <p>
    You can insert as many watermarks as needed on a PDF.
  </p>
  <p>
    To achieve this, you will need to add all the necessary watermark images, and add several instructions in the <span
      class="inline-code">watermarks</span> option:
  </p>
  <pre>
    <code class="language-javascript">
      // Creating the form data for the pipeline
      const form = new FormData();

      // Adding the PDF to add the signature to
      form.append('file-1', myFile);

      // Adding the watermark image (my company logo)
      form.append('company-logo', companyLogo);

      // Inserting the signature on the PDF
      form.append(
        'tasks',
        [
          {
            tool: 'sign',
            options: {
              watermarks: [
                {
                  // Inserting the watermark at the middle of the pages
                  position: [50w, 50h],
                  // The watermark will be contained in a rectangle with a width of 150 and height of 100
                  'bouding-box': [150, 100],
                  // Indicate which file is to be used for watermark
                  file: 'company-logo',
                  pages: ['all'],
                },
                {
                  position: [50w, 50h],
                  'bouding-box': [100w, 100w],
                  // Adding a red "confidential" watermark
                  text: 'confidential',
                  color: '#ff0000',
                  font: 'special-elite',
                  rotation: -45,
                  opacity: 0.5,
                  pages: ['all'],
                },
              ],
            },
          },
        ],
      );
    </code>
  </pre>
  <p>
    Watermarks are added in the order of the instructions. If several overlap, the last one added will therefore be in
    the foreground.
  </p>

  <h2>Watermark settings</h2>
  <p>
    Depending on the method used to add a watermark, you have different options to customize its position and
    appearance.
  </p>
  <p>
    Let's go through the list of these options and the possible values for each of them.
  </p>

  <h3>Position</h3>
  <p>
    This is the position of the center of the watermark.
  </p>
  <p>
    It is represented by an array in the format <span class="inline-code">[x, y]</span> and can be expressed in relative
    or absolute values:
  </p>
  <ul>
    <li>
      <b>absolute</b>: the values indicated correspond to the coordinates on the page, knowing that the origin is the
      bottom left of the page
    </li>

    <li>
      <b>relative</b>: the values shown represent a percentage of the width or height of the page (ex: <span
        class="inline-code">50h</span> for 50% of the page height)
    </li>
  </ul>

  <h3>Bouding box</h3>
  <p>
    This is a rectangle in which the watermark will be included. It will not be visible on the PDF, but allows you to
    indicate the maximum width and height of the watermark. Depending on the shape of the watermark, it will occupy the
    entire width or the entire height of this rectangle.
  </p>
  <p>
    It is represented by an array in the format <span class="inline-code">[width, height]</span> and can be expressed,
    as the position, in relative or absolute values.
  </p>

  <h3>Opacity</h3>
  <p>
    This option allows you to adjust the transparency of the watermark, and must be a value between 0 and 1 (0 being
    full transparency, and 1 being full opacity).
  </p>
  <p>
    By default a watermark will have an opacity of 1.
  </p>

  <h3>Rotation</h3>
  <p>
    This parameter allows you to rotate a watermark, with the angle of your choice, expressed in degrees.
  </p>
  <pre>
    <code class="language-javascript">
      options: {
        watermarks: [
          {
            position: [10, 10],
            'bouding-box': [200, 100],
            file: 'company-logo',
            pages: ['last'],
            // Rotate the watermark 90 degrees
            rotation: 90,
          },
        ],
      }
    </code>
  </pre>

  <h3>Text options</h3>
  <p>
    When you add a watermark in text format, you can configure its appearance via various options:
  </p>
  <ul>
    <li><span class="inline-code">color</span>: the color of the text</li>
    <li><span class="inline-code">font</span>: the font of the text, among those available</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddWatermarkGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
