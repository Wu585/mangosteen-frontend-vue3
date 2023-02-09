type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

type Tag = {
  id: number,
  user_id: number,
  name: string,
  sign: string,
  kind: expenses | income
}

type Resource<T = any> = {
  resource: T[],
  pager: {
    page: number,
    per_page: number,
    count: number
  }
}
