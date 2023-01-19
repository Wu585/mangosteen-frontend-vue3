import {defineComponent, reactive, ref, toRaw} from 'vue';
import s from './Tag.module.scss';
import {Button} from '../button/Button';
import {Errors, Rules, validate} from '../../utils/validate';
import {Form} from '../form/Form';
import {FormItem} from '../form/FormItem';

export interface TagFormData {
  name: string;
  sign: string;
}

export const TagForm = defineComponent({
  setup() {
    const formData = reactive<TagFormData>({
      name: '',
      sign: ''
    });
    let errors = ref<Errors<TagFormData>>({});
    const onSubmit = (e: Event) => {
      e.preventDefault();
      const rules: Rules<TagFormData> = [
        {key: 'name', type: 'required', message: '必填'},
        {key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符'},
        {key: 'sign', type: 'required', message: '必填'},
      ];
      // Object.assign(errors,validate(toRaw(formData), rules))
      errors.value = validate(toRaw(formData), rules);
    };
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem label={'标签名'} type={'text'} v-model={formData.name}
                  error={errors.value['name']?.[0]}/>
        <FormItem label={'符号 ' + formData.sign}
                  type="emojiSelect" v-model={formData.sign}
                  error={errors.value['sign']?.[0]}/>
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button type={'submit'} class={[s.button]}>确定</Button>
        </FormItem>
      </Form>
    );
  }
});

