import React from 'react';
import { Link } from 'react-router-dom';
import OuterLink from './OuterLink';
import clsx from 'clsx';
import useThemeStore from '../stores/useThemeStore';

interface NavListItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    href: string;
}

const NavListItem: React.FC<NavListItemProps> = ({ children, href }) => {
    return (
        <li className="py-2 px-4 pb-0 group/navItem sm:px-0 sm:py-0">
            <div className="pb-2 border-b-[1px] group-last/navItem:border-b-0 sm:border-b-0 dark:border-b-gray-700 sm:pb-0">
                <OuterLink className="text-gray-500 dark:text-gray-100" href={href}>
                    {children}
                </OuterLink>
            </div>
        </li>
    );
};

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const themeStore = useThemeStore();
    return (
        <header className="fixed w-full p-4 bg-white flex border-b-[1px] z-10 justify-center sm:justify-between dark:bg-gray-700 dark:border-b-gray-600">
            <div>
                <Link to="/" className="font-bold text-xl">
                    {__APP_NAME__}
                </Link>
            </div>
            <div className='absolute top-1/2 -translate-y-1/2 sm:top-0 sm:translate-y-0 sm:relative right-4 flex items-center'>
                <button
                    onClick={() => {
                        themeStore.toggleTheme();
                    }}
                    className='mr-4 bg-gray-200 dark:bg-gray-600 rounded-full w-6 h-6'>
                    <i className={
                        clsx(
                            'fa-solid',
                            themeStore.theme === 'light' ? 'fa-moon' : 'fa-sun'
                        )
                    } />
                </button>
                <div className="group">
                    <button className="sm:hidden">
                        <i className="fa-solid fa-bars" />
                    </button>
                    <ul
                        className={clsx(
                            'absolute hidden group-hover:flex flex-col bg-white dark:bg-gray-800 sm:!bg-transparent dark:border-gray-700 border-[1px] rounded-md right-0 whitespace-nowrap shadow-lg',
                            'sm:bg-transparent sm:border-0 sm:shadow-none sm:relative sm:flex-row sm:flex sm:space-x-4'
                        )}
                    >
                        <NavListItem href="mailto:moyuscript@gmail.com?subject=%E7%94%B3%E8%AF%B7%E6%88%90%E4%B8%BA%E6%91%B8%E9%B1%BC%E4%B9%90%E8%B0%B1%20MIDI%20%E7%BD%91%E4%BD%9C%E8%80%85&body=%E4%BD%9C%E5%93%81%E5%88%97%E8%A1%A8%EF%BC%88B%E7%AB%99%E3%80%81%E7%BD%91%E7%9B%98%E7%AD%89%EF%BC%89%EF%BC%9A%0D%0A%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F%EF%BC%88QQ%2F%E5%BE%AE%E4%BF%A1%EF%BC%89%EF%BC%9A">
                            成为作者
                        </NavListItem>
                        <NavListItem href="https://github.com/MoyuScript/music">
                            GitHub
                        </NavListItem>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
