export const throttle = (fn: Function, time: number) => {
  let timer: NodeJS.Timeout | undefined = undefined;
  return (...args: any[]) => {
    if (timer) {
      return;
    } else {
      fn(...args);
      timer = setTimeout(() => {
        timer = undefined;
      }, time);
    }
  };
};
