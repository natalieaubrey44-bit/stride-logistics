import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminDashboard = location.pathname === "/sl-portal/dashboard";

  // Theme toggle removed per request; site uses default styles

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // no-op for theme

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/sl-portal", { replace: true });
    } catch {
      navigate("/sl-portal", { replace: true });
    }
  };

  // theme icon removed

  const navClassName = `site-nav${scrolled ? " scrolled" : ""}${isAdminDashboard ? " admin-nav" : ""}`;
  const isActive = (path: string) => location.pathname === path;
  if (isAdminDashboard) {
    return (
      <nav className={navClassName}>
        <Link
          className="wordmark"
          to="/sl-portal/dashboard"
          aria-label="Stride Logistics Admin"
        >
          <span className="wordmark-text">Stride Logistics</span>
          <span className="admin-label">ADMIN</span>
        </Link>
        <div className="nav-actions">
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
        <span className="wordmark-text">Stride Logistics</span>
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
