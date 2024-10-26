import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "https://mernstack-car-shop-server.vercel.app/categories";
  // Fetch category data from the API endpoint
  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Set the fetched data
        setCategories(data);
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
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
