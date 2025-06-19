
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Home, Info, Calendar, Video, MessageCircle, UserPlus, Stethoscope, Brain, Users, Apple } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-vitality-700">Yasha Physiocare</h3>
            <p className="text-gray-600 mb-4">
              Professional physiotherapy services to help you move better, feel better, and live better.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-500 hover:text-vitality-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-500 hover:text-vitality-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-500 hover:text-vitality-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Main Pages */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-vitality-700">Main Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-vitality-400 transition-colors flex items-center">
                  <Home className="mr-2 h-4 w-4" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-vitality-400 transition-colors flex items-center">
                  <Info className="mr-2 h-4 w-4" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-vitality-400 transition-colors flex items-center">
                  <Stethoscope className="mr-2 h-4 w-4" /> Services
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-600 hover:text-vitality-400 transition-colors flex items-center">
                  <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Advanced Features */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-vitality-700">Advanced Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-assistant" className="text-gray-600 hover:text-vitality-400 transition-colors flex items-center">
                  <Brain className="mr-2 h-4 w-4" /> AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/video-library" className="text-gray-600 hover:text-vitality-400 transition-colors flex items-center">
                  <Video className="mr-2 h-4 w-4" /> Video Library
                </Link>
              </li>
              <li>
                <Link to="/interactive-body-map" className="text-gray-600 hover:text-vitality-400 transition-colors flex items-center">
                  <Users className="mr-2 h-4 w-4" /> Interactive Body Map
                </Link>
              </li>
              <li>
                <Link to="/diet-plan" className="text-gray-600 hover:text-vitality-400 transition-colors flex items-center">
                  <Apple className="mr-2 h-4 w-4" /> Diet Plan
                </Link>
              </li>
              <li>
                <Link to="/doctor-registration" className="text-gray-600 hover:text-vitality-400 transition-colors flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" /> Doctor Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-vitality-700">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-vitality-400 flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  123 Healing Street, Wellness City, WC 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-vitality-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-vitality-400 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-vitality-400 flex-shrink-0" />
                <a href="mailto:info@yashaphysiocare.com" className="text-gray-600 hover:text-vitality-400 transition-colors">
                  info@yashaphysiocare.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-500 text-sm">
            © {currentYear} Yasha Physiocare. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-end gap-4">
            <Link to="/privacy-policy" className="text-gray-500 text-sm hover:text-vitality-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-500 text-sm hover:text-vitality-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-500 text-sm hover:text-vitality-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
