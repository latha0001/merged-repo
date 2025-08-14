
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/terms", label: "Terms & Raffle Rules" },
  { to: "/faq", label: "FAQ" },
  { to: "/admin", label: "Admin" },
];

export default function NavBar() {
  const location = useLocation();
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-green-400 shadow flex items-center px-8 h-16">
      <div className="font-bold text-white text-2xl flex-grow">TheTop36.com</div>
      <div className="flex gap-6">
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "text-white font-medium hover:underline underline-offset-4 transition",
              location.pathname === item.to ? "underline" : ""
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
