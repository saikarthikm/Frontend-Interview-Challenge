'use client';
import { useMemo } from 'react';
import { format, addMinutes, isBefore, isAfter } from 'date-fns';

export function DayView({ appointments, doctor, date }) {
  const timeSlots = useMemo(() => {
    const slots = [];
    let start = new Date(date);
    start.setHours(8, 0, 0, 0);
    const end = new Date(date);
    end.setHours(18, 0, 0, 0);

    while (isBefore(start, end)) {
      const slotEnd = addMinutes(start, 30);
      slots.push({ start: new Date(start), end: slotEnd });
      start = slotEnd;
    }
    return slots;
  }, [date]);

  const getAppointmentsForSlot = slot => appointments.filter(appt => {
    const start = new Date(appt.startTime);
    const end = new Date(appt.endTime);
    return (isBefore(start, slot.end) && isAfter(end, slot.start)) || start.getTime() === slot.start.getTime();
  });

  return (
    <div className="day-view">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{format(date, 'EEEE, MMMM d, yyyy')}</h3>
        {doctor && <p className="text-sm text-gray-600">Dr. {doctor.name} - {doctor.specialty}</p>}
      </div>

      <div className="border rounded overflow-hidden">
        {timeSlots.map((slot, idx) => (
          <div key={idx} className="flex border-b min-h-[50px] relative">
            <div className="w-24 p-2 text-sm text-gray-600">{format(slot.start, 'h:mm a')}</div>
            <div className="flex-1 p-2 relative">
              {getAppointmentsForSlot(slot).map(appt => (
                <div
                  key={appt.id}
                  className="absolute left-0 right-0 bg-blue-100 border-l-4 border-blue-600 p-1 rounded text-xs"
                  style={{ top: 0, height: `${(new Date(appt.endTime) - new Date(appt.startTime)) / (30 * 60 * 1000) * 50}px` }}
                >
                  <div className="font-semibold">{appt.patient?.name}</div>
                  <div>{appt.type}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
