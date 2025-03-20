
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudyMaterials from "./pages/StudyMaterials";
import Forums from "./pages/Forums";
import Roadmaps from "./pages/Roadmaps";
import Mentorship from "./pages/Mentorship";
import Profile from "./pages/Profile";
import StudyPartner from "./pages/StudyPartner";
import ConnectDoctors from "./pages/ConnectDoctors";
import Institution from "./pages/Institution";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/study-materials" element={<StudyMaterials />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/study-partner" element={<StudyPartner />} />
          <Route path="/connect-doctors" element={<ConnectDoctors />} />
          <Route path="/institution" element={<Institution />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
