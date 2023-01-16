import dayjs, {ManipulateType} from 'dayjs';

export const getFirstDay = (value: number = 0, type: ManipulateType = 'month') => dayjs().add(value, type).startOf(type).format('YYYY-MM-DD');
export const getLastDay = (value: number = 0, type: ManipulateType = 'month') => dayjs().add(value, type).endOf(type).format('YYYY-MM-DD');
