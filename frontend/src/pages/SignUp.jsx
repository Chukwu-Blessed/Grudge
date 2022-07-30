import React from "react";

const SignUp = () => {
  return (
    <section className="text-gray-600 body-font relative">
      {/* <div className="absolute inset-0 bg-gray-300">
     <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed" style="filter: grayscale(1) contrast(1.2) opacity(0.4);"></iframe>
        </div> */}
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-20">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            SignUp
          </h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-100">
              Username
            </label>
            <input
              type="text"
              id="text"
              name="name"
              className="w-full bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-100">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-100">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ">
            Signup
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
