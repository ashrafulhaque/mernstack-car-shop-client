import React from "react";

const UserReview = () => {
  return (
    <div>
      <h2 className="font-play text-5xl py-6 text-center font-bold bg-orange-600 border-y-4 border-y-[#ec517d]">
        <span className="text-white"> Customer </span>Reviews
      </h2>
      <section className="bg-[url('./reviewbg.jpg')] bg-cover bg-repeat-y sm:bg-no-repeat bg-center w-full py-10">
        <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 justify-around items-center  gap-10">
          <div className="card bg-base-100 shadow-xl rounded-none">
            <div className="card-body">
              <img
                src="/jasonstatham.jpg"
                alt="Image of Jason Statham"
                className="w-36 h-36 rounded-full mx-auto"
              />
              <p className="text-[12px] text-justify">
                "I appreciate the attention to detail and the solid performance
                on the road. Definitely a top contender in the market for those
                who love style and strength."
              </p>

              <div className="text-center font-semibold">
                <h2 className="text-accent text-lg">Jason Statham</h2>
                <p className="text-gray-500 text-md ">Actor, Martial Artist</p>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl rounded-none">
            <div className="card-body">
              <img
                src="/vindiesel.jpg"
                alt="Image of Vin Diesel"
                className="w-36 h-36 rounded-full mx-auto"
              />
              <p className="text-[12px] text-justify">
                "Beast under the hood, still a modern look. Whether on city
                streets or highways, it dominates the road. A true
                representation of speed and power."
              </p>

              <div className="text-center font-semibold">
                <h2 className="text-accent text-lg">Vin Diesel</h2>
                <p className="text-gray-500 text-md ">Actor, Director</p>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl rounded-none">
            <div className="card-body">
              <img
                src="/tomcruise.jpg"
                alt="Image of Tom Cruise"
                className="w-36 h-36 rounded-full mx-auto"
              />
              <p className="text-[12px] text-justify">
                "It's not just about luxury; it's about performance, and this
                car delivers both. Perfect for anyone seeking thrill and comfort
                in one package."
              </p>

              <div className="text-center font-semibold">
                <h2 className="text-accent text-lg">Tom Cruise</h2>
                <p className="text-gray-500 text-md ">Actor, Producer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserReview;
