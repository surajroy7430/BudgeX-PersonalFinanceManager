import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="scrollbar-thin scrollbar-thumb-zinc-500 scrollbar-track-zinc-800 h-screen overflow-y-auto">
      <AppRoutes />

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
