import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useUpdateEffect } from 'ahooks';

export interface RootProps {}

const Root: React.FC<RootProps> = () => {
    const location = useLocation();

    useUpdateEffect(() => {
        gtag(
            'event',
            'page_view',
            {
                page_location: window.location.href,
            }
        )
    }, [location.pathname])

    return (
        <div className='relative min-h-full text-primary'>
            <Header />
            <main className='pt-16 pb-64 max-w-[80rem] mx-auto px-2 sm:px-8'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Root;
