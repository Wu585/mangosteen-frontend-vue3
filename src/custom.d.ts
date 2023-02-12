type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

type Tag = {
  id: number,
  user_id: number,
  name: string,
  sign: string,
  kind: 'expenses' | 'income'
}

type Resources<T = any> = {
  resource: T[],
  pager: {
    page: number,
    per_page: number,
    count: number
  }
}

type Item = {
  id: number;
  user_id: number;
  amount: number;
  tags_id: number[];
  tags: Tag[];
  happened_at: string;
  kind: 'expenses' | 'income';
};

type Resource<T> = {
  resource: T
}

type ResourceError = {
  errors: Record<string, string[]>
}

type User = {
  id: number
  email: string
}
