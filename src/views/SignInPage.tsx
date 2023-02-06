import {defineComponent, reactive, ref} from 'vue';
import {MainLayout} from '../layouts/MainLayout';
import {Icon} from '../components/icon/Icon';
import s from './SignInPage.module.scss';
import {Form} from '../components/form/Form';
import {FormItem} from '../components/form/FormItem';
import {Button} from '../components/button/Button';
import {validate} from '../utils/validate';
import {http} from '../utils/http';
import {useBool} from '../hooks/useBool';

export const SignInPage = defineComponent({
  setup() {
    const formData = reactive({
      email: '',
      validationCode: ''
    });
    const errors = reactive({
      email: [],
      validationCode: []
    });
    const onSubmit = (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        validationCode: []
      });
      Object.assign(errors, validate(formData, [
        {key: 'email', type: 'required', message: '必填'},
        {key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址'},
        {key: 'validationCode', type: 'required', message: '必填'}
      ]));
    };
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
      }
      // 这里 throw error 就是为了防止下面的  倒计时代码执行，如果不抛出error，那么下面的倒计时还会执行
      throw error;
    };
    const {ref: refDisabled, toggle, on, off} = useBool(false);
    const onSendValidationCode = async () => {
      on();
      Object.assign(errors, {
        email: [],
        validationCode: []
      });
      await http.post('/validation_codes', {
        email: formData.email
      }).catch(onError).finally(off);
      refValidationCode.value.startCount();
    };
    const refValidationCode = ref<any>();
    return () => (
      <MainLayout>
        {{
          title: () => '登录',
          icon: () => <Icon name={'left'}/>,
          default: () => <div class={s.wrapper}>
            <div class={s.logo}>
              <Icon class={s.icon} name={'mangosteen'}/>
              <h1 class={s.appName}>山竹记账</h1>
            </div>
            <Form onSubmit={onSubmit}>
              <FormItem placeholder={'请输入邮箱，然后点击发送验证码'} v-model={formData.email} label={'邮箱地址'}
                        type={'text'} error={errors.email[0]}/>
              <FormItem ref={refValidationCode}
                        placeholder={'请输入六位数字'}
                        v-model={formData.validationCode} label={'验证码'}
                        type={'validationCode'}
                        disabled={refDisabled.value}
                        countForm={3}
                        onClick={onSendValidationCode}
                        error={errors.validationCode[0]}/>
              <FormItem style={{paddingTop: '96px'}}>
                <Button type={'submit'}>登录</Button>
              </FormItem>
            </Form>
          </div>
        }}
      </MainLayout>
    );
  }
});

