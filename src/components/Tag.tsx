import clsx from 'clsx';
import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Tag: React.FC<TagProps> = ({ children, className, ...props }) => {
    return (
        <span className={
            clsx(
                'text-white text-xs p-1 rounded-full',
                className,
            )
        } {...props}>
            {children}
        </span>
    );
}

export default Tag;
