import clsx from 'clsx';
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
        <div
            className={clsx(
                'bg-white border-[1px] rounded-2xl shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
