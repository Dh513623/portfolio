import { useEffect, useState } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaGraduationCap } from 'react-icons/fa';
import API from '../api/axios';

const sampleAcademicData = [
    { year: '10th', semester: 'SSC', institute: 'School Name', percentage: '95%' },
    { year: '11th', semester: 'HSC 1', institute: 'School Name', percentage: '92%' },
    { year: '12th', semester: 'HSC 2', institute: 'School Name', percentage: '90%' },
    { year: '1st Year', semester: 'Sem 1', institute: 'College Name', percentage: '88%' },
    { year: '1st Year', semester: 'Sem 2', institute: 'College Name', percentage: '86%' },
    { year: '2nd Year', semester: 'Sem 3', institute: 'College Name', percentage: '84%' },
    { year: '2nd Year', semester: 'Sem 4', institute: 'College Name', percentage: '83%' },
    { year: '3rd Year', semester: 'Sem 5', institute: 'University Name', percentage: '81%' },
    { year: '3rd Year', semester: 'Sem 6', institute: 'University Name', percentage: '80%' },
    { year: '4th Year', semester: 'Sem 7', institute: 'University Name', percentage: '79%' },
    { year: '4th Year', semester: 'Sem 8', institute: 'University Name', percentage: '78%' },
];

export default function About() {
    const [profile, setProfile] = useState(null);
    const [education, setEducation] = useState([]);

    useEffect(() => {
        API.get('/profile').then(r => setProfile(r.data)).catch(console.error);
        API.get('/achievements/education').then(r => setEducation(r.data)).catch(console.error);
    }, []);

    if (!profile) return null;

    const contactInfo = [
        { icon: <FiPhone />, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
        { icon: <FiMail />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
        { icon: <FiMapPin />, label: 'Location', value: profile.location || profile.address },
        { icon: <FaLinkedin />, label: 'LinkedIn', value: 'LinkedIn Profile', href: profile.linkedin },
        { icon: <FaGithub />, label: 'GitHub', value: 'GitHub Profile', href: profile.github },
    ].filter(c => c.value);

    return (
        <section id="about" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
                    <p className="section-subtitle">Get to know me better</p>
   <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-text-muted">
  <span className="font-semibold text-blue-400">Gratitude</span> inspires learning →{' '}
 <span className="font-semibold text-cyan-300">Learning</span> drives self-development →{' '}
  <span className="font-semibold text-green-400">Self-development</span> creates shared success →{' '}
   <span className="font-semibold text-fuchsia-300">Shared success</span> leads to collective growth.
</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Career Objective */}
                    <div className="card">
                        <h3 className="text-xl font-bold mb-4 text-primary-light">🎯 Career Objective</h3>
                        <p className="text-text-muted leading-relaxed">{profile.objective || profile.summary}</p>
                    </div>

                    {/* Contact Details */}
                    <div className="card">
                        <h3 className="text-xl font-bold mb-4 text-secondary-light">📞 Contact Details</h3>
                        <div className="space-y-3">
                            {contactInfo.map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary-light shrink-0">
                                        {item.icon}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-xs text-text-muted">{item.label}</p>
                                        {item.href ? (
                                            <a href={item.href} target="_blank" rel="noreferrer" className="text-sm text-white hover:text-primary-light transition-colors truncate block">
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-sm text-white truncate">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="card lg:col-span-2">
                        <h3 className="text-xl font-bold mb-6 text-accent">
                            <FaGraduationCap className="inline mr-2" />
                            Academic Journey
                        </h3>
                        <div className="relative mt-8 pl-8 md:pl-0">
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-slate-500" />
                            <div className="space-y-5">
                                {(education.length > 0 ? education : sampleAcademicData).map((edu, i) => {
                                    const percentage = Number(String(edu.score || edu.percentage || '0').replace(/[^\d.]/g, '')) || 0;
                                    const isLeft = i % 2 === 0;
                                    return (
                                        <div key={i} className={`relative flex ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                                            <div className="absolute left-4 md:left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-cyan-400 bg-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.35)]" />
                                            <div className={`w-full md:w-[46%] ml-3 md:ml-0 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                                                <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]">
                                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 via-transparent to-fuchsia-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                                    <div className="relative z-10">
                                                        <div className="flex items-center justify-between gap-3 mb-2">
                                                            <span className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">{edu.semester || edu.year}</span>
                                                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-cyan-200">
                                                                {edu.year || edu.semester}
                                                            </span>
                                                        </div>
                                                        <h4 className="font-semibold text-white">{edu.institution || edu.institute}</h4>
                                                        <p className="text-sm text-text-muted mt-1">{edu.qualification || edu.institute}</p>
                                                    </div>
                                                    <div className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-slate-950/70 px-2 py-1 text-[11px] text-slate-300 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                        {percentage}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
