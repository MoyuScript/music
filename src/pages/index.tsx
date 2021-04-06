import React from 'react';
import Head from 'next/head';

import { GetServerSideProps } from 'next';
import { getAuthorsInfo, getScoresInfo } from '../score';
import { Author, Score } from '../types/config';

import Header from "src/components/common/Header";
import Footer from "src/components/common/Footer";

import Search from "src/components/index/Search";
import Scores from "src/components/index/Scores";
import Authors from "src/components/index/Authors";

interface Props {
  error?: string | null
  authors: Author[]
  scores: Score[]
}

interface State {
  showItems: Score[]
}

export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showItems: props.scores
    }

    this.updateItems = this.updateItems.bind(this);
  }

  updateItems(items: Score[]) {
    this.setState({
      showItems: items
    });
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"/>
          <link href="https://cdn.bootcdn.net/ajax/libs/font-awesome/5.9.0/css/all.min.css" rel="stylesheet"/>
          <title>喵帕斯小窝乐谱站</title>
        </Head>
        <Header showBackground={false}/>
        <Search updateItems={this.updateItems} items={this.props.scores} count={this.props.scores.length}/>
        <Scores items={this.state.showItems}/>
        <Authors authors={this.props.authors}/>
        <Footer />
      </React.Fragment>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authors = await getAuthorsInfo();
  const scores = await getScoresInfo();
  if (!(authors && scores)) {
    const props: Props = {
      error: '服务器出现了错误',
      authors: [],
      scores: []
    }
    return {
      props
    }
  }

  const props: Props = {
    error: null,
    authors,
    scores: scores.reverse()
  }
  return {
    props
  }
}
