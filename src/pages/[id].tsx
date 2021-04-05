import React from 'react'
import { getAuthorsInfo, getScoresInfo } from 'src/score';
import { Author, Score } from 'src/types/config';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from 'src/components/common/Header';
import Footer from 'src/components/common/Footer';
import BilibiliVideo from 'src/components/score/BilibiliVideo';
import ScoreComponent from 'src/components/score/Score';
import MuseScore from 'src/components/score/MuseScore';
import Midi from 'src/components/score/Midi';
import style from 'src/styles/score/content.module.sass';

interface Props {
  error: boolean
  score: Score
  author: Author
}

export default class extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

  }
  render() {
    if (this.props.error) {
      return (
        <React.Fragment>
          <h1>服务器出现错误</h1>
        </React.Fragment>
      )
    }
    const { score, author } = this.props;
    let pdfUrl = `/api/download?id=${score.key}&filename=score.pdf`;
    let midiUrl = `/api/download?id=${score.key}&filename=midi.mid`;
    let museUrl = `/api/download?id=${score.key}&filename=musescore.mscz`;
    return (
      <React.Fragment>
        <Head>
          <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"/>
          <link href="https://cdn.bootcdn.net/ajax/libs/font-awesome/5.9.0/css/all.min.css" rel="stylesheet"/>
          <title>{this.props.score.name} - 喵帕斯小窝乐谱站</title>
        </Head>
        <Header showBackground={true}/>
        <div className={style.body} style={{backgroundImage: `url(${score.image})`}}>
          <div className={style.content}>
            <div className={style.meta}>
              <h1 className={style.title}>{score.name}</h1>
              <div className={style.subtitle}>
                <p>{score.realName}</p>
                <p>{score.desc}</p>
              </div>
              <div className={style.author}>
                <a href={author.url} target={'_blank'} title={author.sign}>
                  <img src={author.avatar} className={style.avatar} />
                  <span className={style.name}>{author.name}</span>
                </a>
              </div>
            </div>
            <article>
              {score.bilibili ? <BilibiliVideo bvid={score.bilibili}/> : null}
              {score.hasPDF ? <ScoreComponent url={pdfUrl}/> : null}
              {score.hasMUSESCORE ? <MuseScore url={museUrl}/> : null}
              {score.hasMIDI ? <Midi url={midiUrl}/> : null}
            </article>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params!.id;
  const scores = await getScoresInfo();
  if (scores === null) {
    return {
      props: {
        error: true
      }
    }
  }

  for (const score of scores) {
    if (score.key === id) {
      const authors = await getAuthorsInfo();
      if (authors === null) {
        return {
          props: {
            error: true
          }
        }
      }
      for (const author of authors) {
        if (author.name === score.author) {
          return {
            props: {
              error: false,
              score,
              author
            }
          }
        }
      }
      return {
        props: {
          error: false,
          score
        }
      }
    }
  }
  return {
    notFound: true
  }
}
