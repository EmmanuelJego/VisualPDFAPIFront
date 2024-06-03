import { AxiosInstance } from 'axios';
import { EventBus } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $bus: EventBus;
    $api: AxiosInstance;
  }
}

export {};
