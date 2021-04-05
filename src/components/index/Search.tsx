import React from 'react';
import { Score } from 'src/types/config';
import style from 'src/styles/index/search.module.sass';

export interface SearchProps {
  count: number
  items: Score[]
  updateItems: (items: Score[]) => void
}

export default class extends React.Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  render() {
    return (
        <div className={style.search}>
          <div className={style.info}>
            <span>目前共制作了 </span><span style={{color: 'yellow'}}>{this.props.count}</span><span> 首歌的 </span><span style={{color: 'aqua'}} className={'new-line'}>MIDI/乐谱</span>
          </div>
          <div className={style.searchArea}>
            <i className={`fas fa-music ${style.icon} ${style.left}`}></i>
            <input placeholder={'请输入关键词搜索作品'} onChange={this.onSearchChange}></input>
            <i className={`fas fa-music ${style.icon} ${style.right}`}></i>
          </div>
        </div>
    );
  }
  onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.toLowerCase();
    if (value === '') {
      this.props.updateItems(this.props.items);
    } else {
      let result = [];
      for (let score of this.props.items) {
        for (const [key, itemValue] of Object.entries(score)) {
          if (key === 'image' || typeof itemValue !== 'string') {
            continue;
          }
          if (itemValue.toLowerCase().indexOf(value) !== -1) {
            result.push(score);
            break;
          }
        }
      }
      this.props.updateItems(result);
    }
  }
}
