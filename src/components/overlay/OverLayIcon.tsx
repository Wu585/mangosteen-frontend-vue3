import {defineComponent, ref} from 'vue';
import s from "./OverLayIcon.module.scss"
import {Icon} from '../icon/Icon';
import {OverLay} from './OverLay';

export const OverLayIcon = defineComponent({
  setup() {
    const overlayVisibleRef = ref(false);
    const onClickMenu = () => {
      overlayVisibleRef.value = !overlayVisibleRef.value;
    };
    return () => (
      <>
        <Icon name="menu" class={s.icon} onClick={onClickMenu}/>
        {overlayVisibleRef.value && <OverLay onClose={() => overlayVisibleRef.value = false}/>}
      </>
    );
  }
});

