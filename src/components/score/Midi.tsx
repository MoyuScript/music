import React from 'react';

export interface MidiProps {
  url: string
}

export default class extends React.Component<MidiProps> {
  constructor(props: MidiProps) {
    super(props);
  }
  render() {
    return (
        <React.Fragment>
          <h1>MIDI</h1>
          <p>MIDI 文件下载。</p>
          <p><a className={'btn btn-primary'} href={this.props.url}><i className={'fas fa-download'}></i> 下载</a></p>
        </React.Fragment>
    );
  }
}
