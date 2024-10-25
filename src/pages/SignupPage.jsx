import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import {
  FaAddressBook,
  FaEllipsisH,
  FaEnvelope,
  FaImage,
  FaPhone,
  FaUser,
  FaUserSecret,
} from "react-icons/fa";

const SignupPage = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    phone: "",
    photoURL: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the corresponding error if the field is valid
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();

    const { displayName, email, password, phone, photoURL, address } = formData;

    // Client-side validation
    const newErrors = {};
    if (!displayName) newErrors.displayName = "Please enter your name.";
    if (!email) newErrors.email = "Email field is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!phone || !/^\d{11}$/.test(phone))
      newErrors.phone = "Phone number must be 11 digits.";
    if (!address) newErrors.address = "Please enter your address.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createUser(displayName, email, password, phone, photoURL, address)
      .then(() => {
        console.log("User created successfully!");
        toast.success("Congratulations! You've signed up successfully.", {
          position: "bottom-right",
          style: {
            background: "green",
            color: "white",
          },
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        // Display a detailed error message based on Firebase error code
        let errorMessage = "Sorry! An error occurred during signup.";
        if (error.code === "auth/email-already-in-use") {
          errorMessage = "Sorry, this email already exists.";
        }

        toast.error(errorMessage, {
          position: "bottom-right",
          style: {
            background: "red",
            color: "white",
          },
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>NFS CarShop | Signup</title>
      </Helmet>
      <div className="max-w-[400px] mx-auto border border-gray-200 p-4 my-5 shadow-md">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-3">
          Signup
        </h1>
        <form
          onSubmit={handleSignup}
          id="signupForm"
          className="max-w-sm mx-auto space-y-3"
        >
          <label className="input input-bordered flex items-center gap-2">
            <FaUser></FaUser>
            <input
              name="displayName"
              type="text"
              className="grow"
              placeholder="Name"
              value={formData.displayName}
              onChange={handleChange}
            />
          </label>
          {errors.displayName && (
            <p className="text-red-600 text-sm">{errors.displayName}</p>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <FaEnvelope></FaEnvelope>
            <input
              name="email"
              type="text"
              className="grow"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <FaEllipsisH />
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}

          <label className="input input-bordered flex items-center gap-2">
            <FaPhone />
            <input
              type="text"
              name="phone"
              className="grow"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <FaImage />
            <input
              type="text"
              name="photoURL"
              id="photoURL"
              className="grow"
              placeholder="https://example.com/profile-photo.jpg"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </label>
          <label className="flex items-center gap-2">
            <textarea
              name="address"
              placeholder="Type Your Address Here.."
              className="textarea textarea-bordered textarea-md w-full text-base"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </label>
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address}</p>
          )}

          <button type="submit" className="btn btn-neutral w-full mt-4">
            Signup
          </button>
        </form>

        <p className="text-center bold mt-3">
          Already have an account?{" "}
          <Link className="text-lime-600 underline" to="/login">
            Login Here
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignupPage;
