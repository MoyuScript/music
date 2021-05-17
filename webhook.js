import Koa from 'koa';
import koaBody from 'koa-body';
import childProcess from 'child_process';
import { promisify } from 'util';
import { createHmac } from 'crypto';

const app = new Koa();

const exec = promisify(childProcess.exec);

const SECRET = '069ece64193d5968c34b53acafc91a81';

app.use(koaBody({
  parsedMethods: ['POST']
}));

async function procedure(build) {
  console.log('拉取代码');
  let o = await exec('git pull');
  console.log(o.stdout);
  if (o.stderr) {
    console.error(o.stderr);
  }
  if (build) {
    console.log('构建镜像');
    o = await exec('docker-compose build');

    console.log(o.stdout);
    if (o.stderr) {
      console.error(o.stderr);
    }
    console.log('停止现有服务')
    o = await exec('docker-compose down');
    console.log(o.stdout);

    console.log('启动服务');
    o = await exec('docker-compose up -d');

    console.log(o.stdout);
    if (o.stderr) {
      console.error(o.stderr);
    }
  }
}

app.use(async (ctx, next) => {
  if (ctx.method !== 'POST') {
    ctx.status = 405;
    return;
  }
  // 检查 UA
  if (ctx.get('user-agent') !== 'git-oschina-hook') {
    ctx.status = 403;
    return;
  }

  // 检查 Secret
  const token = ctx.get('x-gitee-token');
  const ts = ctx.get('x-gitee-timestamp');

  if (!(token && ts)) {
    ctx.status = 403;
    return;
  }

  const hmac = createHmac('SHA256', SECRET);
  hmac.update(`${ts}\n${SECRET}`);
  const sign = encodeURI(hmac.digest('base64'));

  if (sign !== token) {
    ctx.status = 403;
    return;
  }

  // 检查 Push Hook
  const eventName = ctx.get('x-gitee-event');
  if (eventName !== 'Push Hook') {
    ctx.status = 200;
    ctx.body = '非 Push Event，未触发';
    return;
  }

  const data = ctx.request.body;
  console.log(data);

  // 检查 Ref
  if (data.ref !== 'refs/heads/main') {
    ctx.body = '非 main 分支，未触发';
    return;
  }

  // 检查 commits 是否存在
  if (!data.commits) {
    ctx.body = '无 commits，未触发';
    return;
  }

  // 检查是否应该构建
  let shouldBuild = false;

  // 不构建的路径
  const pattern = /^(scores|design)\/.*/i;
  for (const commit of data.commits) {
    // 检查 added
    if (!shouldBuild && commit.added) {
      shouldBuild = commit.added.some((v) => !pattern.test(v));
    }

    // 检查 removed
    if (!shouldBuild && commit.removed) {
      shouldBuild = commit.removed.some((v) => !pattern.test(v));
    }

    // 检查 modified
    if (!shouldBuild && commit.modified) {
      shouldBuild = commit.modified.some((v) => !pattern.test(v));
    }
  }

  procedure(shouldBuild);
  if (!shouldBuild) {
    ctx.body = '源文件未变动。仅拉取代码。';
  } else {
    ctx.body = '源文件变动，提交构建请求。';
  }
  ctx.status = 202;
});

app.listen(5001, '127.0.0.1', undefined, () => {
  console.log('music webhook 服务器启动。')
});

