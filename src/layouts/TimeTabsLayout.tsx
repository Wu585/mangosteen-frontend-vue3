import {defineComponent, PropType, ref, watchEffect} from 'vue';
import s from './TimeTabsLayout.module.scss';
import dayjs from 'dayjs';
import {getFirstDay, getLastDay} from '../utils/timeUtils';
import {MainLayout} from './MainLayout';
import {OverLayIcon} from '../components/overlay/OverLayIcon';
import {Tabs} from '../components/tabs/Tabs';
import {Tab} from '../components/tabs/Tab';
import {Overlay} from 'vant';
import {Form} from '../components/form/Form';
import {FormItem} from '../components/form/FormItem';

const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    },
  }
});

export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true
    }
  },
  setup(props) {
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
          icon: () => <OverLayIcon/>,
          default: () => <>
            <Tabs v-model:selected={selectedTabRef.value}
                  onUpdate:selected={value => value === '自定义时间' && (refOverlayVisible.value = true)}>
              <Tab name={'本月'}>
                <props.component startDate={timeList[0].startDate} endDate={timeList[0].endDate}/>
              </Tab>
              <Tab name={'上个月'}>
                <props.component startDate={timeList[1].startDate} endDate={timeList[1].endDate}/>
              </Tab>
              <Tab name={'今年'}>
                <props.component startDate={timeList[2].startDate} endDate={timeList[2].endDate}/>
              </Tab>
              <Tab name={'自定义时间'}>
                <props.component startDate={customDate.value.startDate} endDate={customDate.value.endDate}/>
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

