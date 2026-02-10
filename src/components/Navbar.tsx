import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";

const navItems = ["Home", "About", "Services", "Contact Us"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-gradient">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="text-foreground">AI Early <span className="text-gradient">Detector</span></span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact-us"
          className="hidden md:inline-flex rounded-lg bg-hero-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105"
        >
          Book Appointment
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border/50 px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-4">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact-us"
                className="inline-flex rounded-lg bg-hero-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Book Appointment
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
