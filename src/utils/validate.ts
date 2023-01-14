interface FData {
  [k: string]: string | number | undefined | null | FData;
}

type Rule<T> = {
  key: keyof T
  message: string
} & ({ type: 'required' } | { type: 'pattern', regex: RegExp })

type Rules<T> = Rule<T>[]

type Errors<T> = {
  [k in keyof T]?: string[]
}

export type {FData, Rules, Rule, Errors};
export const validate = <T extends FData>(formData: T, rules: Rules<T>): Errors<T> => {
  const errors: Errors<T> = {};
  rules.forEach(rule => {
    const {key, message, type} = rule;
    const value = formData[key];
    switch (type) {
      case 'required':
        if (value === null || value === undefined || value === '') {
          errors[key] = errors[key] || [];
          errors[key]?.push(message);
        }
        break;
      case 'pattern':
        if (value && !rule.regex.test(value.toString())) {
          errors[key] = errors[key] || [];
          errors[key]?.push(message);
        }
        break;
      default:
        return;
    }
  });
  return errors;
};
