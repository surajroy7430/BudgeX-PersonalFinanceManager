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
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";

const formSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

const LoginForm = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        form.reset();
        toast.success("Logged in successfully!", { duration: 1500 });

        if (userSnap.exists()) navigate("/dashboard");
      } catch (error) {
        toast.error(error.message);
      }
    },
    [form, navigate]
  );

  const handleGoogleLogin = useCallback(async () => {
    let provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const result = await signInWithRedirect(auth, provider);
      const googleUser = result.user;

      const userRef = doc(db, "users", googleUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: googleUser.displayName || "User",
          email: googleUser.email,
        });
      }

      toast.success("Logged in with Google!", { duration: 1500 });
      if (userSnap.exists()) navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  }, [navigate]);

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="bg-card/80 shadow-xl backdrop-blur-md backdrop-saturate-150 transition-all duration-300">
        <CardHeader className="text-center mb-3">
          <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Please enter your details to sign in
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
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
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
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
                  variant="default"
                  type="submit"
                  className="w-full cursor-pointer py-5.5"
                >
                  Sign In
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card/80 dark:bg-card/0 text-muted-foreground relative rounded z-10 px-2 py-0.5">
                    OR
                  </span>
                </div>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full p-5"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                  >
                    <path
                      fill="#fbbb00"
                      d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
                        c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
                        C103.821,274.792,107.225,292.797,113.47,309.408z"
                    />
                    <path
                      fill="#518ef8"
                      d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
                        c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
                        c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                    />
                    <path
                      fill="#28b446"
                      d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
                        c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
                        c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                    />
                    <path
                      fill="#f14336"
                      d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
                        c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
                        C318.115,0,375.068,22.126,419.404,58.936z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </Button>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-muted-foreground/70 hover:text-primary underline underline-offset-3"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(LoginForm);
