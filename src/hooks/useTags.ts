import {onMounted, ref} from 'vue';
import {AxiosResponse} from 'axios';

type Fetcher = (page: number) => Promise<AxiosResponse<Resources<Tag>>>

export const useTags = (fetcher: Fetcher) => {
  const tags = ref<Tag[]>([]);
  const page = ref(0);
  const hasMore = ref(false);

  const fetchTags = async () => {
    const response = await fetcher(page.value);
    const {resource, pager} = response.data;
    tags.value.push(...resource);
    hasMore.value = (pager.page - 1) * pager.per_page + resource.length < pager.count;
    page.value += 1;
  };

  onMounted(fetchTags);

  return {
    page,
    tags,
    hasMore,
    fetchTags
  };
};
