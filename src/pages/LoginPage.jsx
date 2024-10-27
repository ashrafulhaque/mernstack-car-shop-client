import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { FaEnvelope, FaEllipsisH } from "react-icons/fa";

const LoginPage = () => {
  const { loginWithEmail, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.redirectPath || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, redirectPath]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the corresponding error when user types
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleEmailLogin = (event) => {
    event.preventDefault();

    const { email, password } = formData;

    // Client-side validation
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email field is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password field is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    loginWithEmail(email, password)
      .then(() => {
        navigate(redirectPath, { replace: true });
        toast.success("Congratulations! You've logged in successfully.", {
          position: "bottom-right",
          style: {
            background: "green",
            color: "white",
          },
        });
      })
      .catch((error) => {
        console.error("Login failed:", error);

        let errorMessage = "Sorry! An error occurred during login.";
        if (error.code === "auth/wrong-password") {
          errorMessage = "Sorry, incorrect password.";
        } else if (error.code === "auth/invalid-credential") {
          errorMessage = "Sorry, invalid credential.";
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
        <title>NFS CarShop | Login</title>
      </Helmet>
      <div className="max-w-[400px] mx-auto border border-gray-200 p-4 my-5 shadow-md">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-3">
          Login
        </h1>
        <form
          onSubmit={handleEmailLogin}
          id="loginForm"
          className="max-w-sm mx-auto space-y-4"
        >
          <label className="input input-bordered flex items-center gap-2">
            <FaEnvelope />
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
              name="password"
              type="password"
              className="grow"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}

          <button type="submit" className="btn btn-neutral w-full">
            Login With Email
          </button>
        </form>

        <p className="text-center bold py-3">
          Don't have an account?{" "}
          <Link className="text-lime-600 underline" to="/signup">
            Signup Here
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
