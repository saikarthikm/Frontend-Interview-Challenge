import { useState, useEffect, useMemo } from "react";
import { appointmentService } from "@/services/appointmentService";

export function useAppointments({ doctorId, date, startDate, endDate }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doctor = useMemo(
    () => (doctorId ? appointmentService.getDoctorById(doctorId) : null),
    [doctorId]
  );

  useEffect(() => {
    if (!doctorId) return;

    async function fetchAppointments() {
      setLoading(true);
      setError(null);
      try {
        let data = [];
        if (date && !startDate && !endDate) {
          data = appointmentService.getAppointmentsByDoctorAndDate(
            doctorId,
            date
          );
        } else if (startDate && endDate) {
          data = appointmentService.getAppointmentsByDoctorAndDateRange(
            doctorId,
            startDate,
            endDate
          );
        }

        const populated = data
          .map(appointmentService.getPopulatedAppointment)
          .filter(Boolean);
        setAppointments(appointmentService.sortAppointmentsByTime(populated));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [doctorId, date, startDate, endDate]);

  return { appointments, doctor, loading, error };
}
