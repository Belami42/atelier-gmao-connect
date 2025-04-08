
import { Link, useLocation } from "react-router-dom";
import { Gauge, ClipboardList, CalendarRange, Wrench, PackageSearch, BarChart, GraduationCap, FileText } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator } from "@/components/ui/sidebar";

const AppSidebar = () => {
  const location = useLocation();
  const mainMenuItems = [
    {
      path: "/dashboard",
      text: "Tableau de bord",
      icon: <Gauge className="w-5 h-5" />
    }, 
    {
      path: "/missions",
      text: "Ordres de travail",
      icon: <ClipboardList className="w-5 h-5" />
    }, 
    {
      path: "/maintenance",
      text: "Maintenance préventive",
      icon: <CalendarRange className="w-5 h-5" />
    }, 
    {
      path: "/equipment",
      text: "Équipements",
      icon: <Wrench className="w-5 h-5" />
    }, 
    {
      path: "/stocks",
      text: "Stocks",
      icon: <PackageSearch className="w-5 h-5" />
    }
  ];
  
  const referentielItems = [
    {
      path: "/skills",
      text: "Compétences",
      icon: <BarChart className="w-5 h-5" />
    }, 
    {
      path: "/student-progress",
      text: "Suivi élèves",
      icon: <GraduationCap className="w-5 h-5" />
    }, 
    {
      path: "/missions",
      text: "Rapports d'intervention",
      icon: <FileText className="w-5 h-5" />
    }
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <Sidebar side="left" variant="sidebar">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <img 
            alt="Logo Etienne Mimard" 
            className="h-8 w-auto" 
            src="/lovable-uploads/a80dc935-64bb-4875-bbaf-5dd7f1c4ab9c.png" 
          />
          <span className="text-xl font-bold">MSPC-GMAO</span>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold uppercase">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map(item => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton isActive={isActive(item.path)} size="default" tooltip={item.text} asChild>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.text}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold uppercase">Référentiel Bac Pro MSPC</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {referentielItems.map(item => (
                <SidebarMenuItem key={`${item.path}-${item.text}`}>
                  <SidebarMenuButton isActive={isActive(item.path)} size="default" tooltip={item.text} asChild>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.text}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
