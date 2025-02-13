import React from 'react';

const NavBar: React.FC = () => {
    return (
        <nav className="w-full bg-primary/20 text-primary-foreground p-4">
            <div className="container mx-auto">
                <a href="/" className="block text-2xl font-bold hover:underline">
                    Star Wars App
                </a>
            </div>
        </nav>
    );
};

export default NavBar;
