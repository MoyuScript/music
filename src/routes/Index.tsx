import React from 'react';
import { useTitle } from 'ahooks';
import Section from '../components/Section';
import Authors from '../components/Authors';
import Projects from '../components/Projects';

export interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
    useTitle(__APP_NAME__)

    return (
        <div>
            <Section title="作者列表">
                <Authors />
            </Section>
            <Section title="乐谱列表">
                <Projects />
            </Section>
        </div>
    );
}

export default Index;
