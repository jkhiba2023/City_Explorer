import { Eye, Heart, HeartOff, MoveRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

const getPost = async () => {
  const res = await fetch(`https://dummyjson.com/posts?limit=10&skip=0`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
};

const page = async () => {
  const data = await getPost();

  const posts = data.posts;

  return (
    <div className="bg-blue-50 px-4 py-10 sm:px-6 md:px-10">
      <h1 className="text-center text-3xl font-extrabold text-blue-800 sm:text-4xl md:text-left">
        Latest Articles Of City Explorer
      </h1>

      <h3 className="py-3 text-center text-lg font-light text-blue-600 sm:text-2xl md:text-left">
        Explore interesting articles and stories
      </h3>

      <div className="grid grid-cols-1 gap-6 rounded-3xl border border-blue-200 bg-white p-5 shadow-md sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex h-full flex-col rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <p className="mb-3 line-clamp-2 text-xl font-bold text-blue-800">
              {post.title}
            </p>

            <p className="line-clamp-3 leading-6 text-blue-600">{post.body}</p>

            <div className="mt-auto pt-6">
              <div className="flex justify-center">
                <Link
                  href={`/articles/${post.id}`}
                  className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-2 font-semibold text-white transition-all duration-300 hover:bg-blue-700"
                >
                  <span>Read Article</span>
                  <MoveRight size={18} />
                </Link>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-blue-200 pt-4">
                <p className="flex items-center gap-2 text-blue-600">
                  <Heart size={18} />
                  {post.reactions.likes}
                </p>

                <p className="flex items-center gap-2 text-blue-600">
                  <HeartOff size={18} />
                  {post.reactions.dislikes}
                </p>

                <p className="flex items-center gap-2 text-blue-600">
                  <Eye size={18} />
                  {post.views}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default page;
