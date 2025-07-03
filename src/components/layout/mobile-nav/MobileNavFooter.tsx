
import { Link } from "react-router-dom";

export const MobileNavFooter = () => {
  return (
    <div className="border-t mt-6 pt-6">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <Link 
          to="/contact" 
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Contact
        </Link>
        <Link 
          to="/feedback" 
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Feedback
        </Link>
        <Link 
          to="/faq" 
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          FAQ
        </Link>
        <Link 
          to="/terms" 
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Terms
        </Link>
      </div>
      
      <div className="mt-4 pt-4 border-t text-center text-xs text-gray-500">
        © 2024 PhysioFlex. All rights reserved.
      </div>
    </div>
  );
};
