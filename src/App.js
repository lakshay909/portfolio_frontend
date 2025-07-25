import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Download, ExternalLink, Menu, X } from 'lucide-react';
import {
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaAws
} from 'react-icons/fa';
import {
  SiJavascript, SiTailwindcss, SiExpress, SiDjango, SiFlask, SiFlutter, SiFirebase, SiMongodb, SiMysql, SiPostman, SiAndroidstudio, SiBlender
} from 'react-icons/si';
import { VscCode } from "react-icons/vsc"; // Changed from VscVscode to VscCode
import { TbBrandCpp, TbCode } from "react-icons/tb";

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // --- STATE MANAGEMENT FOR PROJECTS & FILTERS ---
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filterCategories, setFilterCategories] = useState(['All']);

  // --- FETCH ALL PROJECTS FROM DATABASE ---
  useEffect(() => {
    // UPDATED for Vercel deployment
    axios.get('https://portfolio-backend-d4dd.onrender.com/api/projects')
      .then(response => {
        setAllProjects(response.data);
        setFilteredProjects(response.data);
      })
      .catch(error => {
        console.error("Error fetching projects from the database!", error);
      });
  }, []);

  // --- DYNAMICALLY CREATE FILTER CATEGORIES ---
  useEffect(() => {
    if (allProjects.length > 0) {
      const categories = allProjects.map(p => p.category);
      const uniqueCategories = new Set(categories);
      setFilterCategories(['All', ...uniqueCategories]);
    }
  }, [allProjects]);

  // --- FILTER PROJECTS WHEN THE CATEGORY CHANGES ---
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(allProjects);
    } else {
      const filtered = allProjects.filter(project => project.category === activeFilter);
      setFilteredProjects(filtered);
    }
  }, [activeFilter, allProjects]);


  const services = [
    {
      icon: "🎬",
      title: "Video Editing",
      description: "Professional video editing services with motion graphics, color correction, and post-production expertise."
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      description: "Cross-platform mobile applications using React Native, Flutter, and native iOS/Android development."
    },
    {
      icon: "💻",
      title: "Desktop App Development",
      description: "Desktop applications using Electron, .NET, and Java with modern UI/UX design principles."
    },
    {
      icon: "⚡",
      title: "Programming Languages",
      description: "Expertise in JavaScript, Python, Java, C++, and modern frameworks for full-stack development."
    }
  ];

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "C", icon: <TbCode size="100%" /> },
        { name: "C++", icon: <TbBrandCpp size="100%" /> },
        { name: "Java", icon: <FaJava size="100%" /> },
        { name: "Python", icon: <FaPython size="100%" /> },
        { name: "Dart", icon: <TbCode size="100%" /> },
        { name: "JavaScript", icon: <SiJavascript size="100%" /> },
      ]
    },
    {
      title: "Web Development",
      skills: [
        { name: "HTML5", icon: <FaHtml5 size="100%" /> },
        { name: "CSS3", icon: <FaCss3Alt size="100%" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss size="100%" /> },
        { name: "React.js", icon: <FaReact size="100%" /> },
        { name: "Node.js", icon: <FaNodeJs size="100%" /> },
        { name: "Express.js", icon: <SiExpress size="100%" /> },
        { name: "Django", icon: <SiDjango size="100%" /> },
        { name: "Flask", icon: <SiFlask size="100%" /> },
      ]
    },
    {
      title: "Mobile App Development",
      skills: [
        { name: "Flutter", icon: <SiFlutter size="100%" /> },
        { name: "Firebase", icon: <SiFirebase size="100%" /> },
        { name: "Calling SDKs", icon: <TbCode size="100%" /> },
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MongoDB", icon: <SiMongodb size="100%" /> },
        { name: "MySQL", icon: <SiMysql size="100%" /> },
      ]
    },
    {
      title: "DevOps & Cloud",
      skills: [
        { name: "Git", icon: <FaGitAlt size="100%" /> },
        { name: "GitHub", icon: <FaGithub size="100%" /> },
        { name: "AWS", icon: <FaAws size="100%" /> },
        { name: "REST APIs", icon: <TbCode size="100%" /> },
        { name: "Postman", icon: <SiPostman size="100%" /> },
      ]
    },
    {
      title: "Tools & Other",
      skills: [
        { name: "VS Code", icon: <VscCode size="100%" /> }, // Changed from VscVscode to VscCode
        { name: "Android Studio", icon: <SiAndroidstudio size="100%" /> },
        { name: "Blender", icon: <SiBlender size="100%" /> },
        { name: "Web Scraping", icon: <FaPython size="100%" /> },
        { name: "Payment Gateways", icon: <TbCode size="100%" /> },
      ]
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // UPDATED for Vercel deployment
    axios.post('/api/contact', formData)
        .then(response => {
            alert('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        })
        .catch(error => {
            console.error('There was an error sending the message!', error);
            alert('Failed to send message. Please try again later.');
        });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'services', 'experience', 'contact'];
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-purple-400">FS</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['home', 'about', 'portfolio', 'services', 'experience', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeSection === item
                        ? 'text-purple-400 border-b-2 border-purple-400'
                        : 'text-gray-300 hover:text-purple-400'
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-purple-400 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'portfolio', 'services', 'experience', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-purple-400 w-full text-left"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              I'm a <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                FULL STACK
              </span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                SOFTWARE
              </span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                DEVELOPER
              </span>
            </h1>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Previous Projects
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div className="flex justify-center items-center">
              <div className="relative group">
                <div className="w-64 h-[19rem] sm:w-72 sm:h-[21rem] lg:w-64 lg:h-[19rem] xl:w-80 xl:h-[23.5rem] rounded-3xl overflow-hidden border-4 border-purple-500/30 shadow-2xl transition-all duration-300 group-hover:border-purple-500/50">
                  <img
                    src="/my-photo2.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold mb-6 text-purple-400">ABOUT ME</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                A passionate Full Stack and Mobile App Developer with hands-on experience in the MERN stack, Flutter, and backend frameworks like Django and Node.js. Currently pursuing my B.E. at Chandigarh University, I specialize in building responsive web apps and cross-platform mobile solutions. I enjoy turning complex problems into clean, efficient code and am always exploring new technologies to grow as a developer.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  HIRE ME
                </button>
                <a 
                  href="/Lakshay_Resume.pdf" // <-- Use the exact name of your PDF file
                  download // This important attribute tells the browser to download the file
                  className="border-2 border-purple-500 hover:bg-purple-500 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                  <Download size={20} />
                  RESUME
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-400">PORTFOLIO</h2>
          
          <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
            {filterCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                    : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={project._id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative mb-6">
                  <img
                    src={`https://placehold.co/400x300/1e1b4b/a855f7?text=${project.title.replace(/\s/g,'+')}`}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                    PROJECT {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
        href={project.githubLink}
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
      >
        <ExternalLink size={16} />
        View Project
      </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              View all
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-400">SERVICES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105 text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-purple-400">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Technologies Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-purple-400">SKILLS & TECHNOLOGIES</h2>
          <div className="space-y-12">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-2xl font-semibold text-purple-300 mb-6 text-center">{category.title}</h3>
                <div className="flex flex-wrap justify-center gap-8">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105 text-center flex flex-col items-center justify-center w-32 h-32">
                      <div className="text-5xl mb-2 text-purple-300">{skill.icon}</div>
                      <h4 className="text-sm font-bold text-purple-400">{skill.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-400">CONTACT</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Drop Me a Message</h3>
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Mail className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300">Email</p>
                    <p className="text-white">lakshayn02@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Phone className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300">Phone</p>
                    <p className="text-white">+91 84459-87100</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <MapPin className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-300">Location</p>
                    <p className="text-white">Mohali, INDIA</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <a
  href="https://github.com/lakshay909"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-purple-500/20 hover:bg-purple-500/30 p-3 rounded-full transition-colors"
>
  <Github className="text-purple-400" size={20} />
</a>

<a
  href="https://www.linkedin.com/in/lakshay-narula-n8445/"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-purple-500/20 hover:bg-purple-500/30 p-3 rounded-full transition-colors"
>
  <Linkedin className="text-purple-400" size={20} />
</a>

<a
  href="https://twitter.com/yourusername"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-purple-500/20 hover:bg-purple-500/30 p-3 rounded-full transition-colors"
>
  <Twitter className="text-purple-400" size={20} />
</a>

              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full bg-slate-800/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full bg-slate-800/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    className="w-full bg-slate-800/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={5}
                    className="w-full bg-slate-800/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-purple-500/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <span className="text-2xl font-bold text-purple-400">FS</span>
          </div>
          <p className="text-gray-400">© 2025 Full Stack Developer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
