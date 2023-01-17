import {defineComponent, reactive} from 'vue';
import {MainLayout} from '../layouts/MainLayout';
import {Icon} from '../components/icon/Icon';
import s from './SignInPage.module.scss';
import {Form} from '../components/form/Form';
import {FormItem} from '../components/form/FormItem';
import {Button} from '../components/button/Button';

export const SignInPage = defineComponent({
  setup() {
    const formData = reactive({
      email: '',
      validationCode: ''
    });
    const error = reactive({
      email: [],
      validationCode: []
    });
    const onSubmit = (e: Event) => {
      e.preventDefault();
    };
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
                        type={'text'} error={error.email[0]}/>
              <FormItem placeholder={'请输入六位数字'} v-model={formData.validationCode} label={'验证码'}
                        type={'validationCode'}
                        error={error.validationCode[0]}/>
              <FormItem style={{paddingTop: '96px'}}>
                <Button>登录</Button>
              </FormItem>
            </Form>
          </div>
        }}
      </MainLayout>
    );
  }
});

