import { useEffect, useState } from 'react';
import { FiBriefcase, FiCalendar, FiAward } from 'react-icons/fi';
import API from '../api/axios';

function Modal({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="relative max-w-4xl w-full mx-4 bg-dark-light rounded-xl p-6 overflow-auto z-10">
                <button onClick={onClose} className="absolute top-3 right-3 text-text-muted">Close</button>
                {children}
            </div>
        </div>
    );
}

export default function Experience() {
    const [internships, setInternships] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedInternship, setSelectedInternship] = useState(null);

    useEffect(() => {
        API.get('/experience/internships').then(r => setInternships(r.data)).catch(console.error);
        API.get('/experience/events').then(r => setEvents(r.data)).catch(console.error);
    }, []);

    return (
        <section id="experience" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/3 to-transparent pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="section-title">My <span className="gradient-text">Experience</span></h2>
                    <p className="section-subtitle">Professional journey and events</p>
                </div>

                {/* Internships Timeline */}
                {internships.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-xl font-bold text-primary-light mb-8 flex items-center gap-2">
                            <FiBriefcase /> Internships
                        </h3>
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-accent/50 hidden sm:block" />

                            <div className="space-y-8">
                                {internships.map((item, idx) => (
                                    <div
                                        key={item._id}
                                        className="relative sm:pl-16 fade-in"
                                        style={{ animationDelay: `${idx * 0.15}s` }}
                                    >
                                        {/* Timeline dot */}
                                        <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/30 border-2 border-dark hidden sm:block" />

                                        <div className="card hover:border-primary/30">
                                            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                                <div>
                                                    <h4 className="text-lg font-bold text-white">{item.role}</h4>
                                                    <p className="text-primary-light font-medium">{item.company}</p>
                                                </div>
                                                {item.duration && (
                                                    <span className="flex items-center gap-1.5 text-sm text-text-muted bg-white/5 px-3 py-1 rounded-full">
                                                        <FiCalendar size={14} /> {item.duration}
                                                    </span>
                                                )}
                                            </div>
                                            {item.description && (
                                                <p className="text-text-muted text-sm leading-relaxed mb-3">{item.description}</p>
                                            )}
                                            {item.skills?.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {item.skills.map((skill, i) => (
                                                        <span key={i} className="tag">{skill}</span>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedInternship(item);
                                                    }}
                                                    className="btn-secondary text-xs !px-3 !py-2"
                                                >
                                                    Verify
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Events */}
                {events.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold text-secondary-light mb-8 flex items-center gap-2">
                            <FiAward /> Events & Workshops
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event, idx) => (
                                <div
    key={event._id}
    onClick={() => setSelectedEvent(event)}
    className="group relative card bg-gradient-to-br from-secondary/5 to-accent/5 fade-in cursor-pointer overflow-hidden"
    style={{ animationDelay: `${idx * 0.1}s` }}
>
    {event.type && (
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-secondary/15 text-secondary-light border border-secondary/25 mb-3">
            {event.type}
        </span>
    )}

    <h4 className="text-base font-bold text-white mb-2">
        {event.name}
    </h4>

    {event.description && (
        <p className="text-text-muted text-sm mb-3 leading-relaxed">
            {event.description}
        </p>
    )}

    {event.date && (
        <p className="text-xs text-text-muted flex items-center gap-1.5">
            <FiCalendar size={12} /> {event.date}
        </p>
    )}

    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span className="text-xl font-bold text-secondary-light mb-8 flex items-center gap-2">
            View Certificate
        </span>
    </div>
</div>
                            ))}
                        </div>
                    </div>
                )}
                {selectedEvent && (
                    <Modal onClose={() => { setSelectedEvent(null); }}>
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white">{selectedEvent.name}</h3>
                            {selectedEvent.certificate ? (
                                <div>
                                    <p className="text-sm text-text-muted mb-2">Certificate</p>
                                    {selectedEvent.certificate.endsWith('.pdf') ? (
                                        <a href={selectedEvent.certificate} target="_blank" rel="noreferrer" className="text-primary-light">Open PDF</a>
                                    ) : (
                                        <img src={selectedEvent.certificate} alt="certificate" className="w-full max-h-96 object-contain rounded" />
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-text-muted">No certificate uploaded</p>
                            )}
                        </div>
                    </Modal>
                )}
                {selectedInternship && (
                    <Modal onClose={() => { setSelectedInternship(null); }}>
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white">{selectedInternship.role} @ {selectedInternship.company}</h3>
                            {selectedInternship.certificate ? (
                                <div>
                                    <p className="text-sm text-text-muted mb-2">Internship Certificate</p>
                                    {selectedInternship.certificate.endsWith('.pdf') ? (
                                        <a href={selectedInternship.certificate} target="_blank" rel="noreferrer" className="text-primary-light">Open PDF</a>
                                    ) : (
                                        <img src={selectedInternship.certificate} alt="Internship certificate" className="w-full max-h-96 object-contain rounded" />
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm text-text-muted">No certificate uploaded</p>
                            )}
                        </div>
                    </Modal>
                )}
            </div>
        </section>
    );
}
