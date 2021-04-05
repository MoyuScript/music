import React from 'react'
import { Author } from 'src/types/config';
import style from 'src/styles/index/authors.module.sass';

export interface AuthorsItemProps {
  info: Author
}

export default class extends React.Component<AuthorsItemProps> {
  constructor(props: AuthorsItemProps) {
    super(props);
  }
  render() {
    return (
        <a className={style.item} href={this.props.info.url} target="_blank">
          <div className={style.avatar}><img src={this.props.info.avatar} /></div>

          <div className={style.info}>
            <div className={style.name}>{this.props.info.name}</div>
            <div className={style.sign}>{this.props.info.sign}</div>
          </div>
        </a>
    );
  }
}
