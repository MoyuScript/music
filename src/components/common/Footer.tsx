import React from 'react';
import style from 'src/styles/common/footer.module.sass';

export default class extends React.Component {
  render() {
    return (
        <footer className={style.footer}>
          <div className={style.content}>
            <div id="about" className={style.about}>
              <h1>关于</h1>
              <p>这是是自己的一个音乐资源站_(:з」∠)_。</p>
              <p>主要因为在学 WEB 开发，所以就想自己写个。</p>
              <p>没啥好说的了 2333。</p>
            </div>
            <div className={style.tech}>
              <h1>技术栈</h1>
              <div>
                <p>前端</p>
                <p>Bootstrap React FontAwesome pdf.js</p>
              </div>
              <div>
                <p>后端</p>
                <p>Node.js Next.js</p>
              </div>
              <div>
                <p>打谱软件</p>
                <p>FL-STUDIO-20 MuseScore3</p>
              </div>
            </div>
            <div className={style.copyright}>
              <p>
                <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target={'_blank'}>
                  <img alt="知识共享许可协议" src="/music/static/license.png" />
                </a>
              </p>
              <p>本站所有作品采用<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target="_black">知识共享署名-相同方式共享 4.0 国际许可协议</a>进行许可。</p>
              <p>若要进行商业用途请考虑原曲版权。我们只提供自制乐谱和 MIDI 文件。</p>
              <p>©2020-2021 <a href={'https://www.moyu.moe/'} target="_blank">moyu.moe</a></p>
            </div>
          </div>
        </footer>
    );
  }
}
