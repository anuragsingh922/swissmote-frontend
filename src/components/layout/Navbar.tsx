import { Button } from "@/components/ui/button";
import { LogIn, Rocket } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setCurrentUser } from "@/store/eventSlice";
import { removeUser } from "../../store/userSlice";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, role } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <Rocket className="h-8 w-8 text-black transform transition-transform group-hover:rotate-12" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-500 rounded-full animate-pulse" />
              </div>
              <div className="ml-3 flex flex-col">
                <span className="text-xl font-bold tracking-tight text-black">
                  EventRocket
                </span>
                <span className="text-xs text-yellow-500 font-medium">
                  Launch Your Events
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link to="/events">
              <Button variant="ghost">Events</Button>
            </Link>
            {role === "admin" && (
              <Link to="/create">
                <Button>Create Event</Button>
              </Link>
            )}
            {!name && (
              <Link to="/login">
                <Button variant="ghost">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            {name && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    localStorage.removeItem("drsfbuadcjk");
                    dispatch(removeUser());
                    dispatch(setCurrentUser({ id: "dummy", role: "user" }));
                  }}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1 animate-fade-in">
              <Link
                to="/events"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Events
              </Link>
              <Link
                to="/create"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Create Event
              </Link>
              {!name && (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                >
                  Login
                </Link>
              )}
              {name && <div>{name}</div>}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
