import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
    { name: 'Introduction', href: '#home' },
    { name: 'My Story', href: '#about' },
    { name: 'Expertise', href: '#skills' },
    { name: 'Work Showcase', href: '#projects' },
    { name: 'Growth Path', href: '#experience' },
    { name: 'Milestones', href: '#achievements' },
    { name: 'Connect', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isAdmin) return null;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#home" className="group text-xl font-bold gradient-text transition-transform duration-300 hover:scale-105">
                        Priya<span className="text-white transition-colors duration-300 group-hover:text-cyan-300">dharshini M</span>
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="group relative px-3 py-2 rounded-lg text-sm font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/5"
                            >
                                <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-[-1px]">{link.name}</span>
                                <span className="absolute left-1/2 bottom-1 h-0.5 w-0 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-300 group-hover:w-[70%] group-hover:left-[15%]" />
                            </a>
                        ))}
                        <Link to="/admin/login" >
                            
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden relative flex h-10 w-10 items-center justify-center rounded-full text-white text-2xl transition-all duration-300 hover:bg-white/10 hover:scale-110"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {mobileOpen && (
                    <div className="md:hidden glass-strong rounded-2xl mt-2 p-4 space-y-1 animate-[fadeInUp_0.3s_ease-out]">
                        {navLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted transition-all duration-300 hover:text-white hover:bg-white/5 hover:translate-x-1"
                            >
                                {link.name}
                            </a>
                        ))}
                        <Link
                            to="/admin/login"
                            className="block text-center btn-primary text-sm mt-2 transition-all duration-300 hover:scale-[1.02]"
                            onClick={() => setMobileOpen(false)}
                        >
                            Admin
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
