import React from 'react';
import { Link } from 'react-router-dom';

export interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
    return (
        <div className='w-full h-[70vh] flex items-center justify-center flex-col'>
            <p className='font-bold text-4xl'>404 Not Found</p>
            <p className='mt-4 text-lg'>这里啥也木有...</p>
            <p className='mt-8'>
                <Link to="/" className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition-colors'>
                    返回首页
                </Link>
            </p>
        </div>
    );
}

export default NotFound;
