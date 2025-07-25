import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardContent className="py-12">
          <div className="flex flex-col items-center gap-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <h1 className="text-3xl font-bold tracking-tight">
              <span>Page Not Found</span>
              <br />
              <span>Error 404</span>
            </h1>
            <p className="text-muted-foreground">
              The page you were looking for appears to have been moved, deleted
              or does not exist.
            </p>
            <Button
              className="bg-indigo-600 text-white w-[70%] hover:bg-indigo-700 cursor-pointer mt-4"
              onClick={() => navigate("/")}
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorPage;
