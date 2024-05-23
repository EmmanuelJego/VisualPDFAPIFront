<template>
  <div class="q-gutter-md">
    <q-expansion-item v-for="(question, index) in questions" :label="question.question" :key="`question-${index}`">
      <q-card>
        <q-card-section class="line-break">
          <div v-html="question.answer" />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import '../css/components/vue-faq.scss';

interface FaqQuestion {
  question: string;
  answer: string;
}

export default defineComponent({
  name: 'VueFaq',
  components: {},
  props: {
    questions: {
      type: Array<FaqQuestion>,
      required: true,
    },
  },
  data() {
    return {};
  },
});
</script>
