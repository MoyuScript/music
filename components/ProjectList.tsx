"use client";

import Image from "next/image";
import Link from "next/link";
import { Author } from "@/lib/projects";
import { useState, useMemo } from "react";

interface ProjectListProps {
  authors: Author[];
}

export default function ProjectList({ authors }: ProjectListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on search term
  const filteredAuthors = useMemo(() => {
    if (!searchTerm.trim()) {
      return authors;
    }

    const lowerSearch = searchTerm.toLowerCase();
    return authors
      .map((author) => ({
        ...author,
        projects: author.projects.filter(
          (project) =>
            project.meta.name?.toLowerCase().includes(lowerSearch) ||
            project.slug.toLowerCase().includes(lowerSearch),
        ),
      }))
      .filter((author) => author.projects.length > 0);
  }, [authors, searchTerm]);

  return (
    <>
      {/* Search Bar */}
      <section className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索乐谱..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </section>

      {/* Author List */}
      <section className="mt-10">
        <h3 className="text-center font-bold text-xl mb-6 text-gray-900 ">
          作者列表
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {authors.map((author) => (
            <a
              key={author.slug}
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
                />
              </span>
              <span className="bg-gray-100 w-[0.05rem] h-20 mx-2 sm:mx-6" />
              <span className="flex-1">
                <h4 className="sm:text-xl font-bold text-gray-900 ">
                  {author.meta.name}
                </h4>
                <p className="italic text-secondary mt-2 text-xs sm:text-sm">
                  {author.meta.bio}
                </p>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Projects grouped by author */}
      <section className="mt-10 mb-10">
        <h3 className="text-center font-bold text-xl mb-6 text-gray-900 ">
          乐谱列表
        </h3>

        {filteredAuthors.length === 0 ? (
          <p className="text-center text-gray-500 py-8">没有找到匹配的乐谱</p>
        ) : (
          <div className="space-y-8">
            {filteredAuthors.map((author) => (
              <div key={author.slug}>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <Image
                    src={author.meta.avatar}
                    alt={author.meta.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  {author.meta.name}
                  <span className="text-sm text-gray-500 font-normal">
                    ({author.projects.length})
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {author.projects.map((project) => (
                    <Link
                      key={`${author.slug}-${project.slug}`}
                      href={`/${author.slug}/${project.slug}`}
                      className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all p-4 group flex gap-3"
                    >
                      {project.meta.cover ? (
                        <Image
                          width={56}
                          height={56}
                          src={project.meta.cover}
                          alt={project.meta.name}
                          className="size-12 object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="size-12 bg-gray-100 flex items-center justify-center rounded-md">
                          <span className="text-gray-400 text-2xl">🎵</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {project.meta.name || project.slug}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          by {author.meta.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
