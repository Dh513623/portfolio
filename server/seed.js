const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

// Import models
const User = require('./models/User');
const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Internship = require('./models/Internship');
const Event = require('./models/Event');
const Timeline = require('./models/Timeline');
const Certificate = require('./models/Certificate');
const CodingProfile = require('./models/CodingProfile');
const Education = require('./models/Education');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Internship.deleteMany({}),
      Event.deleteMany({}),
      Timeline.deleteMany({}),
      Certificate.deleteMany({}),
      CodingProfile.deleteMany({}),
      Education.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // 1. Create admin user
    const admin = new User({
      email: 'priyadharshinim23cseb21@gmail.com',
      password: 'admin123'
    });
    await admin.save();
    console.log('Admin user created');

    // 2. Create profile
    await Profile.create({
      name: 'Priyadharshini M',
      designation: 'Entry-Level MERN Stack Developer',
      location: 'Peraiyur, Madurai, Tamil Nadu',
      summary: 'Pre-final year Computer Science student with backend skills in Node.js, Express.js, and MongoDB. Experienced in building full-stack web applications with a focus on performance, clean architecture, and user experience. Seeking an entry-level software development role to apply my skills and grow.',
      objective: 'Aspiring MERN Stack Developer passionate about building dynamic, scalable, and user-centric web applications. Committed to continuous learning and delivering clean, efficient code solutions.',
      phone: '6374451414',
      email: 'priyadharshinim23cseb21@gmail.com',
      whatsapp: '6374451414',
      linkedin: 'https://linkedin.com/in/priya-dharshini-m',
      github: 'https://github.com/Dh513623',
      address: 'Peraiyur, Madurai, Tamil Nadu',
      profileImage: '',
      resumeUrl: ''
    });
    console.log('Profile created');

    // 3. Create Skills
    const skills = [
      // Programming Languages
      { category: 'Programming Languages', name: 'Java', icon: '☕' },
      { category: 'Programming Languages', name: 'JavaScript', icon: '🟨' },
      { category: 'Programming Languages', name: 'SQL', icon: '🗃️' },
      { category: 'Programming Languages', name: 'C', icon: '⚙️' },
      // Frontend
      { category: 'Frontend', name: 'React', icon: '⚛️' },
      { category: 'Frontend', name: 'HTML', icon: '🌐' },
      { category: 'Frontend', name: 'CSS', icon: '🎨' },
      { category: 'Frontend', name: 'JavaScript', icon: '📜' },
      // Backend
      { category: 'Backend', name: 'Node.js', icon: '🟩' },
      { category: 'Backend', name: 'Express.js', icon: '🚀' },
      { category: 'Backend', name: 'REST APIs', icon: '🔗' },
      { category: 'Backend', name: 'JWT', icon: '🔐' },
      { category: 'Backend', name: 'bcrypt', icon: '🛡️' },
      // Database
      { category: 'Database', name: 'MongoDB', icon: '🍃' },
      { category: 'Database', name: 'MySQL', icon: '🐬' },
      // Tools
      { category: 'Tools', name: 'Git', icon: '📦' },
      { category: 'Tools', name: 'GitHub', icon: '🐙' },
      { category: 'Tools', name: 'Postman', icon: '📮' },
      { category: 'Tools', name: 'VS Code', icon: '💻' },
      { category: 'Tools', name: 'Render', icon: '☁️' },
      { category: 'Tools', name: 'Excel', icon: '📊' }
    ];
    await Skill.insertMany(skills);
    console.log('Skills created');

    // 4. Create Projects
    await Project.insertMany([
      {
        name: 'VCET Placement Portal',
        description: 'Developed secure REST APIs with JWT authentication and data validation. Built student shortlisting and profile matching based on company criteria using MongoDB. Implemented tracking of selection status and multi-round recruitment progress.',
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
        githubLink: 'https://github.com/Dh513623',
        liveLink: '',
        images: [],
        status: 'completed',
        order: 0
      },
      {
        name: 'INEX Tracker – Income and Expense Tracker',
        description: 'Developed a full-stack income and expense tracking application using MERN stack. Implemented CRUD operations for managing income and expense data. Designed responsive UI and integrated frontend with backend APIs.',
        technologies: ['React', 'Node.js', 'Express.js', 'MongoDB'],
        githubLink: 'https://github.com/Dh513623',
        liveLink: '',
        images: [],
        status: 'completed',
        order: 1
      }
    ]);
    console.log('Projects created');

    // 5. Create Internships
    await Internship.insertMany([
      {
        company: 'In-House Project (VCET)',
        role: 'Full Stack Developer Intern',
        duration: 'May 2025 – Jun 2025',
        description: 'Developed and secured RESTful APIs using Node.js, MongoDB, and JWT authentication. Built backend logic for student shortlisting and profile matching based on company criteria. Implemented features to track selection status and multi-round recruitment progress in a team of 7 developers.',
        skills: ['Node.js', 'MongoDB', 'JWT', 'Express.js'],
        order: 0
      },
      {
        company: 'CodeBind Technologies',
        role: 'Web Development Intern',
        duration: 'Dec 2024',
        description: 'Developed responsive web applications using HTML, CSS, JavaScript, PHP, and MySQL. Implemented backend data handling, form processing, and database integration for real-time projects. Collaborated in a 10-member team, improving adaptability, communication, and full-stack development skills.',
        skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        order: 1
      }
    ]);
    console.log('Internships created');

    // 6. Create Timeline
    await Timeline.insertMany([
      { title: 'Joined Engineering', date: '2023', description: 'Started B.Tech in Computer Science at VCET', order: 0 },
      { title: 'Started Learning Java', date: '2023', description: 'Began mastering Java and Data Structures & Algorithms', order: 1 },
      { title: 'Web Development Intern', date: 'Dec 2024', description: 'Completed internship at CodeBind Technologies', order: 2 },
      { title: 'Solved First LeetCode Problem', date: '2024', description: 'Started competitive programming journey on LeetCode', order: 3 },
      { title: 'Reached 300+ LeetCode Problems', date: '2025', description: 'Consistently solved coding challenges to sharpen problem-solving skills', order: 4 },
      { title: 'Full Stack Intern', date: 'May 2025', description: 'Worked on VCET Placement Portal as Full Stack Developer', order: 5 },
      { title: 'Built MERN Projects', date: '2025', description: 'Developed INEX Tracker and Portfolio Website using MERN Stack', order: 6 }
    ]);
    console.log('Timeline created');

    // 7. Create Certificates
    await Certificate.insertMany([
      { name: 'Cloud Computing', organization: 'NPTEL', issueDate: '2024', image: '', credentialLink: '', order: 0 },
      { name: 'Full Stack Development', organization: 'Coursera', issueDate: '2024', image: '', credentialLink: '', order: 1 },
      { name: 'Fundamentals of Java', organization: 'Coursera', issueDate: '2024', image: '', credentialLink: '', order: 2 }
    ]);
    console.log('Certificates created');

    // 8. Create Coding Profiles
    await CodingProfile.insertMany([
      {
        platform: 'LeetCode',
        profileLink: 'https://leetcode.com/',
        problemsSolved: 300,
        badges: ['Problem Solver'],
        ranking: '',
        certificates: []
      },
      {
        platform: 'HackerRank',
        profileLink: 'https://hackerrank.com/',
        problemsSolved: 0,
        badges: [],
        ranking: '',
        certificates: []
      }
    ]);
    console.log('Coding profiles created');

    // 9. Create Education
    await Education.insertMany([
      {
        qualification: 'B.Tech – Computer Science and Engineering',
        institution: 'Velammal College of Engineering and Technology',
        score: 'CGPA: 8.47 (5th Semester)',
        year: '2023 – 2027',
        order: 0
      },
      {
        qualification: 'HSC (12th Grade)',
        institution: 'Government Girls Higher Secondary School',
        score: 'Percentage: 89%',
        year: '2021 – 2023',
        order: 1
      }
    ]);
    console.log('Education created');

    console.log('\n✅ Database seeded successfully!');
    console.log('Admin login: priyadharshinim23cseb21@gmail.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
