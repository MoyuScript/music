import React, { CSSProperties } from 'react';

export interface BilibiliVideoProps {
  bvid: string
}

interface State {
  style: CSSProperties
}

export default class extends React.Component<BilibiliVideoProps, State> {
  el: React.RefObject<HTMLDivElement>
  constructor(props: BilibiliVideoProps) {
    super(props);
    this.state = {
      style: {
        width: '100%'
      }
    };
    this.onResize = this.onResize.bind(this);
    this.el = React.createRef();
  }
  render() {
    return (
        <React.Fragment>
          <h1>示例视频</h1>
          <p>若无法观看请直接到b站观看：<a href={`https://www.bilibili.com/${this.props.bvid}`} target={'_blank'}>{this.props.bvid}</a></p>
          <div style={this.state.style} ref={this.el}>
            <iframe src={'//player.bilibili.com/player.html?bvid=' + this.props.bvid}
                  scrolling="no" frameBorder="no" allowFullScreen={true} width={'100%'} height={'100%'}></iframe>
          </div>
        </React.Fragment>
    );
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }
  onResize() {
    // 响应式iframe
    if (this.el.current) {
      let width = this.el.current.offsetWidth;
      let height = `${width * 0.7777 - 50}px`;
      this.setState({
        style: {
          height
        }
      });
    }
  }
}
