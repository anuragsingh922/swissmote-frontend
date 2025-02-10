import { Button } from "@/components/ui/button";
import { Calendar, Users, Star, Award, Heart, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/hooks/useAppSelector";

const Index = () => {
  const { role } = useAppSelector((state) => state.user);
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <div className="space-y-6 max-w-3xl">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              <span>Create </span>
              <TypeAnimation
                sequence={[
                  "unforgettable events",
                  3000,
                  "magical moments",
                  3000,
                  "amazing experiences",
                  3000,
                  "lasting memories",
                  3000,
                ]}
                wrapper="span"
                speed={50}
                className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600"
                repeat={Infinity}
              />
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
              The easiest way to create, manage, and share your events with the
              world. Start planning your next event today.
            </p>
          </div>
          <div className="mx-auto max-w-sm space-y-4">
            <div className="space-y-2 flex flex-col gap-3">
              {role === "admin" && (
                <Link to="/create">
                  <Button
                    className="w-full bg-black hover:bg-gray-900 transition-all duration-300"
                    size="lg"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </Link>
              )}
              <Link to="/events">
                <Button
                  variant="outline"
                  className="w-full border-yellow-500 text-black hover:bg-yellow-50 hover:text-black"
                  size="lg"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Event Categories Section */}
      <div className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-black">
            Popular Event Categories
          </h2>
          <p className="text-gray-600">
            Discover events that match your interests
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-500">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Technology Events"
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Technology
                </h3>
                <p className="text-yellow-400">Conferences & Workshops</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-500">
            <img
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
              alt="Business Events"
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Business</h3>
                <p className="text-yellow-400">Networking & Seminars</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-500">
            <img
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b"
              alt="Entertainment Events"
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Entertainment
                </h3>
                <p className="text-yellow-400">Concerts & Shows</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-black">Why Choose Us</h2>
          <p className="text-gray-600">
            Discover what makes our platform special
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-yellow-500">
            <Star className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-black">
              Easy to Use
            </h3>
            <p className="text-gray-600">
              Intuitive interface that makes event creation a breeze
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-yellow-500">
            <Award className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-black">
              Professional Tools
            </h3>
            <p className="text-gray-600">
              Advanced features to make your events stand out
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-yellow-500">
            <Rocket className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-black">Grow Fast</h3>
            <p className="text-gray-600">
              Reach more people and scale your events quickly
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-black text-white py-16 rounded-2xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-500">100K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-500">50K+</div>
              <div className="text-gray-300">Events Created</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-yellow-500">1M+</div>
              <div className="text-gray-300">Tickets Sold</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-black">
            What People Say
          </h2>
          <p className="text-gray-600">Trusted by event organizers worldwide</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-yellow-500">
            <div className="flex items-center mb-4">
              <Heart className="h-5 w-5 text-yellow-500 mr-2" />
              <div className="text-yellow-500">★★★★★</div>
            </div>
            <p className="text-gray-600 mb-4">
              "Social Eventify has transformed how we organize events. It's
              incredibly easy to use and has all the features we need."
            </p>
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="font-semibold text-black">Sarah Johnson</div>
                <div className="text-sm text-gray-500">Event Organizer</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-yellow-500">
            <div className="flex items-center mb-4">
              <Heart className="h-5 w-5 text-yellow-500 mr-2" />
              <div className="text-yellow-500">★★★★★</div>
            </div>
            <p className="text-gray-600 mb-4">
              "The platform has streamlined our event management process. Highly
              recommended for any event professional!"
            </p>
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="font-semibold text-black">Michael Davis</div>
                <div className="text-sm text-gray-500">Event Organizer</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-yellow-500">
            <div className="flex items-center mb-4">
              <Heart className="h-5 w-5 text-yellow-500 mr-2" />
              <div className="text-yellow-500">★★★★★</div>
            </div>
            <p className="text-gray-600 mb-4">
              "The best event management platform I've used. It makes planning
              and organizing events a breeze!"
            </p>
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" />
                <AvatarFallback>EW</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="font-semibold text-black">Emma Wilson</div>
                <div className="text-sm text-gray-500">Event Organizer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black p-12 rounded-2xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of event organizers who trust Social Eventify to create
          memorable experiences
        </p>
        <Link to="/register">
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black transition-all duration-300"
            size="lg"
          >
            Get Started For Free
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
