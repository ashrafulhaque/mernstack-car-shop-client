import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const SignupPage = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const displayName = form.get("displayName");
    const email = form.get("email");
    const password = form.get("password");
    const phone = form.get("phone");
    const address = form.get("address");
    console.log(displayName, email, password, phone, address);

    createUser(displayName, email, password, phone, address)
      .then((result) => {
        console.log("User created successfully!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="max-w-[400px] mx-auto border border-gray-200 p-4 my-5 shadow-md">
        <h1 className="text-xl font-semibold text-gray-800 text-center mb-3">
          Signup
        </h1>
        <form
          onSubmit={handleSignup}
          id="signupForm"
          className="max-w-sm mx-auto space-y-4"
        >
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              name="displayName"
              type="text"
              className="grow"
              placeholder="Name"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              name="email"
              type="text"
              className="grow"
              placeholder="Email"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              id="password"
              className="grow"
              placeholder="Password"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5Zm0 1h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm3 13a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="text"
              name="phone"
              id="phone"
              className="grow"
              placeholder="Phone Number"
              required
            />
          </label>
          <label className="flex items-center gap-2">
            <textarea
              name="address"
              id="address"
              placeholder="Type Your Address Here.."
              className="textarea textarea-bordered textarea-md w-full text-base"
              required
            ></textarea>
          </label>
          <button type="submit" className="btn btn-neutral w-full mt-4">
            Signup
          </button>
        </form>

        <p className="text-center bold mt-3">
          Already have an account? {"  "}
          <Link className="text-lime-600 underline" to="/login">
            Login Here
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignupPage;
