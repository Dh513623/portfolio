import { useEffect, useState } from 'react';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import API from '../api/axios';

export default function Footer() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        API.get('/profile').then(r => setProfile(r.data)).catch(console.error);
    }, []);

    const socialLinks = profile ? [
        { icon: <FaLinkedin size={18} />, href: profile.linkedin, label: 'LinkedIn' },
        { icon: <FaGithub size={18} />, href: profile.github, label: 'GitHub' },
        { icon: <HiOutlineMail size={18} />, href: profile.email ? `mailto:${profile.email}` : null, label: 'Email' },
        { icon: <FaWhatsapp size={18} />, href: profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : null, label: 'WhatsApp' },
    ].filter(l => l.href) : [];

    return (
        <footer className="relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <p className="text-sm text-text-muted">
                            © {new Date().getFullYear()}{' '}
                            <span className="gradient-text font-semibold">{profile?.name || 'Portfolio'}</span>.
                            All rights reserved.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        {socialLinks.map((link, i) => (
                            <a key={i} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}
                                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-text-muted hover:text-primary-light hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
