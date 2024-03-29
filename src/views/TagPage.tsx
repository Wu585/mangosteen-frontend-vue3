import {defineComponent} from 'vue';
import {RouterView} from 'vue-router';

export const TagPage = defineComponent({
  setup() {
    return () => (
      <div>
        <RouterView/>
      </div>
    );
  }
});

export default TagPage;
