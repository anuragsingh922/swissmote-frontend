import { Github, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector.jsx";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { role } = useAppSelector((state) => state.user);

  return (
    <footer className="bg-gray-50 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Social Eventify
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Create, manage, and share unforgettable events with your
                community.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="mailto:contact@socialeventify.com"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/events"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Browse Events
                  </Link>
                </li>
                {role === "admin" && (
                  <li>
                    <Link
                      to="/create"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Create Event
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="text-sm text-gray-600">
                  <span className="block">contact@eventrocket.com</span>
                </li>
                <li className="text-sm text-gray-600">
                  <span className="block">+91 9896424841</span>
                </li>
                <li className="text-sm text-gray-600">
                  <span className="block">Gurugram, Haryana</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500">
              © {currentYear} Social Eventify. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
