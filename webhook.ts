import Koa from 'koa';
import koaBody from 'koa-body';

const app = new Koa();

const SECRET = '069ece64193d5968c34b53acafc91a81';

app.use(koaBody());

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

  const data = ctx.request.body;

  console.log(JSON.stringify(data, undefined, 2));

  if (data.ref !== 'refs/head/main') {
    ctx.status = 200;
    ctx.body = '非 main 分支，未修改。';
    return;
  }

  
});

app.listen(5001, '127.0.0.1', undefined, () => {
  console.log('music webhook 服务器启动。')
});

