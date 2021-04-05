import Koa from 'koa';
import koaBody from 'koa-body';
import childProcess from 'child_process';
import { promisify } from 'util';

const app = new Koa();

const exec = promisify(childProcess.exec);

const SECRET = '069ece64193d5968c34b53acafc91a81';

app.use(koaBody({
  parsedMethods: ['POST', 'GET', 'PUT', 'PATCH']
}));

async function procedure() {
  console.log('拉取代码');
  let o = await exec('git pull');
  console.log(o.stdout);
  if (o.stderr) {
    console.error(o.stderr);
  }

  console.log('构建镜像');
  o = await exec('docker-compose build');

  console.log(o.stdout);
  if (o.stderr) {
    console.error(o.stderr);
  }

  console.log('启动服务');
  o = await exec('docker-compose up -d');

  console.log(o.stdout);
  if (o.stderr) {
    console.error(o.stderr);
  }
}

app.use(async (ctx, next) => {
  if (ctx.method !== 'GET') {
    ctx.status = 405;
    return;
  }
  // 检查 Secret
  const token = ctx.get('x-codeup-token');
  if (token !== SECRET) {
    ctx.status = 403;
    return;
  }

  const eventName = ctx.get('x-codeup-event');
  if (eventName !== 'Push Hook') {
    ctx.status = 200;
    ctx.body = '非 Push Event，未修改';
    return;
  }

  ctx.status = 202;
  ctx.body = '接受处理。';
  procedure();
});

app.listen(5001, '127.0.0.1', undefined, () => {
  console.log('music webhook 服务器启动。')
});

