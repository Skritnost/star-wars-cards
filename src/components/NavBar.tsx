import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-black/70 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    Star Wars App
                </Link>
                <div className="">
                    <Link to="/" className="text-gray-300 hover:text-white">
                        Home
                    </Link>
                    {/* Additional nav items (e.g., About, Characters) can be added here */}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
