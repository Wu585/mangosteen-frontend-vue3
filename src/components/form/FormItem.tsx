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
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode'>,
    },
    placeholder: {
      type: String
    },
    error: {
      type: String
    },
    onClick: {
      type: Function as PropType<() => void>
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const refDateVisible = ref(false);
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input
            value={props.modelValue}
            placeholder={props.placeholder}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            class={[s.formItem, s.input, s.error]}/>;
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
                   type="text" class={[s.formItem, s.input, s.validationCodeInput, s.error]}/>
            <Button onClick={props.onClick} class={s.validationCodeButton}>发送验证码</Button>
          </>;
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

