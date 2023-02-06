import {defineComponent} from 'vue';
import {RouterLink} from 'vue-router';

export const SkipFeature = defineComponent({
  setup(props) {
    const onClick = () => {
      localStorage.setItem('skip', 'yes');
    };
    return () => (
      <span onClick={onClick}>
        <RouterLink to={'/start'}>
        跳过
      </RouterLink>
      </span>
    );
  }
});

