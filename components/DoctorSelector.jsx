'use client';
import { useEffect, useState } from 'react';
import { appointmentService } from '@/services/appointmentService';

export function DoctorSelector({ selectedDoctorId, onDoctorChange }) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setDoctors(appointmentService.getAllDoctors());
  }, []);

  return (
    <select
      value={selectedDoctorId}
      onChange={e => onDoctorChange(e.target.value)}
      className="block w-full px-4 py-2 border rounded"
    >
      <option value="">Select a doctor...</option>
      {doctors.map(doc => (
        <option key={doc.id} value={doc.id}>
          Dr. {doc.name} - {doc.specialty}
        </option>
      ))}
    </select>
  );
}
