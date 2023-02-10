import {defineComponent, PropType, ref} from 'vue';
import s from './InputPad.module.scss';
import {Icon} from '../icon/Icon';
import {DatePicker, Popup} from 'vant';

export const InputPad = defineComponent({
  props: {
    happenAt: Array as PropType<Array<string>>,
    amount: Number,
    onSubmit: {
      type: Function as PropType<() => void>
    }
  },
  emits: ['update:happenAt', 'update:amount'],
  setup(props, context) {
    const appendText = (n: number | string) => {
      const nString = n.toString();
      const dotIndex = refAmount.value.indexOf('.');
      if (refAmount.value.length >= 13) {
        return;
      }
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
        return;
      }
      if (nString === '.') {
        if (dotIndex >= 0) { // 已经有小数点了
          return;
        }
      } else if (nString === '0') {
        if (dotIndex === -1) { // 没有小数点
          if (refAmount.value === '0') { // 没小数点，但是有0
            return;
          }
        }
      } else {
        if (refAmount.value === '0') {
          refAmount.value = '';
        }
      }
      refAmount.value += n.toString();
    };
    const buttons = [
      {
        text: '1', onClick: () => {
          appendText(1);
        }
      },
      {
        text: '2', onClick: () => {
          appendText(2);
        }
      },
      {
        text: '3', onClick: () => {
          appendText(3);
        }
      },
      {
        text: '4', onClick: () => {
          appendText(4);
        }
      },
      {
        text: '5', onClick: () => {
          appendText(5);
        }
      },
      {
        text: '6', onClick: () => {
          appendText(6);
        }
      },
      {
        text: '7', onClick: () => {
          appendText(7);
        }
      },
      {
        text: '8', onClick: () => {
          appendText(8);
        }
      },
      {
        text: '9', onClick: () => {
          appendText(9);
        }
      },
      {
        text: '.', onClick: () => {
          appendText('.');
        }
      },
      {
        text: '0', onClick: () => {
          appendText(0);
        }
      },
      {
        text: '清空', onClick: () => {
          refAmount.value = '0';
        }
      },
      {
        text: '提交', onClick: () => {
          context.emit('update:amount', parseFloat(refAmount.value) * 100);
          props.onSubmit?.()
          refAmount.value = '0';
        }
      },
    ];
    const popUpVisibleRef = ref(false);
    const showPopUp = () => popUpVisibleRef.value = true;
    const hidePopUp = () => popUpVisibleRef.value = false;
    const setDate = (date: any) => {
      context.emit('update:happenAt', date.selectedValues);
      hidePopUp();
    };
    const refAmount = ref(props.amount ? (props.amount / 100).toString() : '0');
    return () => (
      <div class={s.wrapper}>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name={'date'} class={s.icon}/>
            <span onClick={showPopUp}>{props.happenAt?.join('-')}</span>
            <Popup position={'bottom'} v-model:show={popUpVisibleRef.value}>
              <DatePicker modelValue={props.happenAt}
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

