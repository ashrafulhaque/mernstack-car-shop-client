import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const roundedRating = Math.round(product.rating);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={product.imageURL}
        alt={product.name}
        className="h-64 w-full p-2 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Category: {product.category}</p>
          <p className="text-orange-500 text-sm font-semibold">
            Price: {product.price}
          </p>
        </div>

        <div className="flex justify-between items-center my-2">
          <div className="rating">
            Rating:
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating-2"
                className={`mask mask-star-2 ${
                  star <= roundedRating ? "bg-orange-400" : "bg-orange-200"
                }`}
                checked={star === roundedRating}
                readOnly
              />
            ))}
          </div>
          <div className="badge badge-neutral">{roundedRating}/5</div>
        </div>
        <Link
          to={`/productdetails/${product._id}`} // Dynamic route to product details
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
