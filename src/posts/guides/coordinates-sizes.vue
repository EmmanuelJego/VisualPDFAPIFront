<template>
  <h1>Coordinates and sizes</h1>
  <p>
    To use certain API functionality, you will be asked to indicate coordinates (for example for <router-link
      :to="{ name: 'guides-sign' }">adding a signature</router-link>) or sizes (adding margins when turning <router-link
      :to="{ name: 'guides-images-to-pdf' }">images to PDF</router-link>).
  </p>

  <h2>Coordinates on a PDF page</h2>
  <p>
    The origin of the coordinates on a PDF is located at the <b>bottom left</b> of the pages.
  </p>
  <p><img src="~assets/img/guides/coordinates.png" alt="PDF coordinates" width="300" class="rounded-borders"></p>
  <p>
    This means that the higher the value of x, the closer you get to the right edge of the page. The higher the value of
    y, the closer you get to the top of the page.
  </p>

  <h3>Absolute coordinates</h3>
  <p>
    Absolute coordinates allow you to indicate a precise position on a page.
  </p>
  <p>
    Let's take the example of the PDF signature addition tool, in which we want to add a signature centered on the
    position x=30 y=50:
  </p>
  <pre>
    <code class="language-javascript">
      {
        tool: 'sign',
        options: {
          signatures: [
            {
              // Inserting the signature at x=30 y=50
              position: [30, 50],
              // ...
            },
          ],
        },
      },
    </code>
  </pre>

  <h3>Relative coordinates</h3>
  <p>
    Relative coordinates allow you to calculate a position from the height and width of the page.
  </p>
  <p>
    To calculate a position based on the width of the page, use the prefix <span class="inline-code">w</span>.
    Similarly, use <span class="inline-code">h</span> to base on the page height.
  </p>
  <p>
    A relative coordinate must be a value between <span class="inline-code">0</span> and <span
      class="inline-code">100</span>, with 0 being 0% of the dimension (height or width) and 100 being 100% of the
    dimension.
  </p>
  <p>
    In the following example, we want to add a signature at the center of the page. Now that we can compute coordinates
    based on the size of the page this is done very easily, knowing that the center of the page is x=50% of the width
    and y=50% of the height:
  </p>
  <pre>
    <code class="language-javascript">
      {
        tool: 'sign',
        options: {
          signatures: [
            {
              // Inserting the signature at x=30 y=50
              position: [50w, 50h],
              // ...
            },
          ],
        },
      },
    </code>
  </pre>

  <h2>Sizes</h2>
  <p>
    Similar to coordinates, you can specify a width or height absolutely (fixed size) or relatively (calculated
    according to the height or width of the page).
  </p>

  <h3>Absolute size</h3>
  <p>
    An absolute size allows you to have a rendering that will always have the same dimension regardless of the size of
    the PDF page.
  </p>
  <p>
    Let's keep our example of adding signatures. Now that we have indicated the position of our signature (in relative
    or absolute coordinates, it doesn't matter), we want to give it a size. This is done via the <span
      class="inline-code">bouding-box</span> option which corresponds to the frame enclosing the signature, and is
    expressed in the format <span class="inline-code">[width, height]</span>.
  </p>
  <pre>
    <code class="language-javascript">
      {
        tool: 'sign',
        options: {
          signatures: [
            {
              // The signature will be contained in a rectangle with a width of 150 and height of 100
              'bouding-box': [150, 100],
              // ...
            },
          ],
        },
      },
    </code>
  </pre>

  <h3>Relative size</h3>
  <p>
    A relative size allows you to calculate a size (height or width) from the height and width of the page.
  </p>
  <p>
    Still on our signature example, we now want the signature to be enclosed in a frame of 15% of the page width and 10%
    of the height:
  </p>
  <pre>
    <code class="language-javascript">
      {
        tool: 'sign',
        options: {
          signatures: [
            {
              // The signature will be contained in a rectangle with a width of 15% of the page width and height of 10% of the page height
              'bouding-box': [15w, 10h],
              // ...
            },
          ],
        },
      },
    </code>
  </pre>

  <h2>Mixing relative and absolute units</h2>
  <p>
    As long as the option asks for coordinates or dimensions, you can use whatever unit you want, or even use different
    units for the different values.
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CoordinatesSizesGuidePost',
  components: {},
  data() {
    return {};
  },
});
</script>
