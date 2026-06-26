import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser, FiCode, FiFolder, FiBriefcase, FiAward, FiMail, FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiMenu, FiImage } from 'react-icons/fi';
import API from '../api/axios';

const SECTIONS = [
    { key: 'profile', label: 'Profile', icon: <FiUser /> },
    { key: 'skills', label: 'Skills', icon: <FiCode /> },
    { key: 'projects', label: 'Projects', icon: <FiFolder /> },
    { key: 'internships', label: 'Internships', icon: <FiBriefcase /> },
    { key: 'events', label: 'Events', icon: <FiBriefcase /> },
    { key: 'certificates', label: 'Certificates', icon: <FiAward /> },
    { key: 'coding-profiles', label: 'Coding Profiles', icon: <FiCode /> },
    { key: 'education', label: 'Education', icon: <FiAward /> },
    { key: 'contacts', label: 'Messages', icon: <FiMail /> },
];

// ─── Field configs per section ───
const FIELDS = {
    skills: [
        { name: 'name', label: 'Name', required: true },
        { name: 'category', label: 'Category', required: true },
        { name: 'icon', label: 'Icon (emoji)' },
    ],
    projects: [
        { name: 'name', label: 'Name', required: true },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'technologies', label: 'Technologies (comma-separated)', transform: 'csv' },
        { name: 'githubLink', label: 'GitHub Link' },
        { name: 'liveLink', label: 'Live Link' },
        { name: 'status', label: 'Status', type: 'select', options: ['completed', 'in-progress', 'planned'] },
    ],
    internships: [
        { name: 'company', label: 'Company', required: true },
        { name: 'role', label: 'Role', required: true },
        { name: 'duration', label: 'Duration' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'skills', label: 'Skills (comma-separated)', transform: 'csv' },
        { name: 'order', label: 'Order', type: 'number' },
    ],
    events: [
        { name: 'name', label: 'Name', required: true },
        { name: 'type', label: 'Type' },
        { name: 'date', label: 'Date' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'order', label: 'Order', type: 'number' },
    ],
    certificates: [
        { name: 'name', label: 'Name', required: true },
        { name: 'organization', label: 'Organization' },
        { name: 'issueDate', label: 'Issue Date' },
        { name: 'credentialLink', label: 'Credential Link' },
        { name: 'order', label: 'Order', type: 'number' },
    ],
    'coding-profiles': [
        { name: 'platform', label: 'Platform', required: true },
        { name: 'profileLink', label: 'Profile Link' },
        { name: 'problemsSolved', label: 'Problems Solved', type: 'number' },
        { name: 'ranking', label: 'Ranking' },
        { name: 'badges', label: 'Badges (comma-separated)', transform: 'csv' },
    ],
    education: [
        { name: 'qualification', label: 'Qualification', required: true },
        { name: 'institution', label: 'Institution' },
        { name: 'score', label: 'Score' },
        { name: 'year', label: 'Year' },
        { name: 'order', label: 'Order', type: 'number' },
    ],
};

const API_PATHS = {
    skills: '/skills',
    projects: '/projects',
    internships: '/experience/internships',
    events: '/experience/events',
    certificates: '/achievements/certificates',
    'coding-profiles': '/achievements/coding-profiles',
    education: '/achievements/education',
    contacts: '/contacts',
};

function getDisplayField(section) {
    switch (section) {
        case 'skills': return 'name';
        case 'projects': return 'name';
        case 'internships': return 'company';
        case 'events': return 'name';
        case 'certificates': return 'name';
        case 'coding-profiles': return 'platform';
        case 'education': return 'qualification';
        case 'contacts': return 'name';
        default: return 'name';
    }
}

function getSubField(section) {
    switch (section) {
        case 'skills': return 'category';
        case 'projects': return 'status';
        case 'internships': return 'role';
        case 'events': return 'type';
        case 'certificates': return 'organization';
        case 'coding-profiles': return 'problemsSolved';
        case 'education': return 'institution';
        case 'contacts': return 'email';
        default: return null;
    }
}

// ─── Profile Panel ───
function ProfilePanel() {
    const [profile, setProfile] = useState(null);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        API.get('/profile').then(r => setProfile(r.data)).catch(console.error);
    }, []);

    const handleChange = (e) => {
        setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMsg('');
        try {
            await API.put('/profile', profile);
            setMsg('Saved!');
            setTimeout(() => setMsg(''), 2000);
        } catch {
            setMsg('Error saving');
        } finally {
            setSaving(false);
        }
    };

    if (!profile) return <Spinner />;

    const fields = [
        { name: 'name', label: 'Full Name' },
        { name: 'designation', label: 'Designation' },
        { name: 'email', label: 'Email' },
        { name: 'phone', label: 'Phone' },
        { name: 'location', label: 'Location' },
        { name: 'summary', label: 'Summary', type: 'textarea' },
        { name: 'objective', label: 'Career Objective', type: 'textarea' },
        { name: 'linkedin', label: 'LinkedIn URL' },
        { name: 'github', label: 'GitHub URL' },
        { name: 'whatsapp', label: 'WhatsApp Number' },
        { name: 'resumeUrl', label: 'Resume URL' },
    ];

    return (
        <div>
            <h2 className="text-xl font-bold text-white mb-6">Edit Profile</h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {fields.map(field => (
                    <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                        <label className="block text-sm text-text-muted mb-1">{field.label}</label>
                        {field.type === 'textarea' ? (
                            <textarea name={field.name} value={profile[field.name] || ''} onChange={handleChange} rows="3"
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-all resize-none" />
                        ) : (
                            <input type="text" name={field.name} value={profile[field.name] || ''} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-all" />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-3 mt-6">
                <button onClick={handleSave} disabled={saving} className="btn-primary">
                    <FiSave /> {saving ? 'Saving...' : 'Save Profile'}
                </button>
                {msg && <span className="text-sm text-green-400">{msg}</span>}
            </div>
        </div>
    );
}

// ─── CRUD Panel ───
function CrudPanel({ section }) {
    const [items, setItems] = useState([]);
    const [editing, setEditing] = useState(null); // null = list, 'new' = add, {id} = edit
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedScreenshotFile, setSelectedScreenshotFile] = useState(null);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [uploadMsg, setUploadMsg] = useState('');

    const fields = FIELDS[section] || [];
    const apiPath = API_PATHS[section];
    const isContacts = section === 'contacts';

    const fetchItems = async () => {
        setLoading(true);
        try {
            const r = await API.get(apiPath);
            setItems(r.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [section]);

    const openAdd = () => {
        const initial = {};
        fields.forEach(f => { initial[f.name] = f.type === 'number' ? 0 : ''; });
        setForm(initial);
        setSelectedFile(null);
        setSelectedScreenshotFile(null);
        setUploadMsg('');
        setEditing('new');
    };

    const openEdit = (item) => {
        const initial = {};
        fields.forEach(f => {
            if (f.transform === 'csv' && Array.isArray(item[f.name])) {
                initial[f.name] = item[f.name].join(', ');
            } else {
                initial[f.name] = item[f.name] ?? '';
            }
        });
        setForm(initial);
        setSelectedFile(null);
        setSelectedScreenshotFile(null);
        setUploadMsg('');
        setEditing(item._id);
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
    };

    const handleSave = async () => {
        const body = { ...form };
        fields.forEach(f => {
            if (f.transform === 'csv' && typeof body[f.name] === 'string') {
                body[f.name] = body[f.name].split(',').map(s => s.trim()).filter(Boolean);
            }
        });

        try {
            let savedProject;
            if (editing === 'new') {
                savedProject = (await API.post(apiPath, body)).data;
            } else {
                savedProject = (await API.put(`${apiPath}/${editing}`, body)).data;
            }

            if (section === 'projects') {
                if (selectedFile || selectedScreenshotFile) {
                    setUploadingFile(true);
                    setUploadMsg('Uploading project files...');

                    if (selectedFile) {
                        const formData = new FormData();
                        formData.append('logo', selectedFile);
                        await API.post(`/projects/${savedProject._id}/logo`, formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });
                    }

                    if (selectedScreenshotFile) {
                        const formData = new FormData();
                        formData.append('screenshot', selectedScreenshotFile);
                        await API.post(`/projects/${savedProject._id}/screenshot`, formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        });
                    }

                    setUploadMsg(selectedScreenshotFile ? 'Project screenshot uploaded' : 'Project logo uploaded');
                }
            } else if (section === 'certificates' && selectedFile) {
                setUploadingFile(true);
                setUploadMsg('Uploading certificate...');
                const formData = new FormData();
                formData.append('image', selectedFile);
                await API.post(`/achievements/certificates/${savedProject._id}/upload`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setUploadMsg('Certificate uploaded');
            } else if (section === 'events') {
                if (selectedFile) {
                    setUploadingFile(true);
                    setUploadMsg('Uploading certificate...');
                    const formData = new FormData();
                    formData.append('certificate', selectedFile);
                    await API.post(`/experience/events/${savedProject._id}/certificate`, formData);
                    setUploadMsg('Event certificate uploaded');
                }
            } else if (section === 'internships') {
                if (selectedFile) {
                    setUploadingFile(true);
                    setUploadMsg('Uploading certificate...');
                    const formData = new FormData();
                    formData.append('certificate', selectedFile);
                    await API.post(`/experience/internships/${savedProject._id}/certificate`, formData);
                    setUploadMsg('Internship certificate uploaded');
                }
            }

            setEditing(null);
            setSelectedFile(null);
            setSelectedScreenshotFile(null);
            setUploadMsg('');
            fetchItems();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error saving');
        } finally {
            setUploadingFile(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this item?')) return;
        try {
            await API.delete(`${apiPath}/${id}`);
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <Spinner />;

    // ── Form view ──
    if (editing !== null && !isContacts) {
        return (
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">
                        {editing === 'new' ? 'Add' : 'Edit'} {SECTIONS.find(s => s.key === section)?.label}
                    </h2>
                    <button onClick={() => setEditing(null)} className="text-text-muted hover:text-white transition-colors">
                        <FiX size={20} />
                    </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    {fields.map(field => (
                        <div key={field.name} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                            <label className="block text-sm text-text-muted mb-1">
                                {field.label}{field.required && ' *'}
                            </label>
                            {field.type === 'textarea' ? (
                                <textarea name={field.name} value={form[field.name] || ''} onChange={handleChange} rows="3"
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-all resize-none" />
                            ) : field.type === 'select' ? (
                                <select name={field.name} value={form[field.name] || ''} onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-all">
                                    <option value="">Select...</option>
                                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            ) : (
                                <input type={field.type || 'text'} name={field.name} value={form[field.name] ?? ''} onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-all" />
                            )}
                        </div>
                    ))}
                </div>
                {(section === 'projects' || section === 'certificates' || section === 'events' || section === 'internships') && (
                    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                        <label className="block text-sm text-text-muted mb-2">{section === 'projects' ? 'Project Files' : 'Certificate File'}</label>
                        {section === 'projects' ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary-light hover:bg-primary/20 transition-colors">
                                        <FiImage /> Choose logo
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                                    </label>
                                    {selectedFile ? <span className="text-sm text-text-muted">{selectedFile.name}</span> : <span className="text-sm text-text-muted">PNG, JPG, WEBP, SVG</span>}
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary-light hover:bg-primary/20 transition-colors">
                                        <FiImage /> Choose screenshot
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedScreenshotFile(e.target.files?.[0] || null)} />
                                    </label>
                                    {selectedScreenshotFile ? <span className="text-sm text-text-muted">{selectedScreenshotFile.name}</span> : <span className="text-sm text-text-muted">PNG, JPG, WEBP, SVG</span>}
                                </div>
                                {editing !== 'new' && items.find(item => item._id === editing)?.screenshot && !selectedScreenshotFile && (
                                    <div className="mt-2">
                                        <p className="text-sm text-text-muted mb-2">Current screenshot</p>
                                        <img src={items.find(item => item._id === editing)?.screenshot} alt="Current screenshot" className="h-32 w-full rounded-lg object-cover border border-white/10" />
                                    </div>
                                )}
                            </div>
                        ) : section === 'events' || section === 'internships' ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary-light hover:bg-primary/20 transition-colors">
                                        <FiImage /> Choose certificate
                                        <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                                    </label>
                                    {selectedFile ? <span className="text-sm text-text-muted">{selectedFile.name}</span> : <span className="text-sm text-text-muted">PNG, JPG, WEBP, PDF</span>}
                                </div>
                                {editing !== 'new' && items.find(item => item._id === editing)?.certificate && (
                                    <div className="mt-2">
                                        <p className="text-sm text-text-muted mb-2">Current certificate</p>
                                        {items.find(item => item._id === editing)?.certificate.endsWith('.pdf') ? (
                                            <a href={items.find(item => item._id === editing)?.certificate} target="_blank" rel="noreferrer" className="text-primary-light">Open PDF</a>
                                        ) : (
                                            <img src={items.find(item => item._id === editing)?.certificate} alt="Current certificate" className="h-32 w-full rounded-lg object-cover border border-white/10" />
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary-light hover:bg-primary/20 transition-colors">
                                    <FiImage /> Choose file
                                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                                </label>
                                {selectedFile ? <span className="text-sm text-text-muted">{selectedFile.name}</span> : <span className="text-sm text-text-muted">PNG, JPG, WEBP, PDF</span>}
                            </div>
                        )}
                        {editing !== 'new' && section === 'certificates' && items.find(item => item._id === editing)?.image && !selectedFile && (
                            <div className="mt-4">
                                <p className="text-sm text-text-muted mb-2">Current certificate</p>
                                <img src={items.find(item => item._id === editing)?.image} alt="Current certificate" className="h-32 w-full rounded-lg object-cover border border-white/10" />
                            </div>
                        )}
                        {uploadingFile && <p className="mt-2 text-sm text-amber-400">{uploadMsg}</p>}
                        {!uploadingFile && uploadMsg && <p className="mt-2 text-sm text-green-400">{uploadMsg}</p>}
                    </div>
                )}
                <div className="flex gap-3 mt-6">
                    <button onClick={handleSave} className="btn-primary" disabled={uploadingFile}><FiSave /> {uploadingFile ? 'Saving...' : 'Save'}</button>
                    <button onClick={() => setEditing(null)} className="btn-secondary">Cancel</button>
                </div>
            </div>
        );
    }

    // ── List view ──
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                    {SECTIONS.find(s => s.key === section)?.label} ({items.length})
                </h2>
                {!isContacts && (
                    <button onClick={openAdd} className="btn-primary text-sm !py-2 !px-4">
                        <FiPlus /> Add
                    </button>
                )}
            </div>

            {items.length === 0 ? (
                <div className="text-center py-12 text-text-muted">
                    <p>No items yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map(item => (
                        <div key={item._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group">
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-white truncate">{item[getDisplayField(section)]}</p>
                                {getSubField(section) && item[getSubField(section)] != null && (
                                    <p className="text-xs text-text-muted truncate">{String(item[getSubField(section)])}</p>
                                )}
                                {isContacts && item.message && (
                                    <p className="text-xs text-text-muted mt-1 line-clamp-2">{item.message}</p>
                                )}
                            </div>
                            <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                {!isContacts && (
                                    <button onClick={() => openEdit(item)}
                                        className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary-light hover:bg-primary/20 transition-colors">
                                        <FiEdit2 size={14} />
                                    </button>
                                )}
                                <button onClick={() => handleDelete(item._id)}
                                    className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors">
                                    <FiTrash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Spinner() {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

// ─── Main Dashboard ───
export default function AdminDashboard() {
    const [active, setActive] = useState('profile');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex bg-dark">
            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-dark-light border-r border-white/5 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-5 border-b border-white/5">
                    <a href="/" className="text-lg font-bold gradient-text">Admin Panel</a>
                </div>
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {SECTIONS.map(s => (
                        <button
                            key={s.key}
                            onClick={() => { setActive(s.key); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${active === s.key
                                ? 'bg-primary/15 text-primary-light border border-primary/20'
                                : 'text-text-muted hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {s.icon} {s.label}
                        </button>
                    ))}
                </nav>
                <div className="p-3 border-t border-white/5">
                    <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
                        <FiLogOut /> Logout
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                <header className="sticky top-0 z-20 glass-strong px-4 sm:px-6 py-4 flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white">
                        <FiMenu size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-white">
                        {SECTIONS.find(s => s.key === active)?.label}
                    </h1>
                </header>
                <div className="p-4 sm:p-6 lg:p-8">
                    {active === 'profile' ? <ProfilePanel /> : <CrudPanel section={active} />}
                </div>
            </main>
        </div>
    );
}
