import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const { loginWithEmail, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the "redirectPath" from state or default to "/dashboard"
  const redirectPath = location.state?.redirectPath || "/dashboard";

  useEffect(() => {
    // Redirect to dashboard if the user is already logged in
    if (user) {
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, redirectPath]);

  const handleEmailLogin = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

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
        console.error("Login failed:", error); // Log error for debugging

        // Display a detailed error message based on Firebase error code
        let errorMessage = "Sorry! An error occurred during login.";
        if (error.code === "auth/wrong-password") {
          errorMessage = "Incorrect password.";
        } else if (error.code === "auth/invalid-credential") {
          errorMessage = "No account found with this email.";
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
            <input
              name="email"
              type="text"
              className="grow"
              placeholder="Email"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <input
              name="password"
              type="password"
              id="password"
              className="grow"
              placeholder="Password"
              required
            />
          </label>

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
