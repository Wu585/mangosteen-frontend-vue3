import {defineComponent, reactive} from 'vue';
import s from './ItemCreate.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Tabs} from '../tabs/Tabs';
import {Tab} from '../tabs/Tab';
import {InputPad} from './InputPad';
import {Tags} from './Tags';
import {time} from '../../utils/time';
import {http} from '../../utils/http';
import {useRouter} from 'vue-router';
import {showDialog} from 'vant';
import {AxiosError} from 'axios';
import {BackIcon} from '../back/BackIcon';

type FormData = {
  kind: string,
  tags_id: number[],
  happened_at: string[],
  amount: number
}

export const ItemCreate = defineComponent({
  setup() {
    const router = useRouter();
    const formData = reactive<FormData>({
      kind: '支出',
      tags_id: [],
      happened_at: time(new Date()).format().split('-'),
      amount: 0
    });
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        showDialog({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n')
        });
      }
      throw error;
    };
    const onSubmit = async () => {
      await http.post<Resource<Item>>('/items', {
        ...formData,
        happened_at: formData.happened_at.join('-')
      }, {params: {_mock: 'itemCreate'}, _autoLoading: true}).catch(onError);
      await router.push('/items');
      // console.log(dayjs(formData.happened_at.join('-')).toISOString());
    };
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => '记一笔',
          icon: () => <BackIcon/>,
          default: () => <div class={s.wrapper}>
            <Tabs class={s.tabs} v-model:selected={formData.kind}>
              {/*<Tabs v-model:selected={selectedTabRef.value}>*/}
              <Tab name="支出">
                <Tags kind={'expenses'} v-model:selected={formData.tags_id[0]}/>
              </Tab>
              <Tab name="收入">
                <Tags kind={'income'} v-model:selected={formData.tags_id[0]}/>
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad onSubmit={onSubmit} v-model:happenAt={formData.happened_at} v-model:amount={formData.amount}/>
            </div>
          </div>
        }}
      </MainLayout>
    );
  }
});

