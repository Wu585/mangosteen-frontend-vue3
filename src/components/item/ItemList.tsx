import {defineComponent} from 'vue';
import {ItemSummary} from './ItemSummary';
import {TimeTabsLayout} from '../../layouts/TimeTabsLayout';

export const ItemList = defineComponent({
  setup() {
    return () => (
      <TimeTabsLayout component={ItemSummary}/>
    );
  }
});

