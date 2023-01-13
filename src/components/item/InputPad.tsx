import {defineComponent, ref} from 'vue';
import s from './InputPad.module.scss';
import {Icon} from '../icon/Icon';
import {DatePicker, Popup} from 'vant';
import {time} from '../../utils/time';

export const InputPad = defineComponent({
  setup() {
    const refAmount = ref('0')
    const appendText = (n: number | string) => {
      const nString = n.toString()
      const dotIndex = refAmount.value.indexOf('.')
      if (refAmount.value.length >= 13) {
        return
      }
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
        return
      }
      if (nString === '.') {
        if (dotIndex >= 0) { // 已经有小数点了
          return
        }
      } else if (nString === '0') {
        if (dotIndex === -1) { // 没有小数点
          if (refAmount.value === '0') { // 没小数点，但是有0
            return
          }
        }
      } else {
        if (refAmount.value === '0') {
          refAmount.value = ''
        }
      }
      refAmount.value += n.toString()
    }
    const buttons = [
      { text: '1', onClick: () => { appendText(1) } },
      { text: '2', onClick: () => { appendText(2) } },
      { text: '3', onClick: () => { appendText(3) } },
      { text: '4', onClick: () => { appendText(4) } },
      { text: '5', onClick: () => { appendText(5) } },
      { text: '6', onClick: () => { appendText(6) } },
      { text: '7', onClick: () => { appendText(7) } },
      { text: '8', onClick: () => { appendText(8) } },
      { text: '9', onClick: () => { appendText(9) } },
      { text: '.', onClick: () => { appendText('.') } },
      { text: '0', onClick: () => { appendText(0) } },
      { text: '清空', onClick: () => { refAmount.value = '0' } },
      { text: '提交', onClick: () => { } },
    ]
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
          <span class={s.amount}>{refAmount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map(item => <button onClick={item.onClick}>{item.text}</button>)}
        </div>
      </div>
    );
  }
});

