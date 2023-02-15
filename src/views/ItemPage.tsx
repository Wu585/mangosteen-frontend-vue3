import {defineComponent} from 'vue';
import s from './ItemPage.module.scss';
import {RouterView} from 'vue-router';

export const ItemPage = defineComponent({
  setup() {
    return () => (
      <div>
        <RouterView/>
      </div>
    );
  }
});

export default ItemPage;
