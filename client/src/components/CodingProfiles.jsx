import { useEffect, useState } from 'react';
import { FiExternalLink, FiChevronRight } from 'react-icons/fi';
import { FaCode, FaTrophy, FaMedal, FaFire, FaCalendar } from 'react-icons/fa';
import API from '../api/axios';

const platformIcons = {
    'LeetCode': '🟡',
    'HackerRank': '🟢',
    'CodeChef': '🟤',
    'Codeforces': '🔵',
    'GeeksforGeeks': '🟩',
    'AtCoder': '⚫',
    'TopCoder': '🔴',
};

const platformLinks = {
    'LeetCode': 'https://leetcode.com/',
    'HackerRank': 'https://www.hackerrank.com/',
    'CodeChef': 'https://www.codechef.com/',
    'Codeforces': 'https://codeforces.com/',
    'GeeksforGeeks': 'https://www.geeksforgeeks.org/',
};

const platformGradients = {
    'LeetCode': 'from-amber-500 to-yellow-500',
    'HackerRank': 'from-green-500 to-emerald-500',
    'CodeChef': 'from-orange-500 to-amber-500',
    'Codeforces': 'from-blue-500 to-cyan-500',
    'GeeksforGeeks': 'from-green-600 to-green-400',
    'AtCoder': 'from-slate-600 to-slate-800',
    'TopCoder': 'from-red-500 to-rose-600',
};

const platformBgGradients = {
    'LeetCode': 'from-amber-500/15 to-yellow-500/15 border-amber-500/20',
    'HackerRank': 'from-green-500/15 to-emerald-500/15 border-green-500/20',
    'CodeChef': 'from-orange-500/15 to-amber-500/15 border-orange-500/20',
    'Codeforces': 'from-blue-500/15 to-cyan-500/15 border-blue-500/20',
    'GeeksforGeeks': 'from-green-600/15 to-green-400/15 border-green-600/20',
    'AtCoder': 'from-slate-600/15 to-slate-800/15 border-slate-600/20',
    'TopCoder': 'from-red-500/15 to-rose-600/15 border-red-500/20',
};

export default function CodingProfiles() {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/achievements/coding-profiles')
            .then(r => {
                setProfiles(r.data);
                if (r.data.length > 0) setSelectedProfile(r.data[0]);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section id="coding-profiles" className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-text-muted">Loading coding profiles...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (profiles.length === 0) {
        return null;
    }

    return (
        <section id="milestones" className="py-20 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.15),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.15),_transparent_40%)]" />
                <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
                <div className="absolute left-0 bottom-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-muted backdrop-blur-sm mb-4">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        Competitive Programming
                    </div>
                    <h2 className="section-title">
                        <span className="gradient-text">Coding Profiles</span>
                    </h2>
                    <p className="section-subtitle max-w-2xl mx-auto">
                        My journey across multiple coding platforms and problem-solving achievements
                    </p>
                </div>

                {/* Main content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile cards list */}
                    <div className="lg:col-span-1">
                        <div className="space-y-3 max-h-[500px] overflow-y-auto">
                            {profiles.map((profile, idx) => (
                                <button
                                    key={profile._id}
                                    onClick={() => setSelectedProfile(profile)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 fade-in ${
                                        selectedProfile?._id === profile._id
                                            ? 'bg-gradient-to-r border-white/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                    }`}
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{platformIcons[profile.platform] || '💻'}</span>
                                            <div>
                                                <h4 className="font-bold text-white text-sm">{profile.platform}</h4>
                                                {profile.problemsSolved && (
                                                    <p className="text-xs text-text-muted">
                                                        {profile.problemsSolved} problems
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {selectedProfile?._id === profile._id && (
                                            <FiChevronRight className="text-primary-light" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Detailed profile view */}
                    {selectedProfile && (
                        <div className="lg:col-span-2">
                            <div
                                className={`card group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${
                                    platformBgGradients[selectedProfile.platform] || 'from-primary/10 to-secondary/10'
                                } p-8 backdrop-blur-xl transition-all duration-500`}
                            >
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

                                {/* Content */}
                                <div className="relative z-10 space-y-6">
                                    {/* Header */}
                                    <div className="flex items-center gap-4 pb-6 border-b border-white/10">
                                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platformGradients[selectedProfile.platform] || 'from-primary to-secondary'} flex items-center justify-center text-3xl shadow-lg`}>
                                            {platformIcons[selectedProfile.platform] || '💻'}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-2">
                                                {selectedProfile.platform}
                                            </h3>
                                            {selectedProfile.profileLink && (
                                                <a href={selectedProfile.profileLink} target="_blank" rel="noreferrer"
                                                    className="inline-flex items-center gap-2 text-sm text-primary-light hover:text-white transition-colors">
                                                    View Full Profile <FiExternalLink size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Stats grid */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {selectedProfile.problemsSolved && (
                                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <FaTrophy className="text-amber-400 text-lg" />
                                                    <span className="text-sm text-text-muted">Problems Solved</span>
                                                </div>
                                                <p className="text-2xl font-black gradient-text">
                                                    {selectedProfile.problemsSolved}
                                                </p>
                                            </div>
                                        )}

                                        {selectedProfile.ranking && (
                                            <div className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <FaMedal className="text-secondary-light text-lg" />
                                                    <span className="text-sm text-text-muted">Ranking</span>
                                                </div>
                                                <p className="text-2xl font-black text-white">
                                                    {selectedProfile.ranking}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Badges section */}
                                    {selectedProfile.badges && selectedProfile.badges.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <FaFire className="text-orange-400" />
                                                <h4 className="text-sm font-bold text-white">Achievements & Badges</h4>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProfile.badges.map((badge, i) => (
                                                    <div
                                                        key={i}
                                                        className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 border border-primary/50 text-xs font-semibold text-white hover:from-primary/40 hover:to-secondary/40 transition-all cursor-default"
                                                    >
                                                        ⭐ {badge}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Certificates section */}
                                    {selectedProfile.certificates && selectedProfile.certificates.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <FaCalendar className="text-blue-400" />
                                                <h4 className="text-sm font-bold text-white">Certificates</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {selectedProfile.certificates.map((cert, i) => (
                                                    <li key={i} className="text-sm text-text-muted flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-primary-light" />
                                                        {cert}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    {selectedProfile.profileLink && (
                                        <button
                                            onClick={() => window.open(selectedProfile.profileLink, '_blank')}
                                            className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 font-semibold text-white flex items-center justify-center gap-2 group"
                                        >
                                            <span>Explore Profile</span>
                                            <FiExternalLink className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
