
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppSidebar from "@/components/layout/AppSidebar";
import Footer from "@/components/layout/Footer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Equipment from "@/pages/Equipment";
import EquipmentMaintenance from "@/pages/EquipmentMaintenance";
import NewEquipment from "@/pages/NewEquipment";
import MaintenanceCalendar from "@/pages/MaintenanceCalendar";
import Missions from "@/pages/Missions";
import MissionDetails from "@/pages/MissionDetails";
import NewMission from "@/pages/NewMission";
import Users from "@/pages/Users";
import Skills from "@/pages/Skills";
import StudentProgress from "@/pages/StudentProgress";
import Stocks from "@/pages/Stocks";
import Settings from "@/pages/Settings";

import { Toaster } from "@/components/ui/sonner";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <SidebarInset className="pb-12">
            <div className="container px-4 py-6 md:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/equipment/:id" element={<EquipmentMaintenance />} />
                <Route path="/equipment/new" element={<NewEquipment />} />
                <Route path="/maintenance" element={<MaintenanceCalendar />} />
                <Route path="/missions" element={<Missions />} />
                <Route path="/missions/:id" element={<MissionDetails />} />
                <Route path="/missions/new" element={<NewMission />} />
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/users" element={<Users />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/student-progress" element={<StudentProgress />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </SidebarInset>
          <Toaster />
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
