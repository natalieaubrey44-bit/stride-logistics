import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const getStoredTheme = () => localStorage.getItem("theme") || "light";

export default function Navbar() {
  const [theme, setTheme] = useState(getStoredTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminDashboard = location.pathname === "/sl-portal/dashboard";

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/sl-portal", { replace: true });
    } catch {
      navigate("/sl-portal", { replace: true });
    }
  };

  const renderThemeIcon = () =>
    theme === "light" ? (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.8 6.8 0 1 0 9.8 9.8Z" />
      </svg>
    ) : (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );

  const navClassName = `site-nav${scrolled ? " scrolled" : ""}${isAdminDashboard ? " admin-nav" : ""}`;
  const isActive = (path) => location.pathname === path;

  if (isAdminDashboard) {
    return (
      <nav className={navClassName}>
        <Link
          className="wordmark"
          to="/sl-portal/dashboard"
          aria-label="Stride Logistics Admin"
        >
          <span>STRIDE</span>
          <span>LOGISTICS</span>
          <span className="admin-label">ADMIN</span>
        </Link>
        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {renderThemeIcon()}
          </button>
          <button className="btn btn-danger btn-small" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className={navClassName}>
      <Link className="wordmark" to="/" aria-label="Stride Logistics home">
        <span>STRIDE</span>
        <span>LOGISTICS</span>
      </Link>
      <div className={`nav-links${menuOpen ? " open" : ""}`}>
        <Link
          className={isActive("/") ? "active" : ""}
          aria-current={isActive("/") ? "page" : undefined}
          to="/"
        >
          Home
        </Link>
        <Link
          className={isActive("/track") ? "active" : ""}
          aria-current={isActive("/track") ? "page" : undefined}
          to="/track"
        >
          Track
        </Link>
        <Link
          className={isActive("/contact") ? "active" : ""}
          aria-current={isActive("/contact") ? "page" : undefined}
          to="/contact"
        >
          Contact
        </Link>
      </div>
      <div className="nav-actions">
        <button
          className="icon-button theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {renderThemeIcon()}
        </button>
        <button
          className={`menu-toggle${menuOpen ? " open" : ""}`}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
