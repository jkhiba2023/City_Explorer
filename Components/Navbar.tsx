import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-[90px] w-full bg-gradient-to-r from-white via-blue-400 to-blue-600 shadow-md">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-evenly">
        <div className="flex items-center gap-10">
          <Link href="/">
            <img
              src="/logoImage/logo.png"
              alt="City-Explorer Logo"
              className="w-50 h-20 object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <Link href="/place" className="text-white font-semibold">
            Place
          </Link>

          <Link href="/articles" className="text-white font-semibold">
            Articles
          </Link>

          <Link href="/about" className="text-white font-semibold">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
