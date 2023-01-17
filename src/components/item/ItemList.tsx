import {defineComponent, reactive, ref, watchEffect} from 'vue';
import s from './ItemList.module.scss';
import {MainLayout} from '../../layouts/MainLayout';
import {Icon} from '../icon/Icon';
import {Tab} from '../tabs/Tab';
import {Tabs} from '../tabs/Tabs';
import {ItemSummary} from './ItemSummary';
import {getFirstDay, getLastDay} from '../../utils/timeUtils';
import {Overlay} from 'vant';
import {Form} from '../form/Form';
import {FormItem} from '../form/FormItem';
import dayjs from 'dayjs';
import {Button} from '../button/Button';

export const ItemList = defineComponent({
  setup() {
    const selectedTabRef = ref('本月');
    const customDate = ref({
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    });
    const timeList = [
      {startDate: getFirstDay(), endDate: getLastDay()},
      {startDate: getFirstDay(-1), endDate: getLastDay(-1)},
      {startDate: getFirstDay(0, 'year'), endDate: getLastDay(0, 'year')},
    ];
    const refOverlayVisible = ref(false);
    watchEffect(() => {
      if (selectedTabRef.value === '自定义时间') {
        refOverlayVisible.value = true;
      }
    });
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault();
      refOverlayVisible.value = false;
    };
    return () => (
      <MainLayout>
        {{
          title: () => '山竹记账',
          icon: () => <Icon name="menu" class={s.navIcon}/>,
          default: () => <>
            <Tabs v-model:selected={selectedTabRef.value}
                  onUpdate:selected={value => value === '自定义时间' && (refOverlayVisible.value = true)}>
              <Tab name={'本月'}>
                <ItemSummary startDate={timeList[0].startDate} endDate={timeList[0].endDate}/>
              </Tab>
              <Tab name={'上个月'}>
                <ItemSummary startDate={timeList[1].startDate} endDate={timeList[1].endDate}/>
              </Tab>
              <Tab name={'今年'}>
                <ItemSummary startDate={timeList[2].startDate} endDate={timeList[2].endDate}/>
              </Tab>
              <Tab name={'自定义时间'}>
                <ItemSummary startDate={timeList[2].startDate} endDate={timeList[2].endDate}/>
              </Tab>
            </Tabs>
            <Overlay show={refOverlayVisible.value} class={s.overlay}>
              <div class={s.overlay_inner}>
                <header>
                  请选择时间
                </header>
                <main>
                  <Form onSubmit={onSubmitCustomTime}>
                    <FormItem type={'date'} v-model={customDate.value.startDate} label={'开始时间'}/>
                    <FormItem type={'date'} v-model={customDate.value.endDate} label={'结束时间'}/>
                    <FormItem>
                      <div class={s.actions}>
                        <button type={'button'} onClick={() => refOverlayVisible.value = false}>取消</button>
                        <button type={'submit'}>确定</button>
                      </div>
                    </FormItem>
                  </Form>
                </main>
              </div>
            </Overlay>
          </>
        }}
      </MainLayout>
    );
  }
});

