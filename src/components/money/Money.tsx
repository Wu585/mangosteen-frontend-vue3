import {defineComponent} from 'vue';

export const Money = defineComponent({
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    return () => (
      <span>
        {getMoney(props.value)}
      </span>
    );
  }
});

export const getMoney = (n: number) => (n / 100).toFixed(2);
