import {defineComponent} from 'vue';
import {RouterLink} from 'vue-router';

export const SkipFeature = defineComponent({
  setup(props) {
    const onClick = () => {
      localStorage.setItem('skip', 'yes');
    };
    return () => (
      <span onClick={onClick}>
        <RouterLink to={'/items'}>
        跳过
      </RouterLink>
      </span>
    );
  }
});

