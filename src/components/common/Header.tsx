import style from 'src/styles/common/header.module.sass';
import React from 'react';

export interface HeaderProps {
  showBackground: boolean
}

interface State {
  show: boolean
}

export default class extends React.Component<HeaderProps, State> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      show: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  render() {
    return (
      <header className={this.props.showBackground ? `${style.header} ${style.showBackground}` : style.header}>
        <div className={style.title}>
          <a href={'/music'}>自制MIDI/乐谱</a>
        </div>
        <div className={style.links}>
          <button className={`fas fa-ellipsis-h ${style.openBtn}`} onClick={this.toggleMenu}></button>
          <div className={[style.content, this.state.show ? style.show : null].join(' ')}>
            <a href={'/'} target='_blank'><i className={'fas fa-drum'}></i>博客</a>
            <a href={'#about'}><i className={'fas fa-drum'}></i>关于</a>
          </div>
        </div>
      </header>
    );
  }
  toggleMenu() {
    this.setState((state, props) => ({show: !state.show}));
  }
}
