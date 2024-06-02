import { EventBus } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $bus: EventBus;
  }
}

export {};
