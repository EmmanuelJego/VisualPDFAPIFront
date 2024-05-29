<template>
  <h1>Authentication</h1>
  <p>
    The Visual PDF API is only accessible to registered users.
  </p>
  <p>
    If you have an account, you must create an API key from your admin portal, by going to "Settings", then clicking on
    the "New" button in the "API keys" section.
  </p>
  <p>
    This key will be used in all your calls to the API, to identify you and prove that you have the right to use it.
  </p>
  <p>
    You can create different keys, for your different projects.
  </p>
  <p>
    Your API keys must be protected because they allow you to be identified in the eyes of the API. Someone who obtains
    your key could fraudulently use your account and use your credits. Never share your API keys publicly, whether on a
    Git repository (GitHub, GitLab, etc.) or on client-side code.
  </p>

  <h2>Using the API key</h2>
  <p>
    Your API key must appear in each request headers via the <span class="inline-code">Authorization</span> header like
    this: <span class="inline-code">Authorization: Bearer {your_API_key}</span>.
  </p>

  <!-- Workaround: comment needed -->

  <pre>
    <code class="language-javascript">
      await fetch(
        'https://api.visualpdf.com/v1/process',
        {
          method: 'POST',
          body: form,
          headers: {
            Authorization: `Bearer ${your_API_key}`,  // Replace ${your_API_key} with the key created in your admin panel
          }
        },
      )
    </code>
  </pre>

  <h2>Testing authentication</h2>
  <p>
    If you want to test your authentication and your API key, you can use the <router-link
      :to="{ name: 'docs-status' }">service status</router-link> endpoint, that will respond with a success message when
    your authentication is successful.
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthenticationDocsPost',
  components: {},
  data() {
    return {};
  },
});
</script>
