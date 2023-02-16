import {onMounted} from 'vue';
import {mePromise} from '../utils/me';

export const useAfterMe = (fn: () => void) => {
  onMounted(async () => {
    await mePromise;
    fn();
  });
};
