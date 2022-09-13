import React from "react";
import poster from "../images/poster.png";
const Home = () => {
  return (
    <>
      <section className="h-screen flex justify-center items-center bg-gray-800">
        <div className="relative container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4 ">
            <div className="w-full lg:w-1/2 px-4">
              <span className="text-lg font-bold text-blue-400">
                Create posts to educate
              </span>
              <h2 className="max-w-2xl my-6 md:my-12 text-3xl md:text-5xl 2xl:text-8xl text-white font-bold font-heading">
                Pen down your ideas{" "}
                <span className="text-yellow-500">By creating a post</span>
              </h2>
              <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-gray-100">
                Your post must be free from racism and unhealthy words
              </p>
            </div>
            <div className="w-full h-[500px] hidden lg:block lg:w-1/2 px-4">
              <img className="w-full" src={poster} alt={poster} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
