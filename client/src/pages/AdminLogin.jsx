import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiMail } from 'react-icons/fi';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-[float_6s_ease-in-out_infinite]" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/10 blur-[100px] animate-[float_8s_ease-in-out_infinite_1s]" />
            </div>

            <div className="relative w-full max-w-md">
                <div className="card p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                            <FiLock size={28} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Login</h1>
                        <p className="text-text-muted text-sm mt-1">Sign in to manage your portfolio</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm text-text-muted mb-1.5">Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                                <input
                                    type="email" value={email} onChange={e => setEmail(e.target.value)} required
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all"
                                    placeholder="priyadharshinim23cseb21@gmail.com"
                                />
                        </div>
                    </div>
                    <div className="text-sm text-text-muted mt-1">
                        Use seeded admin credentials if testing locally.
                    </div>
                    <div>
                        <label className="block text-sm text-text-muted mb-1.5">Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                            <input
                                type="password" value={password} onChange={e => setPassword(e.target.value)} required
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-text-muted/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/25 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                            {error}
                        </div>
                    )}

                        <button
                            type="submit" disabled={loading}
                            className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-sm text-text-muted hover:text-primary-light transition-colors">
                            ← Back to Portfolio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
