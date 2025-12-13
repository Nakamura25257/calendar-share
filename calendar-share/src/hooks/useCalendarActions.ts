import {DateClickArg} from '@fullcalendar/interaction';
import {
  CalendarReqType,
  CalendarUIType,
  DAY_SHIFT,
  DayTypes,
  HOLIDAY,
  NIGHT_SHIFT,
} from '../components/ui/Calendar/types';
import {addOneDay, convertDateToString} from '../utils/CalendarUtils';
import {Dispatch, SetStateAction} from 'react';

// イベントタイプごとの色設定
const EVENT_COLORS = {
  [HOLIDAY]: {backgroundColor: '#10b981', borderColor: '#059669'},
  [DAY_SHIFT]: {backgroundColor: '#3b82f6', borderColor: '#2563eb'},
  [NIGHT_SHIFT]: {backgroundColor: '#8b5cf6', borderColor: '#7c3aed'},
} as const;

export const useCalendarActions = (
  email: string,
  selectedDate: string,
  setCalendarData: Dispatch<SetStateAction<CalendarUIType[]>>,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  setSelectedDate: Dispatch<SetStateAction<string>>,
) => {
  // カレンダーセルクリック時処理
  const handleDateClick = async (e: DateClickArg) => {
    // console.log('calendar cell click', e);
  };

  // 日勤ボタンクリック時処理
  const onDayShiftBtnClick = async (): Promise<void> => {
    await calendarEventBtnClick(DAY_SHIFT);
  };

  // 夜勤ボタンクリック時処理
  const onNightShiftBtnClick = async (): Promise<void> => {
    await calendarEventBtnClick(NIGHT_SHIFT);
  };

  // 休日ボタンクリック時処理
  const onHolidayBtnClick = async (): Promise<void> => {
    await calendarEventBtnClick(HOLIDAY);
  };

  // カレンダー登録処理
  const handleAddDate = async (data: CalendarReqType): Promise<void> => {
    try {
      const res = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const result: {data: CalendarUIType[]} = await res.json();
        const startDate: Date = new Date(result.data[0].start);
        const formattedStartDate: string = convertDateToString(startDate);
        const calendarData: CalendarUIType = result.data[0];
        const colors = EVENT_COLORS[data.type as keyof typeof EVENT_COLORS];
        const postData: CalendarUIType = {
          ...calendarData,
          start: formattedStartDate,
          ...colors,
        };

        setCalendarData(prev => [...prev, postData]);
        setShowModal(false);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error('error', e);
      } else {
        console.error('unexpected error', e);
      }
    }
  };

  // ボタンクリック時 API問い合わせ共通処理
  const calendarEventBtnClick = async (dateType: DayTypes): Promise<void> => {
    const tempId: string = 'tmpId-' + Date.now();
    const postData: CalendarReqType = {
      type: dateType,
      description: '',
      startDate: selectedDate,
      email: email,
      id: tempId,
    };

    await handleAddDate(postData);

    // Dateに再度変換+プラス1する
    const addedDate: string = addOneDay(selectedDate);
    setSelectedDate(addedDate);
  };

  return {
    handleDateClick,
    onDayShiftBtnClick,
    onNightShiftBtnClick,
    onHolidayBtnClick,
    handleAddDate,
  };
};
