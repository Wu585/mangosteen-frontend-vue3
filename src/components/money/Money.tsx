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
        {(props.value / 100).toFixed(2)}
      </span>
    );
  }
});

