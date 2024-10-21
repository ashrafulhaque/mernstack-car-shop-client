import React from "react";
import { Link } from "react-router-dom";

const courseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={course.img_url}
        alt={course.title}
        className="h-24 object-cover mt-4 mx-auto"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-center mb-2">{course.title}</h3>
        <div className="w-[125px] mx-auto">
          <Link
            to={`/allproducts/${course._id}`} // Dynamic route to product details
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 inline-block"
          >
            View All Cars
          </Link>
        </div>
      </div>
    </div>
  );
};
export default courseCard;
