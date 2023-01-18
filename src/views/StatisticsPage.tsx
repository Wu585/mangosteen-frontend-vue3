import {defineComponent} from 'vue';
import s from './StatisticsPage.module.scss';
import {TimeTabsLayout} from '../layouts/TimeTabsLayout';
import {Charts} from '../components/charts/Charts';

export const StatisticsPage = defineComponent({
  setup() {
    return () => (
      <TimeTabsLayout component={Charts}/>
    );
  }
});
