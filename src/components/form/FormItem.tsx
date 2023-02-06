import {computed, defineComponent, PropType, ref} from 'vue';
import s from './Form.module.scss';
import {EmojiList} from '../emoji/EmojiList';
import {DatePicker, Popup} from 'vant';
import dayjs from 'dayjs';
import {Button} from '../button/Button';

export const FormItem = defineComponent({
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: String || Number
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode' | 'select'>,
    },
    placeholder: {
      type: String
    },
    error: {
      type: String
    },
    onClick: {
      type: Function as PropType<() => void>
    },
    options: {
      type: Array as PropType<Array<{ value: string, text: string }>>
    },
    countForm: {
      type: Number,
      default: 60
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const refDateVisible = ref(false);
    const timer = ref<NodeJS.Timer>();
    const count = ref(props.countForm);
    const isCounting = computed(() => !!timer.value);
    const startCount = () =>
      timer.value = setInterval(() => {
        count.value -= 1;
        if (count.value === 0) {
          clearInterval(timer.value);
          timer.value = undefined;
          count.value = props.countForm;
        }
      }, 1000);
    context.expose({startCount});
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input
            value={props.modelValue}
            placeholder={props.placeholder}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            class={[s.formItem, s.input, props.error ? s.error : '']}/>;
        case 'emojiSelect':
          return <EmojiList
            modelValue={props.modelValue?.toString()}
            onUpdateModelValue={value => context.emit('update:modelValue', value)}
            class={[s.formItem, s.emojiList, s.error]}/>;
        case 'validationCode':
          return <>
            <input placeholder={props.placeholder}
                   value={props.modelValue}
                   onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
                   type="text" class={[s.formItem, s.input, s.validationCodeInput]}/>
            <Button disabled={isCounting.value || props.disabled} onClick={() => props.onClick?.()} class={s.validationCodeButton}>
              {isCounting.value ? `${count.value}秒后可重新发送` : '发送验证码'}
            </Button>
          </>;
        case 'select':
          return <select class={[s.formItem, s.select]}
                         onChange={(e: any) => context.emit('update:modelValue', e?.target.value)}>
            {props.options?.map(option => <option value={option.value}>{option.text}</option>)}
          </select>;
        case 'date':
          return <>
            <input placeholder={props.placeholder}
                   onClick={() => refDateVisible.value = true}
                   class={[s.formItem, s.input]} readonly={true} value={props.modelValue}/>
            <Popup position="bottom"
                   v-model:show={refDateVisible.value}>
              <DatePicker modelValue={props.modelValue?.split('-')} title="选择年月日"
                          onConfirm={({selectedValues}) => {
                            context.emit('update:modelValue', dayjs(selectedValues).format('YYYY-MM-DD'));
                            refDateVisible.value = false;
                          }}
                          onCancel={() => refDateVisible.value = false}/>
            </Popup>
          </>;
        case undefined:
          return context.slots.default?.();
      }
    });
    return () => (
      <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label &&
            <span class={s.formItem_name}>{props.label}</span>
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          <div class={s.formItem_errorHint}>
            <span>{props.error ?? '　'}</span>
          </div>
        </label>
      </div>
    );
  }
});

