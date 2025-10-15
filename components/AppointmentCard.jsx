'use client';

export function AppointmentCard({ appointment, compact }) {
    const { patient, type, startTime, endTime } = appointment;

    // Simple color mapping based on appointment type
    const TYPE_COLORS = {
        checkup: 'bg-green-100 text-green-800',
        surgery: 'bg-red-100 text-red-800',
        consultation: 'bg-blue-100 text-blue-800',
        followup: 'bg-yellow-100 text-yellow-800',
    };

    const colorClass = TYPE_COLORS[type] || 'bg-gray-100 text-gray-800';

    return (
        <div
            className={`p-2 rounded-md shadow-sm border ${colorClass} ${compact ? 'text-xs py-1 px-2' : 'text-sm'
                }`}
        >
            <div className="font-semibold">
                {compact ? patient.name.split(' ')[0] : patient.name}
            </div>
            {!compact && (
                <>
                    <div className="text-xs">{type}</div>
                    <div className="text-xs text-gray-600">
                        {new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                        {new Date(endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </>
            )}
        </div>
    );
}
