import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const handleEmailLogin = null;
  const handleGithubLogin = null;
  const handleGoogleLogin = null;

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
      <div className="grid grid-cols-2 gap-2 justify-around">
        <button onClick={handleGoogleLogin} className="btn btn-accent my-3">
          Login With Google
        </button>
        <button onClick={handleGithubLogin} className="btn btn-warning my-3">
          Login With Github
        </button>
      </div>

      <p className="text-center bold">
        Don't have an account?{" "}
        <Link className="text-lime-600 underline" to="/signup">
          Signup Here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
