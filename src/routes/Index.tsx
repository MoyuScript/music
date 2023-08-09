import React from 'react';
import { useTitle } from 'ahooks';
import Section from '../components/Section';
import Authors from '../components/Authors';
import Projects from '../components/Projects';
import { useParams } from 'react-router';

export interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
    const params = useParams();
    const { authorId = null } = params;
    useTitle(__APP_NAME__)

    return (
        <div>
            <Section title="作者列表">
                <Authors />
            </Section>
            <Section title="乐谱列表">
                <Projects currentAuthorId={authorId} />
            </Section>
        </div>
    );
}

export default Index;
