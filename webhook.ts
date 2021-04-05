import Koa from 'koa';
import koaBody from 'koa-body';
import childProcess from 'child_process';

const app = new Koa();

const SECRET = '069ece64193d5968c34b53acafc91a81';

app.use(koaBody({
  parsedMethods: ['POST', 'GET', 'PUT', 'PATCH']
}));

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
  childProcess.spawn('git pull && docker-compose build && docker-compose up -d');
});

app.listen(5001, '127.0.0.1', undefined, () => {
  console.log('music webhook 服务器启动。')
});

