import { useEffect, useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import API from '../api/axios';

const statusColors = {
    'completed': 'bg-green-500/15 text-green-400 border-green-500/25',
    'in-progress': 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    'planned': 'bg-blue-500/15 text-blue-400 border-blue-500/25',
};

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        API.get('/projects').then(r => setProjects(r.data)).catch(console.error);
    }, []);

    return (
        <section id="projects" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="section-title">My <span className="gradient-text">Projects</span></h2>
                    <p className="section-subtitle">Showcasing my recent work</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => {
                        const projectImage = project.logo || project.images?.[0];

                        return (
                            <div key={project._id} className="card group" style={{ animationDelay: `${idx * 0.15}s` }}>
                                {projectImage ? (
                                    <div className="relative rounded-xl overflow-hidden mb-5 h-48 bg-white/5">
                                        <img src={projectImage} alt={project.name} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                                        {project.screenshot && (
                                            <button
                                                type="button"
                                                onClick={() => setSelectedProject(project)}
                                                className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                            >
                                                View
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="rounded-xl overflow-hidden mb-5 h-48 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 flex items-center justify-center">
                                        <span className="text-5xl opacity-40">🚀</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[project.status] || statusColors.completed}`}>
                                        {project.status?.charAt(0).toUpperCase() + project.status?.slice(1)}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors">
                                    {project.name}
                                </h3>

                                <p className="text-text-muted text-sm mb-4 leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.technologies?.map((tech, i) => (
                                        <span key={i} className="tag">{tech}</span>
                                    ))}
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-white/5">
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors">
                                            <FiGithub /> GitHub
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-2 text-sm text-text-muted hover:text-primary-light transition-colors">
                                            <FiExternalLink /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {selectedProject && (
                    <div
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-6"
                        onClick={() => setSelectedProject(null)}
                    >
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${selectedProject.name} screenshot`}
                            className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedProject(null)}
                                className="absolute right-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-sm text-white hover:bg-black"
                            >
                                Close
                            </button>
                            <img
                                src={selectedProject.screenshot || selectedProject.logo || selectedProject.images?.[0] || ''}
                                alt={`${selectedProject.name} screenshot`}
                                className="max-h-[80vh] w-full rounded-xl object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
