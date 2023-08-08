import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export interface RootProps {}

const Root: React.FC<RootProps> = () => {
    return (
        <div className='relative min-h-full'>
            <Header />
            <main className='pt-16 pb-64 max-w-[80rem] mx-auto px-2 sm:px-8'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Root;
