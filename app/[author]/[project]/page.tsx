import { getAllProjectPaths, getProject, getAuthor } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { author: authorSlug, project: projectSlug } = await params;
  const project = getProject(authorSlug, projectSlug);
  if (!project) {
    return {};
  }
  return {
    title: `${project.meta.name} by ${authorSlug}`,
    description: project.meta.description,
  };
}
interface Props {
  params: Promise<{ author: string; project: string }>;
}

const fileExtColorMap: Record<string, string> = {
  pdf: "bg-red-400",
  mid: "bg-blue-400",
  midi: "bg-blue-400",
  mscz: "bg-green-400",
  mscx: "bg-green-400",
  $default: "bg-gray-400",
};

export async function generateStaticParams() {
  const paths = getAllProjectPaths();
  return paths.map((path) => ({
    author: path.author,
    project: path.project,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { author: authorSlug, project: projectSlug } = await params;
  const project = getProject(authorSlug, projectSlug);
  const author = getAuthor(authorSlug);

  if (!project || !author) {
    notFound();
  }

  return (
    <div
      className="z-10 h-full flex-1 flex flex-col"
      style={{
        background: project.meta.cover
          ? `url(${project.meta.cover}) center/cover no-repeat fixed`
          : undefined,
      }}
    >
      <div className="bg-white/80 backdrop-blur-sm flex-1">
        <div className="p-8 h-full max-w-7xl mx-auto">
          {/* Project Title */}
          <h1 className="text-center text-3xl font-bold text-gray-900 ">
            {project.meta.name}
          </h1>

          {/* Author Section */}
          <section className="mt-10 mb-10">
            <h2 className="text-center font-bold text-xl mb-6 text-gray-900 ">
              作者介绍
            </h2>
            <a
              href={author.meta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 flex items-center group"
            >
              <span className="shrink-0">
                <Image
                  src={author.meta.avatar}
                  alt={author.meta.name}
                  width={96}
                  height={96}
                  className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </span>
              <span className="bg-gray-100 w-[0.05rem] h-20 mx-2 sm:mx-6" />
              <span>
                <h3 className="sm:text-xl font-bold text-gray-900 ">
                  {author.meta.name}
                </h3>
                <p className="italic text-secondary mt-2 text-xs sm:text-sm">
                  {author.meta.bio}
                </p>
              </span>
            </a>
          </section>

          {/* Readme Content */}
          {project.content && (
            <section className="mt-10 mb-10">
              <h2 className="text-center font-bold text-xl mb-6 text-gray-900 ">
                说明文档
              </h2>
              <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 prose ">
                <ReactMarkdown>{project.content}</ReactMarkdown>
              </div>
            </section>
          )}

          {/* Bilibili Video */}
          {project.meta.bvid && (
            <section className="mt-10 mb-10">
              <h2 className="text-center font-bold text-xl mb-6 text-gray-900 ">
                视频预览
              </h2>
              <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden mx-auto aspect-video">
                <iframe
                  src={`//player.bilibili.com/player.html?isOutside=true&bvid=${project.meta.bvid}&p=1`}
                  scrolling="no"
                  className="w-full h-full"
                  style={{ border: "none" }}
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* Files Download */}
          <section className="mt-10 mb-10">
            <h2 className="text-center font-bold text-xl mb-6 text-gray-900 ">
              文件列表
            </h2>
            {project.files.length > 0 ? (
              <ul className="space-y-4">
                {project.files.map((file) => {
                  const fileExt = file.split(".").pop()?.toLowerCase();
                  const colorClass =
                    fileExtColorMap[fileExt || "$default"] ||
                    fileExtColorMap["$default"];

                  return (
                    <li key={file}>
                      <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                        <a
                          download={file}
                          href={`/projects/${authorSlug}/${projectSlug}/${file}`}
                          className="relative flex group items-center h-14 sm:h-20"
                        >
                          <span
                            className={`relative shrink-0 h-full w-20 sm:w-28 flex justify-center items-center text-white font-bold sm:text-2xl ${colorClass}`}
                          >
                            {fileExt?.toUpperCase()}
                          </span>
                          <span className="ml-4 grow text-gray-900 truncate pr-4">
                            {file}
                          </span>
                          <span className="h-full flex items-center justify-center px-4 bg-gray-200 group-hover:px-8 group-hover:text-2xl group-hover:text-white group-hover:bg-sky-400 transition-all">
                            ⬇
                          </span>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-center text-gray-600 ">暂无文件</p>
            )}
          </section>

          {/* Support Author */}
          {author.meta.afdianId && (
            <section className="mt-10 mb-10">
              <h2 className="text-center font-bold text-xl mb-6 text-gray-900 ">
                爱发电支持作者
              </h2>
              <div className="flex justify-center">
                <iframe
                  src={`https://afdian.com/leaflet?slug=${author.meta.afdianId}`}
                  scrolling="no"
                  className="w-full min-[700px]:w-[640px] h-[230px] p-0 shadow-xl rounded-xl border-0"
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
