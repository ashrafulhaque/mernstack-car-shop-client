import React from "react";

const Banner = () => {
  return (
    <div>
      <div
        className="hero max-h-[70vh] sm:min-h-[70vh] w-full"
        style={{
          backgroundImage: "url(./nfsbanner.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-3xl sm:text-5xl font-bold font-play">
              Your <span className="text-yellow-400">Dream</span> Car Awaits
            </h1>
            <p className="mb-5 font-semibold">
              Experience the Thrill of Driving with Our Wide Range of Vehicles -
              From Luxury Sedans to Powerful SUVs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
