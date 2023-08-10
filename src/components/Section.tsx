import React from 'react';

export interface SectionProps extends React.PropsWithChildren {
    title: string;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
        <section className='mt-6 mb-10'>
            <h2 className='text-center font-bold text-xl'>
                {title}
            </h2>
            <div className='mt-6'>
                {children}
            </div>
        </section>
    );
}

export default Section;
