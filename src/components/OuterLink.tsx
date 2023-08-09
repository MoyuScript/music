import React from 'react';
import clsx from 'clsx'

export interface OuterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {

}

const OuterLink: React.FC<OuterLinkProps> = ({ className, target = '_blank', children, ...props }) => {
    return (
        <a className={clsx('text-blue-500 hover:text-blue-400 cursor-pointer', className)} target={target} {...props}>
            {children}
        </a>
    );
}

export default OuterLink;
