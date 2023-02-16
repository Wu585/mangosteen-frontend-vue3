import {defineComponent, reactive, ref} from 'vue';
import s from './ItemSummary.module.scss';
import {FloatButton} from '../floatbutton/FloatButton';
import {http} from '../../utils/http';
import {Button} from '../button/Button';
import {Money} from '../money/Money';
import {DateTime} from '../datetime/DateTime';
import {watch} from 'vue';
import {Center} from '../center/Center';
import {Icon} from '../icon/Icon';
import {RouterLink} from 'vue-router';
import {useAfterMe} from '../../hooks/useAfterMe';
import dayjs from 'dayjs';

export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    }
  },
  setup(props) {
    const items = ref<Item[]>([]);
    const hasMore = ref(false);
    const page = ref(0);
    const fetchItems = async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get<Resources<Item>>('/items', {
        happened_after: props.startDate,
        happened_before: props.endDate,
        page: page.value + 1,
        per_page: 25,
        _mock: 'itemIndex'
      }, {_autoLoading: true});
      const {resource, pager} = response.data;
      items.value.push(...resource);
      hasMore.value = (pager.page - 1) * pager.per_page + resource.length < pager.count;
      page.value += 1;
    };
    useAfterMe(fetchItems);

    watch(() => [props.startDate, props.endDate], async () => {
      items.value = [];
      hasMore.value = false;
      page.value = 0;
      await fetchItems();
    });

    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0
    });

    const fetchBalance = async () => {
      if (!props.startDate || !props.endDate) {
        return;
      }
      const response = await http.get('/items/balance', {
        happened_after: props.startDate,
        happened_before: props.endDate,
        page: page.value + 1,
        _mock: 'itemIndexBalance'
      });
      Object.assign(itemsBalance, response.data);
    };

    useAfterMe(fetchBalance);

    watch(() => [props.startDate, props.endDate], async () => {
      Object.assign(itemsBalance, {
        expenses: 0,
        income: 0,
        balance: 0
      });
      await fetchBalance();
    });

    return () => (
      <div class={s.wrapper}>
        {items.value.length > 0 ? <>
          <ul class={s.total}>
            <li><span>收入</span><span> ￥ <Money value={itemsBalance.income}/> </span></li>
            <li><span>支出</span><span> ￥ <Money value={itemsBalance.expenses}/></span></li>
            <li><span>净收入</span><span> ￥ <Money value={itemsBalance.balance}/></span></li>
          </ul>
          <ol class={s.list}>
            {items.value.sort((a, b) => dayjs(a.happened_at).unix() - dayjs(b.happened_at).unix())
              .map(item =>
                <li>
                  <div class={s.sign}>
                    <span>{(item.tags && item.tags.length > 0) ? item.tags[0].sign : '💰'}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{(item.tags && item.tags.length > 0) ? item.tags[0].name : '未分类'}</span>
                      <span class={s.amount}>￥ <span>{item.kind === 'expenses' ? '-' : '+'}</span><Money
                        value={item.amount}/></span>
                    </div>
                    <div class={s.time}>
                      <DateTime value={item.happened_at} format={'YYYY-MM-DD'}/>
                    </div>
                  </div>
                </li>
              )}
          </ol>
          <div class={s.more}>
            {hasMore.value ? <Button onClick={fetchItems}>加载更多</Button> : <span>没有更多</span>}
          </div>
        </> : <>
          <Center class={s.pig_wrapper}>
            <Icon name="pig" class={s.pig}/>
          </Center>
          <Center class={s.button_wrapper}>
            <RouterLink to="/items/create">
              <Button class={s.button}>开始记账</Button>
            </RouterLink>
          </Center>
          <FloatButton iconName="add"/>
        </>}
        <RouterLink to={'/items/create'}>
          <FloatButton iconName="add"/>
        </RouterLink>
      </div>
    );
  }
});

