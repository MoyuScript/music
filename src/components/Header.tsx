import React from 'react';
import { Link } from 'react-router-dom';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header className="fixed w-full p-4 bg-white flex border-b-[1px] z-10 justify-center sm:justify-start">
            <div>
                <Link to="/" className="text-gray-600 font-bold text-xl">
                    {__APP_NAME__}
                </Link>
            </div>
        </header>
    );
};

export default Header;
