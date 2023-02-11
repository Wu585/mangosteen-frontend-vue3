import {faker} from '@faker-js/faker';
import {AxiosRequestConfig} from 'axios';

type Mock = (config: AxiosRequestConfig) => [number, any]

faker.setLocale('zh_CN');

export const mockTagShow: Mock = () => {
  return [200, {
    resource: {
      id: 1,
      user_id: 1,
      name: 'tag1',
      sign: faker.internet.emoji(),
      kind: 'expense'
    }
  }];
};

export const mockItemCreate: Mock = (config) => {
  /*return [422, {
    errors: {
      tags_id: ['必须选择标签'],
      amount: ['金额不能为空']
    }
  }];*/
  return [200, {
    resource: {
      'id': 2264,
      'user_id': 1312,
      'amount': 9900,
      'note': null,
      'tags_id': [3508],
      'happened_at': '2020-10-29T16:00:00.000Z',
      'created_at': '2022-07-03T15:35:56.301Z',
      'updated_at': '2022-07-03T15:35:56.301Z',
      'kind': 'expenses'
    }
  }];
};

export const mockSession: Mock = (config) => {
  return [200, {
    jwt: faker.random.word()
  }];
};

let id = 0;
const createId = () => {
  id += 1;
  return id;
};

export const mockTagIndex: Mock = (config) => {
  const {kind, page} = config.params;
  const per_page = 25;
  const count = 51;

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

  if (kind === 'expenses' && (!page || page === 1)) {
    return [200, createBody(25)];
  } else if (kind === 'expenses' && page === 2) {
    return [200, createBody(25)];
  } else if (kind === 'expenses' && page === 3) {
    return [200, createBody(1)];
  } else if (kind === 'income' && (!page || page === 1)) {
    return [200, createBody(25)];
  } else if (kind === 'income' && page === 2) {
    return [200, createBody(25)];
  } else {
    return [200, createBody(1)];
  }
};
