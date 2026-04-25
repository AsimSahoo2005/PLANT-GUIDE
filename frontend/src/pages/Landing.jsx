import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, User, Sprout, Droplets, BookOpen } from 'lucide-react';
import asim from "../assets/team/asim.jpg";
import satyam from "../assets/team/satyam.jpg";
import subham from "../assets/team/subham.jpg";
const Facebook = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Twitter = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const Instagram = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Youtube = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.1 8.4 2 10.5 2 12s.1 3.6.5 4.9c.4 1.4 1.5 2.5 2.9 2.9 1.4.4 6.6.6 6.6.6s5.2-.2 6.6-.6c1.4-.4 2.5-1.5 2.9-2.9.4-1.3.5-3.4.5-4.9s-.1-3.6-.5-4.9C21.1 5.7 20 4.6 18.6 4.2 17.2 3.8 12 3.6 12 3.6s-5.2.2-6.6.6C4 4.6 2.9 5.7 2.5 7.1z"/><path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z"/></svg>
);
const Landing = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.fade-up');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans overflow-x-hidden flex flex-col">
            {/* Custom Header for Landing Page */}
            <header className="px-8 py-6 flex items-center justify-between sticky top-0 bg-[#FDFBF7]/90 backdrop-blur-sm z-50">
                <div className="flex items-center gap-2 text-[#1A3626]">
                    <Leaf size={28} className="text-[#367E42]" />
                    <span className="font-serif text-2xl font-semibold tracking-tight">Florista</span>
                </div>
                
                <nav className="hidden md:flex items-center gap-8 text-[#4A5D4E] font-medium">
                    <a href="#about" className="hover:text-[#1A3626] transition">About Us</a>
                    <a href="#contact" className="hover:text-[#1A3626] transition">Contact</a>
                </nav>

                <div>
                    <Link to="/login" className="bg-[#1B4332] hover:bg-[#122e22] text-white px-8 py-2.5 rounded-full font-medium transition shadow-md">
                        Login
                    </Link>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative">
                
                {/* Hero Section */}
                <section className="grid lg:grid-cols-[1fr_1fr] relative min-h-[calc(100vh-88px)]">
                    {/* Left Side: Content */}
                    <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-12 z-10 relative">
                        
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#E6F4EA] text-[#2D6A4F] px-4 py-2 rounded-full w-fit mb-8 shadow-sm fade-up">
                            <Leaf size={16} />
                            <span className="text-sm font-semibold tracking-wide">Your Green Companion</span>
                        </div>

                        {/* Hero Heading */}
                        <h1 className="text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] leading-[1.1] font-bold text-[#1A3626] mb-6 font-serif fade-up delay-1">
                            Discover. Learn.<br />Grow. <span className="text-[#367E42] italic font-serif opacity-90">Naturally.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#4A5D4E] text-lg lg:text-xl leading-relaxed max-w-xl mb-10 fade-up delay-2">
                            Explore a curated collection of indoor, outdoor and medicinal plants. Get care tips, set watering reminders, and grow a healthier green space.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 fade-up delay-2">
                            <Link to="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#122e22] text-white px-8 py-4 rounded-full font-semibold transition shadow-lg text-lg">
                                <Leaf size={20} />
                                Login to Your Garden
                            </Link>
                            <Link to="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-green-50 text-[#1B4332] border-2 border-[#1B4332] px-8 py-4 rounded-full font-semibold transition text-lg">
                                <User size={20} />
                                Create Account
                            </Link>
                        </div>

                        {/* Features Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 fade-up delay-2">
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                <div className="bg-[#F0F7F2] w-14 h-14 rounded-full flex items-center justify-center text-[#367E42] mb-4">
                                    <Sprout size={26} />
                                </div>
                                <h3 className="text-[#1A3626] font-bold text-lg mb-2">Curated Plants</h3>
                                <p className="text-[#6B7C70] text-sm leading-relaxed">Handpicked plants for every space</p>
                            </div>
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                <div className="bg-[#F0F7F2] w-14 h-14 rounded-full flex items-center justify-center text-[#367E42] mb-4">
                                    <Droplets size={26} />
                                </div>
                                <h3 className="text-[#1A3626] font-bold text-lg mb-2">Care Reminders</h3>
                                <p className="text-[#6B7C70] text-sm leading-relaxed">Smart reminders to keep your plants happy</p>
                            </div>
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                <div className="bg-[#F0F7F2] w-14 h-14 rounded-full flex items-center justify-center text-[#367E42] mb-4">
                                    <BookOpen size={26} />
                                </div>
                                <h3 className="text-[#1A3626] font-bold text-lg mb-2">Expert Guides</h3>
                                <p className="text-[#6B7C70] text-sm leading-relaxed">Detailed guides to help you grow better</p>
                            </div>
                        </div>

                    </div>

                    {/* Right Side: Image Area */}
                    <div className="hidden lg:block relative h-full min-h-[800px] bg-cover bg-center rounded-tl-[6rem]" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
                        {/* Floating Quote Card */}
                        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#F4F1E1] p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-white/50 z-20 fade-up delay-2">
                            <Leaf size={24} className="text-[#367E42] mb-4" />
                            <p className="text-[#1A3626] font-medium text-lg leading-relaxed mb-4">
                                "Plants don't just decorate our homes, they purify our minds and soul."
                            </p>
                        </div>
                    </div>
                </section>

                {/* About Us Section */}
                <section id="about" className="py-24 px-8 lg:px-16 xl:px-24 bg-white relative">
                    <div className="max-w-4xl mx-auto text-center fade-up">
                        <div className="inline-flex items-center justify-center mb-4 text-[#367E42]">
                            <Sprout size={32} />
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-[#1A3626] font-serif mb-10">About Us</h2>
                        <div className="space-y-6 text-left max-w-3xl mx-auto">
                            <p className="text-[#4A5D4E] text-lg lg:text-xl leading-relaxed">
                                <strong className="text-[#1A3626] font-serif">Our Aim:</strong> To create a community where plant enthusiasts of all levels can thrive and learn together, turning every home into a greener space.
                            </p>
                            <p className="text-[#4A5D4E] text-lg lg:text-xl leading-relaxed">
                                <strong className="text-[#1A3626] font-serif">Our Motive:</strong> We believe that bringing nature indoors not only beautifies our surroundings but significantly improves our mental and physical well-being.
                            </p>
                            <p className="text-[#4A5D4E] text-lg lg:text-xl leading-relaxed">
                                <strong className="text-[#1A3626] font-serif">Our Impact:</strong> Helping thousands of users discover the right plants for their environment, reducing plant mortality, and promoting sustainable, joyful gardening.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Meet Our Team Section */}
                <section className="py-24 px-8 lg:px-16 xl:px-24 bg-[#F0F7F2]">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16 fade-up">
                            <h2 className="text-4xl lg:text-5xl font-bold text-[#1A3626] font-serif mb-4">Meet Our Team</h2>
                            <p className="text-[#4A5D4E] text-lg">The passionate people behind Florista.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Card 1 */}
                            <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 fade-up delay-0">
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[#E6F4EA]">
                                    <img src={asim} alt="Team Member" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A3626] mb-2">Asim Anshuman Sahoo</h3>
                                <p className="text-[#367E42] font-medium mb-4">Web Developer</p>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 fade-up delay-1">
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[#E6F4EA]">
                                    <img src={satyam} alt="Team Member" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A3626] mb-2">Satyam Das</h3>
                                <p className="text-[#367E42] font-medium mb-4">Web Developer</p>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 fade-up delay-2">
                                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[#E6F4EA]">
                                    <img src={subham} alt="Team Member" className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1A3626] mb-2">Subham Satapathy</h3>
                                <p className="text-[#367E42] font-medium mb-4">Web Developer</p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer id="contact" className="bg-[#1A3626] text-[#E6F4EA] pt-16 pb-8 px-8 lg:px-16 relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start mb-12 gap-8 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start fade-up">
                        <div className="flex items-center gap-2 text-white mb-4">
                            <Leaf size={28} className="text-[#367E42]" />
                            <span className="font-serif text-2xl font-semibold tracking-tight">Florista</span>
                        </div>
                        <p className="text-[#6B7C70] text-sm max-w-xs">
                            Your green companion for discovering, learning, and growing naturally.
                        </p>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-end fade-up delay-1">
                        <h4 className="text-lg font-semibold mb-3 text-white">Contact Us</h4>
                        <a href="mailto:support@florista.com" className="text-[#E6F4EA] hover:text-[#367E42] transition mb-6 block">support@florista.com</a>
                        
                        <div className="flex gap-5">
                            <a href="#" className="hover:text-[#367E42] transition transform hover:scale-110"><Facebook size={24} /></a>
                            <a href="#" className="hover:text-[#367E42] transition transform hover:scale-110"><Twitter size={24} /></a>
                            <a href="#" className="hover:text-[#367E42] transition transform hover:scale-110"><Instagram size={24} /></a>
                            <a href="#" className="hover:text-[#367E42] transition transform hover:scale-110"><Youtube size={24} /></a>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-white/10 pt-8 text-center fade-up delay-2">
                    <p className="opacity-80 text-sm font-medium">&copy; {new Date().getFullYear()} Florista. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
