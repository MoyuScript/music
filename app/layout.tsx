import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s - 摸鱼乐谱 MIDI 网",
    default: "摸鱼乐谱 MIDI 网",
  },
  description: "收录各种游戏、动漫音乐的乐谱和 MIDI 文件",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="antialiased flex flex-col min-h-screen items-center h-full bg-gray-50">
        <header className="sticky top-0 z-50 w-full p-4 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              摸鱼乐谱 MIDI 网
            </Link>
          </div>
        </header>
        <main className="flex-1 w-full">{children}</main>
        <footer className="w-full text-sm sm:text-base text-center bg-gray-700 text-gray-100 border-t py-8 px-4">
          <p>
            <span>本站所有内容遵循以下协议：</span>
            <a
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-blue-300 hover:underline"
            >
              知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议
            </a>
          </p>
          <p className="mt-2">
            <span>版权所有 © 2023-现在</span>
            <Link href="/" className="ml-2 hover:text-blue-300">
              摸鱼乐谱 MIDI 网
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
