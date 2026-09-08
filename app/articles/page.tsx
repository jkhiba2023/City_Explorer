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
    <div className="bg-blue-100 px-5">
      <h1 className="font-extrabold text-blue-500 text-4xl text-left py-3">
        Latest Articles Of City Explorer
      </h1>
      <h3 className="text-2xl text-blue-400 font-extralight py-3">
        Explore interesting articles and stories
      </h3>

      <div className="grid grid-cols-3 gap-2 bg-blue-300 rounded-2xl p-5">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-blue-200 p-2 rounded-2xl my-2 h-full flex flex-col"
          >
            <div className="flex justify-start gap-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-400 px-1 rounded-2xl text-[12px] text-white"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-blue-600 text-xl font-bold line-clamp-1">
              {post.title}
            </p>
            <p className="text-blue-600 font-normal line-clamp-3">
              {post.body}
            </p>
            <div className="mt-auto flex justify-center">
              <Link
                href={`/articles/${post.id}`}
                className="flex items-center justify-center gap-2 bg-white text-blue-400 px-2 rounded-2xl hover:text-blue-600"
              >
                <span>Read Article</span>
                <MoveRight size={18} />
              </Link>
            </div>
            <div className="mt-auto flex justify-between py-5">
              <p className="flex justify-center gap-2 text-blue-600 ml-5">
                <Heart />
                {post.reactions.likes}
              </p>
              <p className="flex justify-center gap-2 text-blue-600">
                <HeartOff />
                {post.reactions.dislikes}
              </p>
              <p className="flex justify-center gap-2 text-blue-600 mr-5">
                <Eye />
                {post.views}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default page;
