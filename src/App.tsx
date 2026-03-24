import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KivuliProvider } from "@/context/KivuliContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Factory from "./pages/Factory";
import Forensics from "./pages/Forensics";
import Sinkholes from "./pages/Sinkholes";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <KivuliProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/factory" element={<Factory />} />
                <Route path="/forensics" element={<Forensics />} />
                <Route path="/sinkholes" element={<Sinkholes />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </KivuliProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
