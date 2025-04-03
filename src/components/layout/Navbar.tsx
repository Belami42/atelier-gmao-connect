
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
  CalendarRange
} from "lucide-react";
import useMobile from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobile();

  // Close the menu when navigating or changing view size
  useEffect(() => {
    setIsOpen(false);
  }, [location, isMobile]);

  const navLinks = [
    { path: "/dashboard", text: "Tableau de bord", icon: <Gauge className="w-5 h-5" /> },
    { path: "/equipment", text: "Équipements", icon: <Wrench className="w-5 h-5" /> },
    { path: "/maintenance", text: "Maintenance", icon: <CalendarRange className="w-5 h-5" /> },
    { path: "/missions", text: "Missions", icon: <ClipboardList className="w-5 h-5" /> },
    { path: "/skills", text: "Compétences", icon: <BarChart className="w-5 h-5" /> },
    { path: "/student-progress", text: "Suivi élèves", icon: <GraduationCap className="w-5 h-5" /> },
    { path: "/users", text: "Utilisateurs", icon: <Users className="w-5 h-5" /> },
    { path: "/settings", text: "Paramètres", icon: <Cog className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 z-40 w-full bg-white/80 backdrop-blur-sm dark:bg-gray-950/80 border-b">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-8 h-8 mr-2"
              />
              <span className="text-xl font-bold tech-gradient bg-clip-text text-transparent">
                MSPC-GMAO
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive(link.path) ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-b pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="block">
                <Button
                  variant={isActive(link.path) ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start gap-2"
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
