import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/useMobile";
import { Button } from "@/components/ui/button";
import ThemeToggler from "../../components/theme-toggler";

const smallLogo = "https://i.ibb.co/zhBGdXDW/small-logo.webp";
const largeLogo = "https://i.ibb.co/233vjvFm/large-logo.webp";

const LandingPage = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const logoUrl = isMobile ? smallLogo : largeLogo;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background border-b shadow-lg">
        <div className="flex  items-center justify-between gap-4 py-2.5 px-4 sm:px-6">
          {/* Logo */}
          <img
            src={logoUrl}
            alt="BudgeX"
            className="h-10 md:h-12"
            loading="lazy"
          />

          <nav className="flex items-center justify-center gap-2 sm:gap-3">
            <div className="shrink-0">
              <ThemeToggler />
            </div>
            {user ? (
              <Button asChild variant="default" className="px-6 sm:px-8">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" className="px-3 sm:px-5">
                  <Link to="/signin">Sign in</Link>
                </Button>
                <Button asChild variant="default" className="px-3 sm:px-5">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-28 px-4 sm:px-6 lg:px-20">
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-5 sm:gap-10">
          {/* Text Section */}
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
              <span className="text-primary font-bold">The easiest way </span>
              <br />
              <span className="text-muted-foreground">
                to manage your finances
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-muted-foreground/80">
              Track income, budget smartly, and reach your financial goals
              faster with BudgeX.
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full max-w-md">
            <img
              src="https://i.ibb.co/2YLBZ852/financial-management.webp"
              alt="Finance Illustration"
              className="w-full dark:opacity-55"
              loading="lazy"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
