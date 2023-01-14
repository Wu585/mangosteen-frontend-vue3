import {defineComponent, reactive, ref, toRaw} from 'vue';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import s from './TagCreate.module.scss';
import {Button} from '../button/Button';
import {EmojiList} from '../emoji/EmojiList';
import {Errors, Rules, validate} from '../../utils/validate';

interface TagCreateFormData {
  name: string;
  sign: string;
}

export const TagCreate = defineComponent({
  setup() {
    const formData = reactive<TagCreateFormData>({
      name: '',
      sign: ''
    });
    let errors = ref<Errors<TagCreateFormData>>({});
    const onSubmit = (e: Event) => {
      e.preventDefault();
      const rules: Rules<TagCreateFormData> = [
        {key: 'name', type: 'required', message: '必填'},
        {key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符'},
        {key: 'sign', type: 'required', message: '必填'},
      ];
      // Object.assign(errors,validate(toRaw(formData), rules))
      errors.value = validate(toRaw(formData), rules)
    };
    return () => (
      <MainLayout>
        {{
          title: () => '创建标签',
          icon: () => <Icon name={'left'} class={s.navIcon}/>,
          default: () => <form onSubmit={onSubmit} action="" class={s.form}>
            <div class={s.formRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>标签名</span>
                <div class={s.formItem_value}>
                  <input v-model={formData.name} class={[s.formItem, s.input,errors.value.name?s.error:'']} type="text"/>
                </div>
                <div class={s.formItem_errorHint}>
                  <span>{errors.value['name']?.join(', ')}</span>
                </div>
              </label>
            </div>
            <div class={s.formRow}>
              <label class={s.formLabel}>
                <span class={s.formItem_name}>符号 {formData.sign}</span>
                <div class={s.formItem_value}>
                  <EmojiList v-model={formData.sign} class={[s.formItem]} style={{borderColor:errors.value.sign?'red':''}}/>
                </div>
                <div class={s.formItem_errorHint}>
                  <span>{errors.value['sign']?.join(', ')}</span>
                </div>
              </label>
            </div>
            <p class={s.tips}>记账时长按标签即可进行编辑</p>
            <div class={s.formRow}>
              <div class={s.formItem_value}>
                <Button class={[s.formItem, s.button]}>确定</Button>
              </div>
            </div>
          </form>
        }}
      </MainLayout>
    );
  }
});

