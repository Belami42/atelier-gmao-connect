import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Wrench, 
  Clipboard, 
  Award, 
  Users, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { name: "Tableau de bord", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { name: "Équipements", icon: <Wrench size={18} />, path: "/equipment" },
    { name: "Ordres de mission", icon: <Clipboard size={18} />, path: "/missions" },
    { name: "Compétences", icon: <Award size={18} />, path: "/skills" },
    { name: "Utilisateurs", icon: <Users size={18} />, path: "/users" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out py-4 px-6 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
      style={{ height: "var(--header-height)" }}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Link 
          to="/" 
          className="text-primary font-bold text-xl flex items-center gap-2 smooth-transition hover:opacity-80"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
            <div className="relative bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center">
              A
            </div>
          </div>
          <span>AtelierGMAO</span>
        </Link>

        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        )}

        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        )}

        {isMobile && (
          <div
            className={`fixed inset-0 bg-white/95 backdrop-blur-lg z-50 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ top: "var(--header-height)" }}
          >
            <nav className="flex flex-col p-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-all delay-${
                    index * 50
                  } ${
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  } ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                  }`}
                  style={{ 
                    transitionDelay: isOpen ? `${index * 50}ms` : "0ms"
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
