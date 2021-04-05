import React from 'react';
import { Score } from 'src/types/config';
import style from 'src/styles/index/scores.module.sass';
import ScoresItem from './ScoresItem';

export interface ScoresProps {
  items: Score[]
}

export default class extends React.Component<ScoresProps> {
  constructor(props: ScoresProps) {
    super(props);
  }
  render() {
    let itemElement = [];
    let index = 0;
    for (let item of this.props.items) {
      itemElement.push(<ScoresItem info={item} key={index} />);
      index += 1;
    }
    return (
        <div className={style.scores}>
          <div className={style.info}>
            <h1>当前共有 <span style={{color:'#ff1b1b'}}>{this.props.items.length}</span> 条结果</h1>
          </div>
          <div className={style.items}>
            {itemElement}
          </div>
        </div>
    );
  }
}
