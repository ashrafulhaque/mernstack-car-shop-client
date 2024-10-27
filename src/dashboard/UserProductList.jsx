import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FaPaypal, FaSpinner } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const UserProductList = () => {
  const { user } = useContext(AuthContext);
  const [productcart, setProductcart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const handlePament = {};
  // Fetch data from the API endpoint
  useEffect(() => {
    fetch("https://mernstack-car-shop-server.vercel.app/productcart/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const userPurchases = data.filter(
          (purchase) => purchase.email === user?.email
        );
        setProductcart(userPurchases);

        // Set totalAmount to 0 if userPurchases is empty
        const totalAmount = userPurchases.reduce(
          (previousValue, currentValue) => {
            return {
              price:
                parseInt(previousValue.price) + parseInt(currentValue.price),
            };
          },
          { price: 0 } // Initial value
        );

        setTotalAmount(totalAmount.price);
        //console.log("Fetched data:", data);
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
        <title>NFS CarShop | User Productlist</title>
      </Helmet>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="flex items-center justify-between p-6 border-b border-base-200">
            <h2 className="text-2xl font-bold">All Products</h2>
          </div>

          {/* Table Section */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <FaSpinner className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full border">
                  <thead>
                    <tr className="bg-base-200 text-sm text-gray-600">
                      <th className="font-semibold border">#</th>
                      <th className="font-semibold border">Product Name</th>
                      <th className="font-semibold border">Price</th>
                      <th className="font-semibold border">Purchase Date</th>
                      <th className="font-semibold border">Address</th>
                      <th className="font-semibold border">
                        Special Instruction
                      </th>
                      <th className="font-semibold border text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productcart.map((product, index) => (
                      <tr key={product._id} className="hover:bg-base-100">
                        <td className="border">{index + 1}</td>
                        <td className="border font-medium">
                          {product.productName}
                          <div className="text-[10px] font-normal text-gray-600">
                            ({product._id})
                          </div>
                        </td>
                        <td className="border">${product.price}</td>
                        <td className="border">
                          {product.purchaseDate.split("T", 1)[0]}
                        </td>
                        <td className="border">{product.address}</td>
                        <td className="border">
                          {product.specialInstructions}
                        </td>
                        <td className="border text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handlePament(product)}
                              className="btn btn-warning btn-sm"
                              title="Payment"
                            >
                              <FaPaypal className="w-4 h-4" /> Payment
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-base-200 text-sm text-gray-600">
                      <td colSpan="1"></td>
                      <td
                        colSpan="1"
                        className="border-t border-base-200 text-left"
                      >
                        Total Amount:
                      </td>
                      <td colSpan="5">${totalAmount}/-</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProductList;
