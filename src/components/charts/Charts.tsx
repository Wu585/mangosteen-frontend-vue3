import {defineComponent} from 'vue';

export const Charts = defineComponent({
  props: {
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    }
  },
  setup() {
    return () => (
      <div>
        charts
      </div>
    );
  }
});

