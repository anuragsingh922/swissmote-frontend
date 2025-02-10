import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarIcon,
  MapPin,
  Users,
  Edit,
  Trash2,
  DollarSign,
  UserPlus,
  UserMinus,
  Menu,
  IndianRupee,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setSearchTerm,
  setSelectedCategory,
  setSelectedDate,
  setSelectedTime,
  setSelectedStatus,
  setSelectedPriceFilter,
  getEventStatus,
  toggleAttendance,
  Event,
  deleteEvents,
  updateEvents,
  markAttendenceEvents,
  removeUserEvent,
} from "../store/eventSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "../hooks/useAppSelector";
import { Switch } from "@/components/ui/switch";

const Events = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const {
    events,
    searchTerm,
    selectedCategory,
    selectedDate,
    selectedTime,
    selectedStatus,
    selectedPriceFilter,
    currentUser,
  } = useSelector((state: RootState) => state.events);
  const { userEvents } = useSelector((state: RootState) => state.events);
  const { role } = useAppSelector((state: RootState) => state.user);
  const [working, setworking] = useState(false);

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesDate =
      !selectedDate || event.date === format(selectedDate, "yyyy-MM-dd");
    const matchesTime = selectedTime === "any" || event.time === selectedTime;
    const eventStatus = getEventStatus(event.date, event.time);
    const matchesStatus =
      selectedStatus === "all" || eventStatus === selectedStatus;
    const matchesPrice =
      selectedPriceFilter === "all" ||
      (selectedPriceFilter === "isFree" && event.isFree) ||
      (selectedPriceFilter === "paid" && !event.isFree);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDate &&
      matchesTime &&
      matchesStatus &&
      matchesPrice
    );
  });

  const handleDelete = (eventId: number) => {
    if (currentUser?.role !== "admin") {
      toast({
        title: "Permission Denied",
        description: "Only administrators can delete events.",
        variant: "destructive",
      });
      return;
    }

    //@ts-expect-error time
    dispatch(deleteEvents({ id: eventId }));
    toast({
      title: "Event deleted",
      description: "The event has been successfully deleted.",
    });
  };

  const handleEdit = (event: Event) => {
    if (currentUser?.role !== "admin") {
      toast({
        title: "Permission Denied",
        description: "Only administrators can edit events.",
        variant: "destructive",
      });
      return;
    }

    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleEditSubmit = () => {
    if (currentUser?.role !== "admin") {
      toast({
        title: "Permission Denied",
        description: "Only administrators can edit events.",
        variant: "destructive",
      });
      return;
    }

    if (editingEvent) {
      console.log("Edit : ", editingEvent);
      //@ts-expect-error time
      dispatch(updateEvents(editingEvent));
      toast({
        title: "Event updated",
        description: "The event has been successfully updated.",
      });
      setIsDialogOpen(false);
      setEditingEvent(null);
    }
  };

  const handleAttendance = (eventId: number) => {
    if (working) return;
    if (!role) {
      toast({
        title: "Authentication Required",
        description: "Please log in to mark your attendance.",
        variant: "destructive",
      });
      return;
    }
    setworking(true);

    // @ts-expect-error time
    dispatch(markAttendenceEvents(eventId))
      // @ts-expect-error time
      .unwrap()
      .then(() => {
        const event = events.find((e) => e._id === eventId);
        const isAttending = event?.attending?.includes(currentUser.id);
        setworking(false);

        toast({
          title: isAttending ? "Attendance Removed" : "Attendance Marked",
          description: isAttending
            ? "You are no longer marked as attending this event."
            : "You are now marked as attending this event.",
        });
      });
  };

  const isAdmin = role === "admin";
  const [isFree, setIsFree] = useState(true);

  const FiltersContent = () => (
    <div className={`${isMobile ? "space-y-4" : "flex items-center gap-3"}`}>
      <Select
        value={selectedCategory}
        onValueChange={(value) => dispatch(setSelectedCategory(value))}
      >
        <SelectTrigger className="border-yellow-500">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Technology">Technology</SelectItem>
          <SelectItem value="Music">Music</SelectItem>
          <SelectItem value="Business">Business</SelectItem>
          <SelectItem value="Sports">Sports</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={selectedStatus}
        onValueChange={(value) => dispatch(setSelectedStatus(value))}
      >
        <SelectTrigger className="border-yellow-500">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Events</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="past">Past</SelectItem>
          <SelectItem value="ended">Ended Today</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-yellow-500",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => dispatch(setSelectedDate(date))}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select
        value={selectedTime}
        onValueChange={(value) => dispatch(setSelectedTime(value))}
      >
        <SelectTrigger className="border-yellow-500">
          <SelectValue placeholder="Filter by time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any Time</SelectItem>
          <SelectItem value="09:00">9:00 AM</SelectItem>
          <SelectItem value="14:00">2:00 PM</SelectItem>
          <SelectItem value="18:00">6:00 PM</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={selectedPriceFilter}
        onValueChange={(value) => dispatch(setSelectedPriceFilter(value))}
      >
        <SelectTrigger className="border-yellow-500">
          <SelectValue placeholder="Filter by price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Events</SelectItem>
          <SelectItem value="isFree">Free Events</SelectItem>
          <SelectItem value="paid">Paid Events</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="space-y-6">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="mb-4 border-yellow-500">
              <Menu className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Event Filters</SheetTitle>
              <SheetDescription>
                Apply filters to find the events you're looking for
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
          <FiltersContent />
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] animate-scale-in">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Make changes to the event details below
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={editingEvent.title}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editingEvent.description}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={editingEvent.time}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, time: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={editingEvent.location}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      location: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={editingEvent.category}
                  onValueChange={(value) =>
                    setEditingEvent({ ...editingEvent, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Attendees</label>
                <Input
                  type="number"
                  value={editingEvent.attendees}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      attendees: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2 flex items-center gap-3">
                <label>Free</label>
                <Switch
                  checked={editingEvent.isFree}
                  onCheckedChange={(value) => {
                    setEditingEvent({
                      ...editingEvent,
                      isFree: value,
                    });
                  }}
                />
              </div>
              {!editingEvent.isFree && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <Input
                    type="number"
                    value={editingEvent.price}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        price: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setEditingEvent(null);
              }}
              className="border-yellow-500 hover:bg-yellow-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSubmit}
              className="bg-black hover:bg-gray-900"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents &&
          filteredEvents.length > 0 &&
          filteredEvents.map((event, index) => {
            const status = getEventStatus(event.date, event.time);
            const statusColors = {
              upcoming: "bg-yellow-100 text-yellow-800",
              ongoing: "bg-green-100 text-green-800",
              today: "bg-yellow-100 text-yellow-800",
              past: "bg-gray-100 text-gray-800",
              ended: "bg-red-100 text-red-800",
            };

            // @ts-expect-error time
            const isAttending = userEvents?.includes(
              event?._id.toString() || ""
            );

            return (
              <Card
                key={event._id}
                className={`transition-all duration-300 hover:scale-105 animate-fade-in border-2 border-yellow-500`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: `fade-in 0.5s ease-out ${index * 100}ms forwards`,
                }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="relative group transition-colors duration-200 hover:text-yellow-600">
                      <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-yellow-500 after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
                        {event.title}
                      </span>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${statusColors[status]}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      {isAdmin && (
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(event)}
                            className="transition-transform duration-200 hover:scale-110 hover:text-yellow-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(event.id)}
                            className="transition-transform duration-200 hover:scale-110"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <CardDescription className="transition-colors duration-200">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-500 transition-colors duration-200 hover:text-gray-700">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {event.date} {event.time}
                    </div>
                    <div className="flex items-center text-gray-500 transition-colors duration-200 hover:text-gray-700">
                      <MapPin className="mr-2 h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-500 transition-colors duration-200 hover:text-gray-700">
                      <Users className="mr-2 h-4 w-4" />
                      {event.attendees} attendees
                    </div>
                    <div className="flex items-center text-gray-500 transition-colors duration-200 hover:text-gray-700">
                      <IndianRupee className="mr-2 h-4 w-4" />
                      {!event.price ? (
                        <span className="text-green-600 font-semibold">
                          Free
                        </span>
                      ) : (
                        <span>{event.price}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    className="flex-1 bg-black hover:bg-gray-900 transition-all duration-300"
                    onClick={() =>
                      (window.location.href = `/events/${event._id}`)
                    }
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    disabled={working}
                    className={cn(
                      "transition-all duration-300",
                      isAttending
                        ? "border-red-500 hover:bg-red-50 text-red-500"
                        : "border-yellow-500 hover:bg-yellow-50"
                    )}
                    onClick={() => {
                      // @ts-expect-error time
                      handleAttendance({ id: event._id, inc: !isAttending });
                    }}
                  >
                    {isAttending ? (
                      <>
                        <UserMinus className="h-4 w-4 mr-2" /> Cancel
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" /> Attend
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Events;
