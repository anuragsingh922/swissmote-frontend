import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { fetchUser } from "../store/userSlice.js";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setCurrentUser } from "@/store/eventSlice.js";
import { useState } from "react";
import { fetchEvents } from "@/store/eventSlice.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [loggin, setloggin] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setloggin(true);
    dispatch(fetchUser(data))
      .unwrap()
      .then(() => {
        // console.log("Data : ", data);
        toast({
          title: "Success",
          description: "You have successfully logged in!",
        });
        setloggin(false);
        dispatch(setCurrentUser({ id: "dummy", role: "admin" }));
        dispatch(fetchEvents());
        navigate("/events");
      });
  };

  const handleGuestLogin = () => {
    toast({
      title: "Guest Access",
      description: "You are now browsing as a guest",
    });
    navigate("/events");
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Login to your account to manage your events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!loggin ? (
              <Button type="submit" id="loginbtn" className="w-full">
                Login
              </Button>
            ) : (
              <Button className="w-full">
                <Loader2 className="animate-spin" />
              </Button>
            )}
          </form>
        </Form>

        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">Don't have an account?</p>
        <Link
          to="/register"
          className="text-sm font-medium text-primary hover:underline inline-flex items-center"
        >
          Register
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Login;
