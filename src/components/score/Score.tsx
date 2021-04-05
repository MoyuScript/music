import React from 'react';

export interface ScoreProps {
  url: string
}

export default class extends React.Component<ScoreProps> {
  constructor(props: ScoreProps) {
    super(props);
  }
  render() {
    return (
        <React.Fragment>
          <h1>PDF乐谱</h1>
          <p>下面是乐谱在线预览。若无法显示，建议使用最新版<a href={'http://www.firefox.com.cn/'} target={'_blank'}>Firefox浏览器</a>，或下载后再使用PDF阅读器打开。</p>
          <p><a className={'btn btn-primary'} href={this.props.url}><i className={'fas fa-download'}></i> 下载</a></p>
          <div style={{height: '80vh'}}>
            <iframe src={`../pdfjs/web/viewer.html?file=${encodeURIComponent(this.props.url)}`} width={'100%'} height={'100%'}></iframe>
          </div>
        </React.Fragment>
    );
  }
}
