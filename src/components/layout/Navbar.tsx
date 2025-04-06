
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Gauge, 
  Cog, 
  Wrench, 
  ClipboardList, 
  Users,
  BarChart,
  GraduationCap, 
  CalendarRange,
  PackageSearch,
} from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobile();

  useEffect(() => {
    setIsOpen(false);
  }, [location, isMobile]);

  // Reordered navigation links as requested
  const navLinks = [
    { path: "/dashboard", text: "Tableau de bord", icon: <Gauge className="w-5 h-5" /> },
    { path: "/missions", text: "Missions", icon: <ClipboardList className="w-5 h-5" /> },
    { path: "/maintenance", text: "Maintenance", icon: <CalendarRange className="w-5 h-5" /> },
    { path: "/equipment", text: "Équipements", icon: <Wrench className="w-5 h-5" /> },
    { path: "/stocks", text: "Stocks", icon: <PackageSearch className="w-5 h-5" /> },
    { path: "/student-progress", text: "Suivi élèves", icon: <GraduationCap className="w-5 h-5" /> },
    { path: "/users", text: "Utilisateurs", icon: <Users className="w-5 h-5" /> },
    { path: "/skills", text: "Compétences", icon: <BarChart className="w-5 h-5" /> },
    { path: "/settings", text: "Paramètres", icon: <Cog className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 z-40 w-full bg-indigo-900 dark:bg-gray-950 border-b border-indigo-700">
      <div className="px-4 mx-auto max-w-full">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-8 h-8 mr-2"
              />
              <span className="text-xl font-bold text-white">
                MSPC-GMAO
              </span>
            </Link>
          </div>

          <div className="hidden lg:block overflow-x-auto">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive(link.path) ? "default" : "ghost"}
                    size="sm"
                    className={`gap-2 whitespace-nowrap ${isActive(link.path) ? 'bg-indigo-700 text-white hover:bg-indigo-600' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}`}
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-white hover:bg-indigo-800"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-indigo-900 dark:bg-gray-950 border-b border-indigo-700 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="block">
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start gap-2 ${isActive(link.path) ? 'bg-indigo-700 text-white hover:bg-indigo-600' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}`}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
