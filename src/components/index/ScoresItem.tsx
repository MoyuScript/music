import React from 'react'
import { Score } from 'src/types/config';
import style from 'src/styles/index/scores.module.sass';

export interface ScoresItemProps {
  info: Score
}

export default class extends React.Component<ScoresItemProps> {
  constructor(props: ScoresItemProps) {
    super(props);
  }
  render() {
    let info = this.props.info;

    return (
        <a className={style.item} href={'./' + info.key}>
          <div className={style.itemBg} style={{
            backgroundImage: `url(${info.image})`
          }}>
            <div className={style.itemBgSlice}></div>
          </div>
          <div className={style.itemInfo}>
            <h1 className={style.itemTitle}>{info.name}</h1>
            <p className={style.itemDesc}>{info.desc}</p>
          </div>
        </a>
    );
  }
}
