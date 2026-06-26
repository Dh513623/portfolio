import { useEffect, useState } from 'react';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import myImage from '../assets/resumeprofile.png';
import API from '../api/axios';

export default function Hero() {
    const [profile, setProfile] = useState(null);
    const [displayRole, setDisplayRole] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    useEffect(() => {
        API.get('/profile').then(res => setProfile(res.data)).catch(console.error);
    }, []);

    useEffect(() => {
        if (!profile) return;

        const introPhrases = ['Full Stack Developer', 'UI/UX Enthusiast', 'Problem Solver'];
        const fullText = profile.designation || introPhrases[roleIndex % introPhrases.length];
        const typingSpeed = isDeleting ? 45 : 70;

        const timeout = setTimeout(() => {
            if (!isDeleting && displayRole === fullText) {
                const pause = setTimeout(() => setIsDeleting(true), 1400);
                return () => clearTimeout(pause);
            }

            if (isDeleting && displayRole === '') {
                setIsDeleting(false);
                setRoleIndex(prev => (prev + 1) % introPhrases.length);
                return;
            }

            setDisplayRole(prev => isDeleting ? prev.slice(0, -1) : fullText.slice(0, prev.length + 1));
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [profile, displayRole, isDeleting, roleIndex]);

    const handleImageMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -8, y: x * 8 });
    };

    const handleImageLeave = () => setTilt({ x: 0, y: 0 });

    if (!profile) {
        return (
            <section id="home" className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </section>
        );
    }

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-[float_6s_ease-in-out_infinite]" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[120px] animate-[float_8s_ease-in-out_infinite_1s]" />
                <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px] animate-[float_7s_ease-in-out_infinite_2s]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-text-muted mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Available for opportunities
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
                            Hi, I'm{' '}
                            <span className="gradient-text">{profile.name?.split(' ')[0]}</span>
                            <br />
                            <span className="inline-flex min-h-[1.4em] items-center text-3xl sm:text-4xl lg:text-5xl text-text-muted font-semibold">
                                {displayRole}
                                <span className="ml-1 h-8 w-[3px] animate-pulse bg-cyan-400" />
                            </span>
                        </h1>

                        <p className="text-lg text-text-muted max-w-xl mb-8 leading-relaxed">
                            {profile.summary}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            {profile.resumeUrl && (
                                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-primary">
                                    <FiDownload /> Download Resume
                                </a>
                            )}
                            <a href="#contact" className="btn-secondary">
                                Contact Me <FiArrowRight />
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {profile.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noreferrer"
                                    className="w-11 h-11 rounded-xl glass flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                                    <FaLinkedin size={20} />
                                </a>
                            )}
                            {profile.github && (
                                <a href={profile.github} target="_blank" rel="noreferrer"
                                    className="w-11 h-11 rounded-xl glass flex items-center justify-center text-text-muted hover:text-white hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                                    <FaGithub size={20} />
                                </a>
                            )}
                            {profile.email && (
                                <a href={`mailto:${profile.email}`}
                                    className="w-11 h-11 rounded-xl glass flex items-center justify-center text-text-muted hover:text-secondary hover:border-secondary/30 transition-all duration-300 hover:-translate-y-1">
                                    <HiOutlineMail size={20} />
                                </a>
                            )}
                            {profile.whatsapp && (
                                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer"
                                    className="w-11 h-11 rounded-xl glass flex items-center justify-center text-text-muted hover:text-green-400 hover:border-green-400/30 transition-all duration-300 hover:-translate-y-1">
                                    <FaWhatsapp size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right - Profile Image */}
                    <div className="hidden lg:flex justify-center fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="relative" onMouseMove={handleImageMove} onMouseLeave={handleImageLeave}>
                            <div
                                className="relative w-80 h-80 rounded-[1.75rem] overflow-hidden border border-cyan-400/70 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_35px_rgba(34,211,238,0.45),0_0_70px_rgba(168,85,247,0.3)] transition-all duration-200 animate-[pulse-glow_3s_ease-in-out_infinite, float_4s_ease-in-out_infinite]"
                                style={{ transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.x * -0.3}px) translateX(${tilt.y * 0.3}px) scale(1.05)` }}
                            >
                                <div className="absolute inset-0 rounded-[1.75rem] border border-white/20 pointer-events-none" />
                                <img
                                    src={profile.profileImage || myImage}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative dots */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 grid grid-cols-4 gap-2 opacity-30">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-primary" />
                                ))}
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-20 h-20 grid grid-cols-3 gap-2 opacity-20">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-secondary" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 fade-in" style={{ animationDelay: '0.4s' }}>
                    {[
                        { label: 'Projects', value: '3+' },
                        { label: 'LeetCode Problems', value: '400+' },
                        { label: 'Internships', value: '2' },
                        { label: 'CGPA', value: '8.47' }
                    ].map(stat => (
                        <div key={stat.label} className="card text-center">
                            <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
                            <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
