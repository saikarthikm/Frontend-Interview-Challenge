'use client';

import { useState } from "react";
import { MOCK_DOCTORS, MOCK_PATIENTS, MOCK_APPOINTMENTS } from "@/data/mockData";

export default function SchedulePage() {
  const [selectedDoctorId, setSelectedDoctorId] = useState(MOCK_DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // YYYY-MM-DD
  const [view, setView] = useState("day"); // "day" or "week"

  // Filter appointments for selected doctor and date
  const filteredAppointments = MOCK_APPOINTMENTS.filter((apt) => {
    const aptDate = new Date(apt.startTime).toISOString().split("T")[0];
    return apt.doctorId === selectedDoctorId && aptDate === selectedDate;
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Schedule</h1>
          <p className="text-gray-600">View and manage doctor appointments</p>
        </header>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          {/* Doctor selector */}
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="border rounded p-2"
          >
            {MOCK_DOCTORS.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialty})
              </option>
            ))}
          </select>

          {/* Date picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded p-2"
          />

          {/* View toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setView("day")}
              className={`px-4 py-2 rounded ${view === "day" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Day
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-4 py-2 rounded ${view === "week" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              Week
            </button>
          </div>
        </div>

        {/* Appointment list */}
        <div className="bg-white rounded-lg shadow p-6">
          {filteredAppointments.length === 0 ? (
            <p className="text-gray-500">No appointments scheduled for this day.</p>
          ) : (
            <ul className="divide-y">
              {filteredAppointments.map((apt) => {
                const doctor = MOCK_DOCTORS.find((d) => d.id === apt.doctorId);
                const patient = MOCK_PATIENTS.find((p) => p.id === apt.patientId);
                return (
                  <li key={apt.id} className="py-2">
                    <span className="font-semibold">{doctor?.name}</span> with{" "}
                    <span className="font-medium">{patient?.name}</span> -{" "}
                    {apt.type} (
                    {new Date(apt.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                    {new Date(apt.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
