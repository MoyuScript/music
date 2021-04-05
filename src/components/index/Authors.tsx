import React from 'react';
import { Author } from 'src/types/config';
import style from 'src/styles/index/authors.module.sass';
import AuthorsItem from './AuthorsItem';

export interface AuthorsProps {
  authors: Author[]
}

export default class Authors extends React.Component<AuthorsProps> {
  constructor(props: AuthorsProps) {
    super(props);
  }
  render() {
    let items = [];
    let i = 0;
    for (let author of this.props.authors) {
      items.push(<AuthorsItem info={author} key={author.name}/>);
      i += 1;
    }
    return (
        <div className={style.authors}>
          {items}
        </div>
    );
  }
}

