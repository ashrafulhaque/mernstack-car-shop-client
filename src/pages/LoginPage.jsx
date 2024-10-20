import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const handleEmailLogin = null;

  return (
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
  );
};

export default LoginPage;
