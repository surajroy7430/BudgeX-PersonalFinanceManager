import { cn } from "@/lib/utils";
import { memo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";

const formSchema = z.object({
  name: z.string().trim().min(3),
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

const SignupForm = ({ className, ...props }) => {
  const { setSignupInProgress } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        setSignupInProgress(true);

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          email: data.email,
          name: data.name,
        });

        await signOut(auth);

        form.reset();
        toast.success("Signup successful!", { duration: 1200 });

        setSignupInProgress(false);

        navigate("/signin", { replace: true });
      } catch (error) {
        setSignupInProgress(false);
        toast.error(error.message);
      }
    },
    [form, navigate, setSignupInProgress]
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-card/80 shadow-xl backdrop-blur-md backdrop-saturate-150 transition-all duration-300">
        <CardHeader className="text-center mb-3">
          <CardTitle className="text-xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Signup by entering your details below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Min 3 Characters"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 8 Characters"
                            autoComplete="off"
                            {...field}
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onContextMenu={(e) => e.preventDefault()}
                            className="pr-10 selection:bg-transparent"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                            className="absolute right-1 top-1/2 -translate-y-1/2 shadow-none hover:bg-accent/0 dark:hover:!bg-accent/0"
                          >
                            {showPassword ? (
                              <EyeOff size={5} />
                            ) : (
                              <Eye size={5} />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="default"
                  className="w-full cursor-pointer py-5.5"
                >
                  Signup
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-muted-foreground/70 hover:text-primary underline underline-offset-3"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(SignupForm);
