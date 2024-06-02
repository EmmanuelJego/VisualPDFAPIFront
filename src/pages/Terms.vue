<template>
  <q-page class="flex justify-center post-page">
    <div class="page-content">
      <h1>Terms and Conditions</h1>
      <p>
        Last update: 06/01/2024
      </p>

      <p>
        Welcome to api.visualpdf.com (the "Website"). These Terms and Conditions ("Terms") govern your use of our
        Website and services. By accessing or using our Website, you agree to be bound by these Terms. If you do not
        agree to these Terms, you may not use our Website.
      </p>

      <h2>Accounts</h2>

      <h3>Account Creation</h3>
      <p>
        To use certain features of our Website, you must create an account. You agree to provide accurate, complete, and
        current information during the registration process. You are responsible for maintaining the confidentiality of
        your account information, including your password, and for all activities that occur under your account.
      </p>

      <h3>Account Security</h3>
      <p>
        You agree to notify us immediately of any unauthorized use of your account or any other breach of security. We
        are not liable for any loss or damage arising from your failure to protect your account information.
      </p>

      <h2>Services</h2>

      <h3>Description</h3>
      <p>
        Our Website provides an API for treating PDF files. We offer various subscription plans and prepaid packages for
        API credits. The specifics of the services are described on our Website.
      </p>

      <h3>Changes to Services</h3>
      <p>
        We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior
        notice. We are not liable to you or any third party for any modification, suspension, or discontinuation of the
        services.
      </p>

      <h2>Payments</h2>

      <h3>Payment Processing</h3>
      <p>
        Payments for subscriptions and prepaid packages are processed through Stripe. By making a payment, you agree to
        comply with Stripe's terms and conditions. We do not store your payment information on our servers.
      </p>

      <h3>Refunds</h3>
      <p>
        Refunds for subscriptions and prepaid packages are handled on a case-by-case basis. Please contact us if you
        believe you are entitled to a refund.
      </p>

      <h2>Use of the Website</h2>

      <h3>Permitted Use</h3>
      <p>
        You may use our Website and services for lawful purposes only. You agree not to:
      </p>
      <ul>
        <li>Use our services in any manner that could damage, disable, overburden, or impair our servers or networks
        </li>
        <li>Attempt to gain unauthorized access to any part of our Website, other accounts, computer systems, or
          networks</li>
        <li>Use any automated means, including robots, spiders, or data mining tools, to access our services</li>
      </ul>

      <h3>Prohibited Use</h3>
      <p>
        You agree not to use our services to:
      </p>
      <ul>
        <li>Upload or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory,
          vulgar, obscene, or otherwise objectionable</li>
        <li>Violate any applicable local, state, national, or international law or regulation</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        All content on our Website, including text, graphics, logos, and software, is the property of Visual PDF API or
        its content suppliers and is protected by intellectual property laws. You may not use, reproduce, distribute, or
        create derivative works from any content on our Website without our express written permission.
      </p>

      <h2>Disclaimer of Warranties</h2>
      <p>
        Our Website and services are provided on an "as is" and "as available" basis. We disclaim all warranties,
        express or implied, including, but not limited to, implied warranties of merchantability, fitness for a
        particular purpose, and non-infringement. We do not warrant that our services will be uninterrupted, error-free,
        or free from viruses or other harmful components.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Visual PDF API, its affiliates, and their respective directors,
        officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or
        punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of
        data, use, goodwill, or other intangible losses, resulting from:
      </p>
      <ul>
        <li>Your use or inability to use our services</li>
        <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
        <li>Any interruption or cessation of transmission to or from our services</li>
        <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services by any
          third party</li>
        <li>Any errors or omissions in any content or for any loss or damage incurred as a result of your use of any
          content posted, emailed, transmitted, or otherwise made available through the services</li>
      </ul>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Visual PDF API, its affiliates, and their respective
        directors, officers, employees, and agents from and against any and all claims, liabilities, damages, losses,
        costs, expenses, or fees (including reasonable attorneys' fees) arising from your use of our services or your
        violation of these Terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms and any disputes arising out of or related to them or our services shall be governed by and
        construed in accordance with the laws of the jurisdiction in which Visual PDF API is based, without regard to
        its conflict of law principles.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Any changes will be posted on this page with an updated "Last
        updated" date. Your continued use of our services after any such changes constitutes your acceptance of the new
        Terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about these Terms or our services, please contact us at:
      </p>
      <p>
        <b>Visual PDF API</b>
        <br>Emmanuel Jégo
        <br>contact@visualpdf.com
      </p>

      <p>
        By using our Website, you acknowledge that you have read and understood these Terms and agree to be bound by
        them.
      </p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { createMetaMixin } from 'quasar';

import 'src/css/pages/post.scss';

export default defineComponent({
  name: 'TermsAndConditionsPage',
  components: {},
  mixins: [
    createMetaMixin(() => ({
      title: 'Visual PDF API - Terms and conditions',
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
