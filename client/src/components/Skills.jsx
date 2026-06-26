import { useEffect, useState, useRef } from 'react';
import API from '../api/axios';

const categoryIcons = {
    'Programming Languages': '💻',
    'Frontend': '🎨',
    'Backend': '⚙️',
    'Database': '🗄️',
    'Tools & Platforms': '🛠️',
    'AI Technologies': '🤖'
};

const categoryColors = {
    'Programming Languages': 'from-violet-500/20 to-purple-500/20 border-violet-500/20',
    'Frontend': 'from-cyan-500/20 to-blue-500/20 border-cyan-500/20',
    'Backend': 'from-green-500/20 to-emerald-500/20 border-green-500/20',
    'Database': 'from-amber-500/20 to-yellow-500/20 border-amber-500/20',
    'Tools & Platforms': 'from-pink-500/20 to-rose-500/20 border-pink-500/20',
    'AI Technologies': 'from-indigo-500/20 to-blue-500/20 border-indigo-500/20',
};

const categoryGlowColors = {
    'Programming Languages': '#a78bfa',
    Frontend: '#38bdf8',
    Backend: '#34d399',
    Database: '#fbbf24',
    'Tools & Platforms': '#fb7185',
    'AI Technologies': '#818cf8',
};

export default function Skills() {
    const [skills, setSkills] = useState([]);
    const [showCards, setShowCards] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        API.get('/skills')
            .then((res) => setSkills(res.data))
            .catch(console.error);
    }, []);

    // Animate cards when section is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowCards(true);
                } else {
                    // Reset animation when leaving section
                    setShowCards(false);
                }
            },
            {
                threshold: 0.25,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Group skills by category
    const grouped = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="py-20 relative"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h2 className="section-title">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="section-subtitle">
                        Technologies and tools I work with
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {Object.entries(grouped).map(([category, items], index) => (

                        <div
                            key={category}
                            className={`
                                card
                                bg-gradient-to-br
                                ${categoryColors[category] ||
                                    'from-primary/10 to-secondary/10 border-primary/20'}
                                relative overflow-hidden transform transition-all duration-700 ease-out hover:brightness-110
                                ${
                                    showCards
                                        ? 'opacity-100 translate-y-0 scale-100 skill-card-glow'
                                        : 'opacity-0 translate-y-10 scale-95'
                                }
                            `}
                            style={{
                                transitionDelay: `${index * 200}ms`,
                                '--glow-color': categoryGlowColors[category] || '#a78bfa',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-2xl">
                                    {categoryIcons[category] || '📦'}
                                </span>

                                <h3 className="text-lg font-bold text-white">
                                    {category}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-2">

                                {items.map((skill) => (
                                    <div
                                        key={skill._id}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-text hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                                    >
                                        {skill.icon && (
                                            <span className="text-base">
                                                {skill.icon}
                                            </span>
                                        )}

                                        {skill.name}
                                    </div>
                                ))}

                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </section>
    );
}