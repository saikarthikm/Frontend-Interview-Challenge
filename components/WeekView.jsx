'use client';
import { useMemo } from 'react';
import { format, addDays, addMinutes, isBefore, isAfter } from 'date-fns';
import { DayView } from './DayView';

export function WeekView({ appointments, doctor, weekStartDate }) {
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i)), [weekStartDate]);

  const timeSlots = useMemo(() => {
    const slots = [];
    let start = new Date(weekStartDate);
    start.setHours(8, 0, 0, 0);
    const end = new Date(weekStartDate);
    end.setHours(18, 0, 0, 0);

    while (isBefore(start, end)) {
      const slotEnd = addMinutes(start, 30);
      slots.push({ start: new Date(start), end: slotEnd });
      start = slotEnd;
    }
    return slots;
  }, [weekStartDate]);

  const getAppointmentsForDayAndSlot = (day, slotStart) => {
    return appointments.filter(appt => {
      const start = new Date(appt.startTime);
      const end = new Date(appt.endTime);
      const sameDay = start.toDateString() === day.toDateString();
      return sameDay && ((isBefore(start, addMinutes(slotStart, 30)) && isAfter(end, slotStart)) || start.getTime() === slotStart.getTime());
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="w-20 p-2 border-b">Time</th>
            {weekDays.map((day, i) => (
              <th key={i} className="p-2 border-l border-b text-left">
                <div className="font-semibold">{format(day, 'EEE')}</div>
                <div className="text-xs text-gray-600">{format(day, 'MMM d')}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, i) => (
            <tr key={i}>
              <td className="p-2 border-t text-sm text-gray-600">{format(slot.start, 'h:mm a')}</td>
              {weekDays.map((day, j) => (
                <td key={j} className="p-1 border-t border-l align-top min-h-[50px] relative">
                  {getAppointmentsForDayAndSlot(day, slot.start).map(appt => (
                    <div key={appt.id} className="absolute left-0 right-0 bg-blue-100 border-l-4 border-blue-600 p-1 rounded text-xs">
                      <div className="font-semibold">{appt.patient?.name}</div>
                      <div>{appt.type}</div>
                    </div>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
