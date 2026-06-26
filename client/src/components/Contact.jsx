import { useState, useEffect } from 'react';
import { FiSend, FiMapPin, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import API from '../api/axios';

export default function Contact() {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        API.get('/profile').then(r => setProfile(r.data)).catch(console.error);
    }, []);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');
        try {
            await API.post('/contacts', form);
            setStatus('success');
            setForm({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus(null), 4000);
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.response?.data?.message || 'Something went wrong');
        }
    };

    const contactInfo = profile ? [
        { icon: <FiMail />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
        { icon: <FiPhone />, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
        { icon: <FiMapPin />, label: 'Location', value: profile.location || profile.address },
    ].filter(c => c.value) : [];

    const socialLinks = profile ? [
        { icon: <FaLinkedin size={20} />, href: profile.linkedin, color: 'hover:text-blue-400 hover:border-blue-400/30' },
        { icon: <FaGithub size={20} />, href: profile.github, color: 'hover:text-white hover:border-white/30' },
        { icon: <FaWhatsapp size={20} />, href: profile.whatsapp ? `https://wa.me/${profile.whatsapp}` : null, color: 'hover:text-green-400 hover:border-green-400/30' },
    ].filter(l => l.href) : [];

    return (
        <section id="contact" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="section-title">Get in <span className="gradient-text">Touch</span></h2>
                    <p className="section-subtitle">Feel free to reach out for collaborations or just a friendly chat</p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card">
                            <h3 className="text-lg font-bold text-white mb-5">Contact Information</h3>
                            <div className="space-y-4">
                                {contactInfo.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary-light shrink-0">
                                            {item.icon}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-xs text-text-muted">{item.label}</p>
                                            {item.href ? (
                                                <a href={item.href} target="_blank" rel="noreferrer"
                                                    className="text-sm text-white hover:text-primary-light transition-colors truncate block">
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-sm text-white truncate">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {socialLinks.length > 0 && (
                                <div className="flex gap-3 mt-6 pt-5 border-t border-white/5">
                                    {socialLinks.map((link, i) => (
                                        <a key={i} href={link.href} target="_blank" rel="noreferrer"
                                            className={`w-11 h-11 rounded-xl glass flex items-center justify-center text-text-muted ${link.color} transition-all duration-300 hover:-translate-y-1`}>
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="card">
                            <h3 className="text-lg font-bold text-white mb-5">Send a Message</h3>

                            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm text-text-muted mb-1.5">Name *</label>
                                    <input
                                        type="text" name="name" value={form.name} onChange={handleChange} required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-text-muted mb-1.5">Email *</label>
                                    <input
                                        type="email" name="email" value={form.email} onChange={handleChange} required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm text-text-muted mb-1.5">Subject</label>
                                <input
                                    type="text" name="subject" value={form.subject} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all"
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-text-muted mb-1.5">Message *</label>
                                <textarea
                                    name="message" value={form.message} onChange={handleChange} required rows="5"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all resize-none"
                                    placeholder="Your message..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? (
                                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                                ) : (
                                    <><FiSend /> Send Message</>
                                )}
                            </button>

                            {status === 'success' && (
                                <div className="mt-4 flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                                    <FiCheckCircle /> Message sent successfully!
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                    {errorMsg}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
