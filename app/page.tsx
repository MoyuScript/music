import { getAuthors } from "@/lib/projects";
import ProjectList from "@/components/ProjectList";

export default function Home() {
  const authors = getAuthors();

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto p-8">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            欢迎来到摸鱼乐谱 MIDI 网
          </h2>
          <p className="text-gray-600 text-lg">
            收录各种游戏、动漫音乐的乐谱和 MIDI 文件
          </p>
        </section>

        <ProjectList authors={authors} />
      </div>
    </div>
  );
}
