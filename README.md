# 摸鱼乐谱 MIDI 网

一个展示游戏、动漫音乐乐谱和 MIDI 文件的静态网站。

## 特性

- 📚 展示多个创作者的作品集
- 🎵 支持 MIDI、PDF、MuseScore 等多种格式
- 📺 集成 Bilibili 视频播放
- 💜 支持爱发电打赏链接
- ⚡ 使用 Next.js 静态导出，速度快
- 🚀 自动部署到 GitHub Pages

## 开发

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

访问 http://localhost:3000

### 构建静态网站

```bash
pnpm build
```

构建输出在 `out/` 目录

## 项目结构

```
public/projects/
├── {author}/
│   ├── readme.md              # 作者信息（YAML front matter）
│   └── {project}/
│       ├── readme.md          # 项目信息（YAML front matter）
│       ├── *.mid              # MIDI 文件
│       ├── *.pdf              # 乐谱 PDF
│       └── *.mscz             # MuseScore 文件
```

### 作者 readme.md 格式

```markdown
---
id: "author_id"
name: "作者名称"
avatar: "https://..."
url: "https://..."
bio: "个人简介"
afdianId: "afdian_id"
---
```

### 项目 readme.md 格式

```markdown
---
name: "项目名称"
cover: "https://..."        # 可选：封面图片
bvid: "BV1234567890"        # 可选：B站视频ID
---

项目介绍内容（Markdown 格式）
```

## 部署

推送到 GitHub 的 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

确保在 GitHub 仓库设置中：
1. Settings > Pages > Source 选择 "GitHub Actions"
2. 启用 GitHub Pages

## 技术栈

- Next.js 16 (Static Export)
- React 19
- TypeScript
- Tailwind CSS
- gray-matter (YAML front matter 解析)
- react-markdown (Markdown 渲染)

## License

MIT
