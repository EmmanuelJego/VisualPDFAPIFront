<template>
  <q-page class="flex justify-center post-page">
    <div class="page-content">
      <h1>Privacy policy</h1>
      <p>
        Last update: 06/01/2024
      </p>

      <p>
        Welcome to api.visualpdf.com (the "Website"). This Privacy Policy explains how we collect, use, and protect your
        information when you use our services, which involve treating PDF files through our API. By using our Website,
        you agree to the terms outlined in this policy.
      </p>

      <h2>Information Collection</h2>

      <h3>Personal Information</h3>
      <p>
        We collect personally identifiable information (PII) when you create an account. This information may include:
      </p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Password (hashed and stored securely)</li>
        <li>Payment information (processed by Stripe)</li>
        <li>OAuth provider information (if you use social login)</li>
      </ul>

      <h3>Non-Personal Information</h3>
      <p>
        We may collect non-personal information about your use of our Website and services. This information does not
        identify you personally and may include:
      </p>
      <ul>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>IP address</li>
        <li>Pages visited and time spent on the Website</li>
        <li>API usage statistics</li>
      </ul>

      <h2>Use of Information</h2>
      <p>
        We use the information we collect to:
      </p>
      <ul>
        <li>Operate and maintain our Website and services</li>
        <li>Process your transactions and manage your subscriptions</li>
        <li>Communicate with you regarding your account and transactions</li>
        <li>Improve our Website and services</li>
        <li>Analyze usage patterns to enhance user experience</li>
        <li>Ensure the security and integrity of our systems</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Our Website does not use cookies.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect the information we collect against
        unauthorized access, alteration, disclosure, or destruction. These measures include:
      </p>
      <ul>
        <li>Encryption of data in transit</li>
        <li>Secure servers and data storage</li>
        <li>Regular security audits and updates</li>
        <li>Secure hashing and storage of passwords</li>
      </ul>

      <h2>Payment Processing</h2>
      <p>
        We use Stripe for payment processing. Stripe handles your payment information securely and complies with
        industry standards for security. We do not store your payment information on our servers.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We do not share, sell, or trade your information with third parties. However, we may use third-party services
        for:
      </p>
      <ul>
        <li>Website hosting</li>
        <li>Data storage</li>
        <li>Analytical tools</li>
        <li>Payment processing (Stripe)</li>
      </ul>
      <p>
        These third-party services are required to comply with strict data privacy standards and are not permitted to
        use your information for any purpose other than those outlined in this policy.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        Our Website and services are not intended for use by children under the age of 13. We do not knowingly collect
        personal information from children under 13. If you believe we have inadvertently collected such information,
        please contact us so we can promptly delete it.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated
        "Last updated" date. We encourage you to review this policy periodically to stay informed about how we are
        protecting your information.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or our information practices, please contact us
        at:
      </p>
      <p>
        <b>Visual PDF API</b>
        <br>Emmanuel Jégo
        <br>contact@visualpdf.com
      </p>

      <p>
        By using our Website, you acknowledge that you have read and understood this Privacy Policy and agree to its
        terms.
      </p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createMetaMixin } from 'quasar';

import 'src/css/pages/post.scss';

export default defineComponent({
  name: 'PrivacyPage',
  components: {},
  mixins: [
    createMetaMixin(() => ({
      title: 'Visual PDF API - Privacy policy',
      equiv: {
        'http-equiv': 'Content-Type',
        content: 'text/html; charset=UTF-8',
      },
    })),
  ],
  data() {
    return {};
  },
  methods: {},
});
</script>
