type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

type Tag = {
  id: number,
  user_id: number,
  name: string,
  sign: string,
  kind: expenses | income
}
