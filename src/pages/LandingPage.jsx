import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoUrl = isMobile
    ? "https://i.ibb.co/zhr9LyFG/small-logo.png"
    : "https://i.ibb.co/q3dMmX2X/large-logo.png";

  return (
    <div className="min-h-screen">
      <nav className="flex justify-between items-center gap-6 px-4 py-3 fixed w-full bg-white z-50">
        <img src={logoUrl} alt="BudgeX" className="h-10 md:h-14" />

        <div className="flex gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="bg-indigo-600 text-white px-6 py-1 rounded-full text-center hover:bg-indigo-700 transition"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-gray-500 ring-2 px-6 py-1 ring-indigo-600 rounded-full text-center hover:bg-indigo-600 hover:text-white transition"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="bg-indigo-600 text-white px-6 py-1 ring-2 ring-indigo-600 rounded-full text-center hover:bg-indigo-700 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-16">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-3xl sm:text-5xl mb-4 text-gray-800">
            <span className="text-indigo-600 font-bold">The easiest way</span>{" "}
            <br />
            to manage your finances
          </h1>
          <p className="text-gray-600 mb-20 sm:mb-16">
            Track income, budget smartly, and reach your financial goals faster
            with BudgeX.
          </p>
        </div>

        <div className="w-full max-w-lg mb-10 lg:mb-0">
          <img
            src="https://i.ibb.co/LXwcFBF5/financial-management.png"
            alt="Finance Illustration"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
