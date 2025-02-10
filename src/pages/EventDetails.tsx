import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleAttendance } from "../store/eventSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  MapPin,
  Users,
  Trophy,
  CupSoda,
  Car,
  Train,
  Plane,
  Smartphone,
  Check,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const event = useSelector((state: RootState) =>
    //@ts-expect-error time
    state.events.events.find((e) => e._id === id)
  );
  const currentUser = useSelector(
    (state: RootState) => state.events.currentUser
  );

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!event && !isLoading) {
    return <div className="text-center py-8">Event not found</div>;
  }

  const isAttending = event?.attending?.includes(currentUser?.id || "");

  const handleAttendanceToggle = () => {
    if (event) {
      dispatch(toggleAttendance(event._id));
      toast.success(
        isAttending
          ? "You are no longer attending this event"
          : "You are now attending this event"
      );
    }
  };

  const sampleHighlights = [
    "Interactive sessions with industry experts",
    "Networking opportunities",
    "Live demonstrations",
    "Q&A sessions",
  ];

  const specialGuests = [
    {
      name: "John Smith",
      role: "Keynote Speaker",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    {
      name: "Sarah Johnson",
      role: "Industry Expert",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
  ];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Hero Section Skeleton */}
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-[200px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-[150px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-[150px]" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative h-[300px] rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4"
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {format(new Date(event.date), "PPP")} at {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {event.location}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About the Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{event.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {sampleHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Special Guests */}
          <Card>
            <CardHeader>
              <CardTitle>Special Guests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialGuests.map((guest, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <img
                      src={guest.image}
                      alt={guest.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{guest.name}</h3>
                      <p className="text-sm text-gray-500">{guest.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{event.attendees} attendees</span>
              </div>
              <div className="flex items-center gap-2">
                <CupSoda className="h-4 w-4 text-gray-500" />
                <span>Refreshments provided</span>
              </div>
              <Badge
                variant="secondary"
                className={cn(
                  "w-fit",
                  event.price === null
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                )}
              >
                {!event.price ? "Free Entry" : `INR${event.price}`}
              </Badge>
              <Button
                onClick={handleAttendanceToggle}
                variant={isAttending ? "secondary" : "default"}
                className="w-full mt-4"
              >
                {isAttending ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Attending
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Attend Event
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="transport">
              <AccordionTrigger>Transportation</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Car className="h-4 w-4" /> Pickup/Drop Service
                  </h4>
                  <p className="text-sm text-gray-600">
                    Complimentary shuttle service available from major hotels
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Train className="h-4 w-4" /> Nearest Metro/Railway
                  </h4>
                  <p className="text-sm text-gray-600">
                    Central Station (0.5 miles)
                    <br />
                    Metro Line B, Exit 4
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Plane className="h-4 w-4" /> Nearest Airport
                  </h4>
                  <p className="text-sm text-gray-600">
                    International Airport (15 miles)
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="services">
              <AccordionTrigger>Available Services</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Taxi Services</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Uber</li>
                    <li>• Lyft</li>
                    <li>• Local Taxi: +1-234-567-8900</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Smartphone className="h-4 w-4" /> Mobile Network Coverage
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Airtel: 4G/5G available</li>
                    <li>• VI: 4G coverage</li>
                    <li>• Jio: 5G enabled</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
