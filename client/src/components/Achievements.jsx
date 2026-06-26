import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import { FaCode, FaTrophy, FaMedal } from 'react-icons/fa';
import API from '../api/axios';

const platformIcons = {
    'LeetCode': '🟡',
    'HackerRank': '🟢',
    'CodeChef': '🟤',
    'Codeforces': '🔵',
    'GeeksforGeeks': '🟩',
};

const platformColors = {
    'LeetCode': 'from-amber-500/15 to-yellow-500/15 border-amber-500/20',
    'HackerRank': 'from-green-500/15 to-emerald-500/15 border-green-500/20',
    'CodeChef': 'from-orange-500/15 to-amber-500/15 border-orange-500/20',
    'Codeforces': 'from-blue-500/15 to-cyan-500/15 border-blue-500/20',
    'GeeksforGeeks': 'from-green-600/15 to-green-400/15 border-green-600/20',
};

const isPdf = (url = '') => /\.pdf$/i.test(url);

export default function Achievements() {
    const [certificates, setCertificates] = useState([]);
    const [codingProfiles, setCodingProfiles] = useState([]);

    useEffect(() => {
        API.get('/achievements/certificates').then(r => setCertificates(r.data)).catch(console.error);
        API.get('/achievements/coding-profiles').then(r => setCodingProfiles(r.data)).catch(console.error);
    }, []);

    return (
        <section id="achievements" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_35%)]" />
                <div className="absolute left-[-8%] top-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl animate-pulse" />
                <div className="absolute right-[-5%] top-1/3 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-5 left-1/3 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl animate-pulse" style={{ animationDelay: '1.8s' }} />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-muted backdrop-blur-sm mb-4">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                        Milestones & credentials
                    </div>
                    <h2 className="section-title transform transition-all duration-500 hover:scale-[1.01]">My <span className="gradient-text">Achievements</span></h2>
                    <p className="section-subtitle max-w-2xl mx-auto">A showcase of certifications, coding milestones, and continuous growth.</p>
                </div>

                {/* Coding Profiles */}
                {codingProfiles.length > 0 && (
                    <div className="mb-16">
                        <h3 className="text-xl font-bold text-accent mb-8 flex items-center gap-2">
                            <FaCode /> Coding Profiles
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {codingProfiles.map((profile, idx) => (
                                <div
                                    key={profile._id}
                                    className={`card group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${platformColors[profile.platform] || 'from-primary/10 to-secondary/10 border-primary/20'} p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] hover:brightness-110 hover:saturate-125 fade-in`}
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-cyan-400/10 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105" />
                                    <div className="relative z-10 flex items-center gap-3 mb-4">
                                        <span className="text-2xl">{platformIcons[profile.platform] || '💻'}</span>
                                        <h4 className="text-lg font-bold text-white">{profile.platform}</h4>
                                    </div>

                                    <div className="relative z-10 space-y-3 mb-4">
                                        {profile.problemsSolved > 0 && (
                                            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                                <span className="text-sm text-text-muted flex items-center gap-1.5"><FaTrophy className="text-amber-400" /> Problems Solved</span>
                                                <span className="text-lg font-black gradient-text">{profile.problemsSolved}</span>
                                            </div>
                                        )}
                                        {profile.ranking && (
                                            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                                                <span className="text-sm text-text-muted flex items-center gap-1.5"><FaMedal className="text-secondary-light" /> Ranking</span>
                                                <span className="text-sm font-bold text-white">{profile.ranking}</span>
                                            </div>
                                        )}
                                    </div>

                                    {profile.badges?.length > 0 && (
                                        <div className="relative z-10 flex flex-wrap gap-1.5 mb-4">
                                            {profile.badges.map((badge, i) => (
                                                <span key={i} className="tag text-xs">{badge}</span>
                                            ))}
                                        </div>
                                    )}

                                    {profile.profileLink && (
                                        <a href={profile.profileLink} target="_blank" rel="noreferrer"
                                            className="relative z-10 flex items-center gap-1.5 text-sm text-text-muted hover:text-white transition-colors mt-auto">
                                            <FiExternalLink size={14} /> View Profile
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certificates */}
                {certificates.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold text-primary-light mb-8 flex items-center gap-2">
                            <FaTrophy /> Certifications
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certificates.map((cert, idx) => (
                                <div
                                    key={cert._id}
                                    className="card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)] hover:brightness-110 hover:saturate-125 fade-in"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/15 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105" />
                                    {cert.image ? (
                                        isPdf(cert.image) ? (
                                            <div className="rounded-xl mb-4 h-40 border border-white/10 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 flex flex-col items-center justify-center gap-2 text-center px-4 transition-transform duration-500 group-hover:scale-[1.02]">
                                                <span className="text-4xl opacity-60">📄</span>
                                                <span className="text-sm font-semibold text-white">PDF Certificate</span>
                                                <span className="text-xs text-text-muted">Tap below to open</span>
                                            </div>
                                        ) : (
                                            <div className="rounded-xl overflow-hidden mb-4 h-40">
                                                <img src={cert.image} alt={cert.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            </div>
                                        )
                                    ) : (
                                        <div className="rounded-xl overflow-hidden mb-4 h-40 bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
                                            <span className="text-4xl opacity-40">📜</span>
                                        </div>
                                    )}
                                    <div className="relative z-10">
                                        <h4 className="text-base font-bold text-white mb-1 group-hover:text-primary-light transition-colors">{cert.name}</h4>
                                        {cert.organization && (
                                            <p className="text-sm text-text-muted mb-2">{cert.organization}</p>
                                        )}
                                    </div>
                                    <div className="relative z-10 flex items-center justify-between mt-3">
                                        {cert.issueDate && (
                                            <span className="text-xs text-text-muted">{cert.issueDate}</span>
                                        )}
                                        <div className="flex items-center gap-2">
                                            {cert.image && (
                                                <a href={cert.image} target="_blank" rel="noreferrer"
                                                    className="flex items-center gap-1 text-xs text-primary-light hover:text-white transition-colors">
                                                    <FiExternalLink size={12} /> {isPdf(cert.image) ? 'Open PDF' : 'View'}
                                                </a>
                                            )}
                                            
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
