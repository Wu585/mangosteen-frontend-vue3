import {onMounted} from 'vue';
import {mePromise} from '../utils/me';

export const useAfterMe = (fn: () => void) => {
  onMounted(async () => {
    try {
      await mePromise;
    } catch (err) {
      return;
    }
    /*// return 一个error相当于在这里把错误处理了，后续代码还会执行
    await mePromise?.catch(err => {
      return err;
    });
    // 这里如果throw一个error，那么控制台还会有未处理的报错
    await mePromise?.catch(err => {
      throw err;
    });
    // 正确做法
    const result = await mePromise?.catch(error => new Error());
    console.log(result);
    if (result instanceof Error) {
      return;
    }
    // 也可以直接把后续放在then里，但第二个参数还是要处理一下的
    mePromise?.then(fn, () => undefined);*/
    fn();
  });
};
