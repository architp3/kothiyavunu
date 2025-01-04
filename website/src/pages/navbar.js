import React, { useState } from "react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

function Navbar() {
    const [isOpen, setOpen] = useState(false);

    return (
        <nav className="bg-white border-b shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 text-2xl font-bold">
                        <a href="/">Kothiyavunu</a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((nav) => (
                            <a
                                key={nav.name}
                                href={nav.href}
                                className="text-gray-800 hover:text-blue-600 font-medium"
                            >
                                {nav.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setOpen(!isOpen)}
                            className="text-gray-800 hover:text-blue-600 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2">
                    {navItems.map((nav) => (
                        <a
                            key={nav.name}
                            href={nav.href}
                            className="block text-gray-800 hover:text-blue-600 font-medium"
                        >
                            {nav.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
