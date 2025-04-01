
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Equipment from "./pages/Equipment";
import EquipmentMaintenance from "./pages/EquipmentMaintenance";
import NewEquipment from "./pages/NewEquipment";
import MaintenanceCalendar from "./pages/MaintenanceCalendar";
import Missions from "./pages/Missions";
import MissionDetails from "./pages/MissionDetails";
import NewMission from "./pages/NewMission";
import Skills from "./pages/Skills";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/equipment/:equipmentId/maintenance" element={<EquipmentMaintenance />} />
              <Route path="/equipment/new" element={<NewEquipment />} />
              <Route path="/maintenance-calendar" element={<MaintenanceCalendar />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/missions/:id" element={<MissionDetails />} />
              <Route path="/missions/new" element={<NewMission />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
