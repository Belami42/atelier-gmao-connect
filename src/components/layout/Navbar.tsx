
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, Wrench, CalendarDays, Send, Graduation, Users, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const location = useLocation();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const links = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/equipment", label: "Équipements", icon: Wrench },
    { href: "/maintenance-calendar", label: "Calendrier maintenance", icon: CalendarDays },
    { href: "/missions", label: "Missions", icon: Send },
    { href: "/skills", label: "Compétences", icon: Graduation },
    { href: "/users", label: "Utilisateurs", icon: Users },
  ];

  // Mobile navigation with Sheet component
  if (isMobile) {
    return (
      <header className="fixed w-full top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="font-bold text-lg flex items-center">
            {/* Logo and app name */}
            <Wrench className="mr-2 h-5 w-5" />
            <span>Smart Workshop</span>
          </Link>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-5 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center gap-3 text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    );
  }

  // Desktop navigation
  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="flex items-center justify-between p-4 container mx-auto">
        <Link to="/" className="font-bold text-lg flex items-center">
          <Wrench className="mr-2 h-5 w-5" />
          <span>Smart Workshop</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Button
                key={link.href}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={link.href} className="flex items-center gap-2">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
