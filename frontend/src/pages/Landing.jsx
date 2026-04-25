import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, User, Sprout, Droplets, BookOpen } from 'lucide-react';

const Landing = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans overflow-hidden flex flex-col">
            {/* Custom Header for Landing Page */}
            <header className="px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#1A3626]">
                    <Leaf size={28} className="text-[#367E42]" />
                    <span className="font-serif text-2xl font-semibold tracking-tight">Florista</span>
                </div>
                
                <nav className="hidden md:flex items-center gap-8 text-[#4A5D4E] font-medium">
                    <a href="#" className="hover:text-[#1A3626] transition">About Us</a>
                    <a href="#" className="hover:text-[#1A3626] transition">Features</a>
                    <a href="#" className="hover:text-[#1A3626] transition">Plant Guide</a>
                    <a href="#" className="hover:text-[#1A3626] transition">Contact</a>
                </nav>

                <div>
                    <Link to="/login" className="bg-[#1B4332] hover:bg-[#122e22] text-white px-8 py-2.5 rounded-full font-medium transition shadow-md">
                        Login
                    </Link>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 grid lg:grid-cols-[1fr_1fr] relative">
                
                {/* Left Side: Content */}
                <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-12 z-10 relative">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#E6F4EA] text-[#2D6A4F] px-4 py-2 rounded-full w-fit mb-8 shadow-sm">
                        <Leaf size={16} />
                        <span className="text-sm font-semibold tracking-wide">Your Green Companion</span>
                    </div>

                    {/* Hero Heading */}
                    <h1 className="text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] leading-[1.1] font-bold text-[#1A3626] mb-6 font-serif">
                        Discover. Learn.<br />Grow. <span className="text-[#367E42] italic font-serif opacity-90">Naturally.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-[#4A5D4E] text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
                        Explore a curated collection of indoor, outdoor and medicinal plants. Get care tips, set watering reminders, and grow a healthier green space.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#F4F1E1] p-8 rounded-3xl shadow-2xl max-w-sm w-full border border-white/50 z-20">
                        <Leaf size={24} className="text-[#367E42] mb-4" />
                        <p className="text-[#1A3626] font-medium text-lg leading-relaxed mb-4">
                            "Plants don't just decorate our homes, they purify our minds and soul."
                        </p>
                        <p className="text-[#6B7C70] text-sm italic font-medium">
                            - Unknown
                        </p>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="bg-[#1A3626] text-[#E6F4EA] py-8 text-center mt-auto z-10 relative">
                <div className="container mx-auto px-4">
                    <p className="opacity-80 text-sm font-medium">&copy; {new Date().getFullYear()} Florista. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
