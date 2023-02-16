import {defineComponent} from 'vue';
import {Icon} from '../icon/Icon';
import {useRouter} from 'vue-router';

export const BackIcon = defineComponent({
  setup() {
    const router = useRouter();
    /*const onClick = async () => {
      const return_to = localStorage.getItem('returnTo');
      if (return_to) {
        await router.push(return_to);
      }else {
        router.back()
      }
    };*/
    const onClick = () => {
      router.back();
    };
    return () => <Icon name="left" onClick={onClick} style={{
      width: '30px',
      height: '30px',
      position: 'relative',
      top: '2px'
    }}/>;
  }
});

