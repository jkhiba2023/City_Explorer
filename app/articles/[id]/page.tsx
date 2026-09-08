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
    <main className="min-h-screen bg-blue-50 px-4 py-8 md:px-8 lg:px-16">
      <article className="mx-auto flex min-h-[80vh] max-w-4xl flex-col rounded-3xl bg-white p-6 shadow-lg md:p-10">
        <div className="mb-6">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            <Link href={"/articles"}>
              <ArrowLeft />
            </Link>
          </span>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-blue-500 px-3 py-1 text-sm font-medium text-white"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-blue-700 md:text-5xl">
          {post.title}
        </h1>

        <div className="my-6 h-px w-full bg-blue-100" />

        <p className="max-w-3xl text-base leading-8 text-gray-600 md:text-lg md:leading-9">
          {post.body}
        </p>

        <div className="mt-auto pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-blue-50 px-5 py-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Heart size={20} />
              <span className="font-semibold">{post.reactions.likes}</span>
              <span className="text-sm text-gray-500">Likes</span>
            </div>

            <div className="flex items-center gap-2 text-blue-600">
              <HeartOff size={20} />
              <span className="font-semibold">{post.reactions.dislikes}</span>
              <span className="text-sm text-gray-500">Dislikes</span>
            </div>

            <div className="flex items-center gap-2 text-blue-600">
              <Eye size={20} />
              <span className="font-semibold">{post.views}</span>
              <span className="text-sm text-gray-500">Views</span>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default page;
