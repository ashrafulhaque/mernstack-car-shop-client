import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ProductCard from "../components/ProductCard";
import { FaSpinner } from "react-icons/fa";

const AllProductsPage = () => {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API endpoint
  useEffect(() => {
    fetch("https://mernstack-car-shop-server.vercel.app/products/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Set the fetched data
        setproducts(data);
        console.log("Fetched data:", data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <Helmet>
        <title>NFS CarShop | All Products</title>
      </Helmet>
      <section className="container font-poppins mx-auto py-6">
        <h2 className="font-play text-5xl pt-6 pb-6 text-center font-bold">
          <span className="border-b-4 border-spacing-3 border-slate-600">
            List of
          </span>
          <span className="text-green-600"> Products </span>
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <FaSpinner className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default AllProductsPage;
