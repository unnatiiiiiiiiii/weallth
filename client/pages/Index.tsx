import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

    return (
    <div className="min-h-screen flex items-center justify-center bg-wealth-gray-bg">
      <div className="text-center">
        <div className="w-16 h-16 bg-wealth-blue rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="animate-spin h-8 w-8 text-white"
            viewBox="0 0 50 50"
          >
            <circle
              className="opacity-30"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset="75"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Redirecting to Wealith...</h1>
      </div>
    </div>
  );
}
