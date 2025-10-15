import {
  MOCK_APPOINTMENTS,
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  getDoctorById,
  getPatientById,
} from "@/data/mockData";

export class AppointmentService {
  getAppointmentsByDoctor(doctorId) {
    return MOCK_APPOINTMENTS.filter((a) => a.doctorId === doctorId);
  }

  getAppointmentsByDoctorAndDate(doctorId, date) {
    return MOCK_APPOINTMENTS.filter((a) => {
      const apptDate = new Date(a.startTime);
      return (
        a.doctorId === doctorId &&
        apptDate.toDateString() === date.toDateString()
      );
    });
  }

  getAppointmentsByDoctorAndDateRange(doctorId, startDate, endDate) {
    return MOCK_APPOINTMENTS.filter((a) => {
      const apptDate = new Date(a.startTime);
      return (
        a.doctorId === doctorId && apptDate >= startDate && apptDate <= endDate
      );
    });
  }

  getPopulatedAppointment(appt) {
    const doctor = getDoctorById(appt.doctorId);
    const patient = getPatientById(appt.patientId);
    if (!doctor || !patient) return null;
    return { ...appt, doctor, patient };
  }

  getAllDoctors() {
    return MOCK_DOCTORS;
  }

  getDoctorById(id) {
    return MOCK_DOCTORS.find((d) => d.id === id);
  }

  sortAppointmentsByTime(appts) {
    return [...appts].sort(
      (a, b) => new Date(a.startTime) - new Date(b.startTime)
    );
  }
}

export const appointmentService = new AppointmentService();
