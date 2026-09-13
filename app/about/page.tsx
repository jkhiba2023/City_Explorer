const About = () => {
  return (
    <main className="min-h-screen bg-blue-50">
      {/* Page Heading */}
      <div className="bg-blue-600 px-4 py-12 text-center sm:px-6 md:px-10 md:py-16">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
          About Us
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
          Discover. Explore. Experience. — Your simple guide to discovering
          amazing places, attractions and experiences across India.
        </p>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:px-10 md:py-14">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* About CityExplorer */}
          <section className="w-full rounded-3xl border border-blue-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-[85%] md:p-8">
            <h2 className="mb-5 border-l-4 border-blue-600 pl-4 text-2xl font-extrabold text-blue-800 sm:text-3xl">
              About CityExplorer
            </h2>

            <div className="rounded-2xl bg-blue-50 p-5 sm:p-6">
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white">
                  Discover.
                </span>

                <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white">
                  Explore.
                </span>

                <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white">
                  Experience.
                </span>
              </div>

              <p className="leading-7 text-blue-700">
                Your simple guide to discovering amazing places, attractions and
                experiences across India.
              </p>
            </div>
          </section>

          {/* Who We Are */}
          <section className="w-full rounded-3xl border border-blue-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-[85%] md:self-end md:p-8">
            <h2 className="mb-5 border-l-4 border-blue-600 pl-4 text-2xl font-extrabold text-blue-800 sm:text-3xl">
              Who We Are?
            </h2>

            <div className="rounded-2xl bg-blue-50 p-5 sm:p-6">
              <p className="leading-7 text-blue-700">
                CityExplorer is a travel discovery platform designed to help
                people discover famous places, attractions, local experiences
                and interesting destinations across India.
              </p>

              <p className="mt-4 leading-7 text-blue-700">
                Our goal is to make exploring new places simple, informative and
                enjoyable.
              </p>
            </div>
          </section>

          {/* What You Can Discover */}
          <section className="w-full rounded-3xl border border-blue-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-[85%] md:p-8">
            <h2 className="mb-5 border-l-4 border-blue-600 pl-4 text-2xl font-extrabold text-blue-800 sm:text-3xl">
              What You Can Discover?
            </h2>

            <div className="rounded-2xl bg-blue-50 p-5 sm:p-6">
              <p className="leading-7 text-blue-700">
                Discover amazing places across India with CityExplorer. Explore
                famous landmarks, historical monuments, beautiful destinations
                and popular attractions. Get useful place information, location
                details, images and weather updates to know more about every
                destination.
              </p>
            </div>
          </section>

          {/* Our Mission */}
          <section className="w-full rounded-3xl border border-blue-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-[85%] md:self-end md:p-8">
            <h2 className="mb-5 border-l-4 border-blue-600 pl-4 text-2xl font-extrabold text-blue-800 sm:text-3xl">
              Our Mission
            </h2>

            <div className="rounded-2xl bg-blue-50 p-5 sm:p-6">
              <p className="leading-7 text-blue-700">
                Our mission is to make exploring India simple and enjoyable.
                CityExplorer brings places, location information, weather
                updates and travel content together in one platform, helping
                users discover new destinations and plan their next adventure.
              </p>
            </div>
          </section>

          {/* Why CityExplorer */}
          <section className="w-full rounded-3xl border border-blue-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-[85%] md:p-8">
            <h2 className="mb-5 border-l-4 border-blue-600 pl-4 text-2xl font-extrabold text-blue-800 sm:text-3xl">
              Why CityExplorer?
            </h2>

            <div className="rounded-2xl bg-blue-50 p-5 sm:p-6">
              <p className="leading-7 text-blue-700">
                Find places, check weather, explore information and discover
                your next destination — all in one place.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* What We Offer */}
      <section className="border-t border-blue-200 bg-white px-4 py-12 sm:px-6 md:px-10 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-blue-800 sm:text-4xl">
              What We Offer?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-blue-600">
              Everything you need to discover and explore amazing destinations
              across India.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Discover Places */}
            <div className="group rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl">
                📍
              </div>

              <h3 className="text-lg font-extrabold text-blue-800">
                Discover Places
              </h3>

              <p className="mt-3 leading-6 text-blue-600">
                Find famous landmarks and interesting destinations across India.
              </p>
            </div>

            {/* Weather */}
            <div className="group rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl">
                🌤️
              </div>

              <h3 className="text-lg font-extrabold text-blue-800">
                Check Weather
              </h3>

              <p className="mt-3 leading-6 text-blue-600">
                Get weather information for places you want to visit.
              </p>
            </div>

            {/* Search */}
            <div className="group rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl">
                🔎
              </div>

              <h3 className="text-lg font-extrabold text-blue-800">Search</h3>

              <p className="mt-3 leading-6 text-blue-600">
                Search for places and discover useful location information.
              </p>
            </div>

            {/* Articles */}
            <div className="group rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl">
                📰
              </div>

              <h3 className="text-lg font-extrabold text-blue-800">
                Explore Articles
              </h3>

              <p className="mt-3 leading-6 text-blue-600">
                Read interesting articles and travel-related information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
