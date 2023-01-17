import {computed, defineComponent, PropType, ref} from 'vue';
import s from './EmojiList..module.scss';
import {emojiList} from '../../utils/emojisList';

export const EmojiList = defineComponent({
  props: {
    modelValue: {
      type: String
    },
    onUpdateModelValue: {
      type: Function as PropType<(emoji: string) => void>
    }
  },
  setup(props, {emit}) {
    const selectedRef = ref(1);
    const table: [string, string[]][] = [
      ['表情', ['face-smiling', 'face-affection', 'face-tongue', 'face-hand',
        'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
        'face-glasses', 'face-concerned', 'face-negative', 'face-costume'
      ]],
      ['手势', ['hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger',
        'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts']],
      ['人物', ['person', 'person-gesture', 'person-role', 'person-fantasy',
        'person-activity', 'person-sport', 'person-resting']],
      ['衣服', ['clothing']],
      ['动物', ['cat-face', 'monkey-face', 'animal-mammal', 'animal-bird',
        'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug']],
      ['植物', ['plant-flower', 'plant-other']],
      ['自然', ['sky & weather', 'science']],
      ['食物', [
        'food-fruit', 'food-vegetable', 'food-prepared', 'food-asian',
        'food-marine', 'food-sweet'
      ]],
      ['运动', ['sport', 'game']],
    ];
    const emojisRef = computed(() => {
      const selectedItem = table[selectedRef.value][1];
      return selectedItem.map(category =>
        emojiList.find(item => item[0] === category)?.[1]
          .map(item => <li class={item === props.modelValue ? s.selectedEmoji : ''}
                           onClick={() => onClickEmoji(item)}>{item}</li>));
    });
    const onClickTab = (index: number) => selectedRef.value = index;
    const onClickEmoji = (emoji: string) => {
      if (props.onUpdateModelValue) {
        props.onUpdateModelValue(emoji);
      } else {
        emit('update:modelValue', emoji);
      }
    };
    return () => (
      <div class={s.emojiList}>
        <nav>
          {table.map((item, index) => <span class={index === selectedRef.value ? s.selected : ''}
                                            onClick={() => onClickTab(index)}>{item[0]}</span>)}
        </nav>
        <ol>
          {emojisRef.value}
        </ol>
      </div>
    );
  }
});

