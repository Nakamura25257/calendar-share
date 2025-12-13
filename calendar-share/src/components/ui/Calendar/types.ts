export const HOLIDAY = '休日';
export const DAY_SHIFT = '日勤';
export const NIGHT_SHIFT = '夜勤';

export type DayTypes = typeof HOLIDAY | typeof DAY_SHIFT | typeof NIGHT_SHIFT;

// FullCalendar UI更新用の型&DBからのレスポンス型
export type CalendarUIType = {
  id: string;
  title: string;
  description: string;
  start: string;
  backgroundColor?: string;
  borderColor?: string;
  editable?: boolean;
};

// サーバーへ問い合わせるためのリクエスト型
export type CalendarReqType = {
  type: string;
  description: string;
  startDate: string;
  email: string;
  id: string;
};
