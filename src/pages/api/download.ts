/**
 * 乐谱文件下载
 * 查询参数：
 * - id: string = 乐谱 ID
 * - filename: string = 文件名
 */

import { NextApiHandler, NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';

function bad(res: NextApiResponse) {
  res.send('Bad Request');
  res.status(400);
}

/**
 * 是否为合法 ID
 * @param id
 */
function isValidId(id: string): boolean {
  return /^[a-zA-Z0-9_]+$/.test(id);
}

/**
 * 是否为合法文件名
 * @param filename
 */
function isValidFilename(filename: string): boolean {
  return !/[\/\\\:\*\"\<\>\|\?]/.test(filename);
}

const handler: NextApiHandler = async (req, res) => {
  // 请求方法检查
  if (req.method !== 'GET') {
    res.status(405);
    res.send('Method Not Allowed');
  }

  // 参数检查
  let id: string = req.query.id as string;
  if (!id) {
    bad(res);
    return;
  }
  id = decodeURIComponent(id);

  if (!isValidId(id)) {
    bad(res);
    return;
  }

  let filename: string = req.query.filename as string;
  if (!filename) {
    bad(res);
    return;
  }

  filename = decodeURIComponent(filename);
  if (!isValidFilename(filename)) {
    bad(res);
    return;
  }

  // 检查乐谱是否存在
  const scorePath = path.join('./scores', id);
  if (!fs.existsSync(scorePath)) {
    res.send('Score not found');
    return;
  }

  // 检查资源是否存在
  const resPath = path.join(scorePath, filename);
  if (!fs.existsSync(resPath)) {
    res.send('Resource not found');
    return;
  }

  // 发送资源
  res.status(200);
  const ext = path.extname(filename);
  const newName = id + ext;
  res.setHeader('Content-Disposition', `attachment; filename=${newName}`);
  const file = fs.createReadStream(resPath);
  file.pipe(res);
  file.on('error', () => {
    file.close();
  });
};

export default handler;
