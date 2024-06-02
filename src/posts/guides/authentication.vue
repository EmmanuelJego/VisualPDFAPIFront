<template>
  <h1>Authentication</h1>
  <p>
    The Visual PDF API is only accessible to registered users.
  </p>
  <p>
    To prove that you are a user with a valid account, and who has credits, an authentication process is necessary for
    each call to the API. Let's dive into this guide to see how to do this very simply!
  </p>

  <h2>How are requests authenticated?</h2>
  <p>
    The Visual PDF API uses a simple and widely used method of authenticating requests: <b>API keys</b>.
  </p>
  <p>
    API keys are strings, associated with your account, that you must include in your requests. When the API receives
    one of your requests, it will
  </p>
  <ol>
    <li>
      verify that a key has been transmitted
    </li>
    <li>
      verify that this key exists and associated with a valid account
    </li>
    <li>
      check that the account associated with the key has a sufficient number of credits (only for requets that actually
      require credits)
    </li>
  </ol>
  <p>
    If one os these steps fail, you will not be allowed to process the request and will receive an error.
  </p>

  <h2>How to create an API key?</h2>
  <p>
    In order to create an API key, just connect to your administrator portal, go to "Settings", then in the "Your API
    keys" section, click on the "New" button.
  </p>
  <p>
    We recommend that you choose the name assigned to your key carefully, so that you can easily find the context in
    which this key is used.
  </p>

  <h2>How to use my API key?</h2>
  <p>
    Now that you have an API key, you are able to authenticate your requests with it.
  </p>
  <p>
    Your API key must appear in each request headers via the <span class="inline-code">Authorization</span> header
    like this: <span class="inline-code">Authorization: Bearer {your_API_key}</span>.
  </p>
  <p>
    Let's take the example of a request sent via the Fetch API in JavaScript:
  </p>
  <pre>
    <code class="language-javascript">
      await fetch(
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
    Now that you know how to authenticate your requests to prove that you are a legitimate user, find out in the next
    guide how to interact with the API to process PDF files.
  </p>
</template>

<script lang="ts">
import { createMetaMixin } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthenticationGuidePost',
  mixins: [createMetaMixin(() => ({
    title: 'Visual PDF API guide - Authenticate to the API easily',
    description: 'The Visual PDF API is only accessible to registered users. To prove that you are a user with a valid account, and who has credits, an authentication process is necessary for each call to the API.',
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  }))],
});
</script>
