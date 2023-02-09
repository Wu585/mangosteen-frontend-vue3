import {faker} from '@faker-js/faker';
import {AxiosRequestConfig} from 'axios';

type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN');

export const mockSession: Mock = (config) => {
  return [200, {
    jwt: faker.random.word()
  }];
};

export const mockTagIndex: Mock = (config) => {
  const {kind, page} = config.params;
  let id = 0;
  const per_page = 25;
  const count = 26;
  const createId = () => {
    id += 1;
    return id;
  };
  const createTags = (n = 1, attrs?: any) => Array.from({length: n}).map(() => ({
    id: createId(),
    name: faker.lorem.word(),
    sign: faker.internet.emoji(),
    kind,
    ...attrs
  }));
  const createPager = (page = 1) => ({
    page,
    per_page,
    count
  });
  const createBody = (n = 1, attrs?: any) => ({
    resource: createTags(n, attrs),
    pager: createPager(page)
  });

  if (kind === 'expenses' && (page === 1 || !page)) {
    return [200, createBody(25)];
  } else if (page === 2) {
    return [200, createBody(1)];
  } else {
    return [200, {
      resource: createTags(20)
    }];
  }

};
