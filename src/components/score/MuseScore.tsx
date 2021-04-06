import React from 'react';

export interface MuseScoreProps {
  url: string
}

export default class extends React.Component<MuseScoreProps> {
  constructor(props: MuseScoreProps) {
    super(props);
  }
  render() {
    return (
        <React.Fragment>
          <h1>MuseScore3 源文件</h1>
          <p>打谱软件 MuseScore3 的工程源文件下载。可以根据自行需要进行修改，但还请保留版权。</p>
          <p><a className={'btn btn-primary'} href={this.props.url}><i className={'fas fa-download'}></i> 下载</a></p>
        </React.Fragment>
    );
  }
}
