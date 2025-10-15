'use client';
import { useAppointments } from '@/hooks/useAppointments';
import { DoctorSelector } from './DoctorSelector';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { addDays } from 'date-fns';

export function ScheduleView({ selectedDoctorId, selectedDate, view, onDoctorChange, onDateChange, onViewChange }) {
  const weekStart = new Date(selectedDate);
  weekStart.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Monday

  const { appointments, doctor } = useAppointments({
    doctorId: selectedDoctorId,
    date: view === 'day' ? selectedDate : undefined,
    startDate: view === 'week' ? weekStart : undefined,
    endDate: view === 'week' ? addDays(weekStart, 6) : undefined
  });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b p-4 flex justify-between items-center">
        <DoctorSelector selectedDoctorId={selectedDoctorId} onDoctorChange={onDoctorChange} />
        <div className="flex gap-2">
          <button onClick={() => onViewChange('day')} className={`px-3 py-1 rounded ${view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Day</button>
          <button onClick={() => onViewChange('week')} className={`px-3 py-1 rounded ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Week</button>
        </div>
      </div>
      <div className="p-4">
        {view === 'day' ? <DayView appointments={appointments} doctor={doctor} date={selectedDate} /> : <WeekView appointments={appointments} doctor={doctor} weekStartDate={weekStart} />}
      </div>
    </div>
  );
}
