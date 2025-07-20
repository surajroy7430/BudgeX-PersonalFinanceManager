import { SignupForm } from "../components/signup-form";

export default function SignupPage() {
  return (
    <div
      className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/XkfsmH0Q/auth-bg-img.jpg')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-muted/30 backdrop-blur-xs" />

      <div className="relative z-10 flex w-full max-w-lg flex-col gap-6">
        <img
          src="https://i.ibb.co/q3dMmX2X/large-logo.png"
          alt="BudgeX-logo"
          className="self-center h-12"
        />

        <SignupForm />
      </div>
    </div>
  );
}
