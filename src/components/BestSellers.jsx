import React from "react";
// import Swiper core and required modules
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const BestSellers = () => {
  return (
    <>
      <h2 className="font-serif text-5xl py-6 font-bold text-white text-center bg-[#B072F9] border-y-4 border-y-gray-300">
        Best <span className="text-gray-900">Sellers</span>
      </h2>
      <div className="w-[90%] mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              // Screens >= 640px (small devices like phones)
              slidesPerView: 2,
            },
            768: {
              // Screens >= 768px (medium devices like tablets)
              slidesPerView: 3,
            },
            1024: {
              // Screens >= 1024px (large devices like desktops)
              slidesPerView: 4,
            },
          }}
        >
          <SwiperSlide>
            <div className="card">
              <img
                src="/bestsellers/jeep-wrangler.jpg"
                alt="image of Chevrolet Trax"
              />
              <div className="card-body p-0 mb-10 ml-6">
                <h5 className="card-title">Jeep Wrangler</h5>
                <p className="card-text text-yellow-700 font-bold">$32499.99</p>
                <p className="card-text text-gray-600 font-[12px] text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src="/bestsellers/kia-telluride.jpg"
                alt="image of kia-telluride"
              />
              <div className="card-body p-0 mb-10 ml-6">
                <h5 className="card-title">Kia Telluride</h5>
                <p className="card-text text-yellow-700 font-bold">$17699.99</p>
                <p className="card-text text-gray-600 font-[12px] text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src="/bestsellers/chevrolet-trax.jpg"
                alt="image of Chevrolet Trax"
              />
              <div className="card-body p-0 mb-10 ml-6">
                <h5 className="card-title">Chevrolet Trax</h5>
                <p className="card-text text-yellow-700 font-bold">$99.99</p>
                <p className="card-text text-gray-600 font-[12px] text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src="/bestsellers/maserati-grecale-folgore.jpg"
                alt="image of Chevrolet Trax"
              />
              <div className="card-body p-0 mb-10 ml-6">
                <h5 className="card-title">Maserati Folgore</h5>
                <p className="card-text text-yellow-700 font-bold">$21499.99</p>
                <p className="card-text text-gray-600 font-[12px] text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src="/bestsellers/tesla-model-y.jpg"
                alt="image of Chevrolet Trax"
              />
              <div className="card-body p-0 mb-10 ml-6">
                <h5 className="card-title">Tesla Model Y</h5>
                <p className="card-text text-yellow-700 font-bold">$19799.99</p>
                <p className="card-text text-gray-600 font-[12px] text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src="/bestsellers/toyota-grand-highlander.jpg"
                alt="image of Chevrolet Trax"
              />
              <div className="card-body p-0 mb-10 ml-6">
                <h5 className="card-title">Toyota Highlander</h5>
                <p className="card-text text-yellow-700 font-bold">$25799.99</p>
                <p className="card-text text-gray-600 font-[12px] text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default BestSellers;
