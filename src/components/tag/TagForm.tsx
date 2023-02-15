import {defineComponent, onMounted, reactive} from 'vue';
import s from './Tag.module.scss';
import {Button} from '../button/Button';
import {noError, Rules, validate} from '../../utils/validate';
import {Form} from '../form/Form';
import {FormItem} from '../form/FormItem';
import {useRoute, useRouter} from 'vue-router';
import {http} from '../../utils/http';
import {onFormError} from '../../utils/onFormError';

export interface TagFormData {
  id?: number;
  name: string;
  sign: string;
  kind: string;
}

export const TagForm = defineComponent({
  props: {
    id: Number
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    if (!route.query.kind) {
      return () => <div>参数错误</div>;
    }
    const kind = route.query.kind.toString();
    const formData = reactive<TagFormData>({
      name: '',
      sign: '',
      kind
    });
    // let errors = ref<Errors<TagFormData>>({});
    let errors = reactive<{ [k in keyof TagFormData]?: string[] }>({});
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const rules: Rules<TagFormData> = [
        {key: 'name', type: 'required', message: '必填'},
        {key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符'},
        {key: 'sign', type: 'required', message: '必填'},
      ];
      Object.assign(errors, {
        name: [],
        sign: []
      });
      Object.assign(errors, validate(formData, rules));
      // errors.value = validate(toRaw(formData), rules);
      if (noError(errors)) {
        const promise = props.id ?
          http.patch(`/tags/${props.id}`, formData, {
            // params: {_mock: 'tagEdit'}
            _autoLoading: true
          }).then(() => {
            router.back();
          }) :
          http.post('/tags', formData, {
            params: {_mock: 'tagCreate'},
            _autoLoading: true
          }).then(() => {
            router.back();
          });
        promise.catch((error) => {
          onFormError(error, (data) => Object.assign(errors, data.errors));
        });
      }
    };
    onMounted(async () => {
      if (!props.id) {
        return;
      }
      const response = await http.get<Resource<Tag>>(`/tags/${props.id}`, {
        _mock: 'tagShow'
      });
      Object.assign(formData, response.data.resource);
    });
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem label={'标签名(最多4个字符)'} type={'text'} v-model={formData.name}
                  error={errors['name']?.[0]}/>
        <FormItem label={'符号 ' + formData.sign}
                  type="emojiSelect" v-model={formData.sign}
                  error={errors['sign']?.[0]}/>
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

