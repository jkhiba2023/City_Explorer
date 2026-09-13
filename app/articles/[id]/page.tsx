import { ArrowLeft, Eye, Heart, HeartOff } from "lucide-react";
import Link from "next/link";

const getPost = async (id: string) => {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  return res.json();
};

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const post = await getPost(id);

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6 md:px-8 lg:px-16">
      <article className="mx-auto flex min-h-[80vh] max-w-4xl flex-col rounded-3xl border border-blue-200 bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:p-6 md:p-10">
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full bg-blue-100 p-2 text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white">
            <Link href={"/articles"}>
              <ArrowLeft size={20} />
            </Link>
          </span>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white sm:text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-blue-800 sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        <div className="my-6 h-px w-full bg-blue-200" />

        <p className="max-w-3xl text-base leading-8 text-blue-700 sm:text-lg md:leading-9">
          {post.body}
        </p>

        <div className="mt-auto pt-10">
          <div className="grid grid-cols-1 gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:grid-cols-3 sm:gap-4 sm:px-5 sm:py-4">
            <div className="flex items-center justify-center gap-2 text-blue-600 sm:justify-start">
              <Heart size={20} />
              <span className="font-semibold">{post.reactions.likes}</span>
              <span className="text-sm text-blue-400">Likes</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-blue-600">
              <HeartOff size={20} />
              <span className="font-semibold">{post.reactions.dislikes}</span>
              <span className="text-sm text-blue-400">Dislikes</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-blue-600 sm:justify-end">
              <Eye size={20} />
              <span className="font-semibold">{post.views}</span>
              <span className="text-sm text-blue-400">Views</span>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default page;
