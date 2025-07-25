import { memo } from "react";
import SignupForm from "@/components/signup-form";

const SignupPage = () => {
  return (
    <div
      className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 
        bg-muted bg-cover bg-center bg-no-repeat
        bg-[url('https://i.ibb.co/chjrSzrp/auth-bg-image.webp')]"
    >
      <div className="absolute inset-0 bg-muted/30 dark:bg-muted/80 backdrop-blur-xs" />

      <div className="relative z-10 flex w-full max-w-lg flex-col gap-6">
        <img
          src="https://i.ibb.co/233vjvFm/large-logo.webp"
          alt="BudgeX-logo"
          className="self-center h-12"
          loading="lazy"
        />

        <SignupForm />
      </div>
    </div>
  );
};

export default memo(SignupPage);
