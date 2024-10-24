import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API endpoint
  useEffect(() => {
    fetch("https://express-endpoint-server.vercel.app/products/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Set the fetched data
        setCourses(data);
        console.log("Fetched data:", data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <h2 className="font-serif text-5xl py-6 font-bold text-white text-center bg-yellow-500 border-y-4 border-y-gray-300">
        Product <span className="text-gray-900">Categories</span>
      </h2>
      <div className="container w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-5">
          {courses.map((course) => (
            <CategoryCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
