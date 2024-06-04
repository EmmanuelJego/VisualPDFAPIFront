import { AxiosInstance } from 'axios';
import { EventBus } from 'quasar';
import Plausible from 'src/types/plausible';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $bus: EventBus;
    $api: AxiosInstance;
    $plausible: Plausible;
  }
}

export {};
