import React from 'react';
import OuterLink from './OuterLink';
import { Link } from 'react-router-dom';

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
    return (
        <div className='text-sm sm:text-base absolute w-full bottom-0 text-center bg-gray-700 text-white items-center border-t-[1px] py-12 px-4'>
            <p>
                <span>本站所有内容遵循以下协议：</span>
                <OuterLink href='http://creativecommons.org/licenses/by-nc-sa/4.0/'>知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</OuterLink>
            </p>
            <p className='mt-2'>
                <span>
                    版权所有 © 2023-现在
                </span>
                <Link to="/" className='ml-2'>
                    {__APP_NAME__}
                </Link>
            </p>
        </div>
    );
}

export default Footer;
