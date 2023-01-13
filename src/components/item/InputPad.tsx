import {defineComponent, ref} from 'vue';
import s from './InputPad.module.scss';
import {Icon} from '../icon/Icon';
import {DatePicker, Popup} from 'vant';
import {time} from '../../utils/time';

export const InputPad = defineComponent({
  setup() {
    const buttons = [
      {
        text: '1', onClick: () => {
        }
      },
      {
        text: '2', onClick: () => {
        }
      },
      {
        text: '3', onClick: () => {
        }
      },
      {
        text: '4', onClick: () => {
        }
      },
      {
        text: '5', onClick: () => {
        }
      },
      {
        text: '6', onClick: () => {
        }
      },
      {
        text: '7', onClick: () => {
        }
      },
      {
        text: '8', onClick: () => {
        }
      },
      {
        text: '9', onClick: () => {
        }
      },
      {
        text: '.', onClick: () => {
        }
      },
      {
        text: '0', onClick: () => {
        }
      },
      {
        text: '清空', onClick: () => {
        }
      },
      {
        text: '提交', onClick: () => {
        }
      },
    ];
    const popUpVisibleRef = ref(false);
    const showPopUp = () => popUpVisibleRef.value = true;
    const hidePopUp = () => popUpVisibleRef.value = false;
    const now = new Date();
    const dateRef = ref<Date>(now);
    const currentDateRef = ref(time(dateRef.value).format().split('-'));
    const setDate = (date: any) => {
      currentDateRef.value = date.selectedValues;
      hidePopUp();
    };
    return () => (
      <div class={s.wrapper}>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name={'date'} class={s.icon}/>
            <span onClick={showPopUp}>{currentDateRef.value.join('-')}</span>
            <Popup position={'bottom'} v-model:show={popUpVisibleRef.value}>
              <DatePicker value={currentDateRef.value}
                          title="选择日期" onCancel={hidePopUp}
                          onConfirm={setDate}/>
            </Popup>
          </span>
          <span class={s.amount}>199.2</span>
        </div>
        <div class={s.buttons}>
          {buttons.map(item => <button onClick={item.onClick}>{item.text}</button>)}
        </div>
      </div>
    );
  }
});

