
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dashboard-bg p-4">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md w-full">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full text-red-600 mb-4">
          <AlertCircle size={28} />
        </div>
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="text-text-secondary mb-6">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-primary-blue text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
