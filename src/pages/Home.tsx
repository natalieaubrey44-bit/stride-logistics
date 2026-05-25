import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import CountUp from "../components/CountUp";

const services = [
  {
    title: "Sea Freight",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80",
    body: "Full and partial container loads coordinated across major port lanes with customs-ready documentation.",
    meta: "FCL / LCL / Port coordination",
  },
  {
    title: "Air Freight",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80",
    body: "Priority air movement for time-sensitive cargo where missed windows carry real business cost.",
    meta: "Urgent cargo / Airport handling",
  },
  {
    title: "Road Freight",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80",
    body: "Door-to-door regional haulage built for predictable handoffs, updates, and delivery accountability.",
    meta: "Last mile / Cross-border road",
  },
];

const processSteps = [
  {
    label: "01",
    title: "Plan the lane",
    body: "We confirm cargo requirements, route constraints, documentation needs, and delivery priorities before movement begins.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2C8.134 2 5 5.134 5 9c0 4.25 6.38 11.653 6.74 12.066a1 1 0 0 0 1.52 0C12.62 20.653 19 13.25 19 9c0-3.866-3.134-7-7-7Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: "02",
    title: "Coordinate the move",
    body: "Stride aligns freight partners, customs support, pickup windows, and transfer checkpoints around one operating plan.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
        <path d="M5 19V5" />
      </svg>
    ),
  },
  {
    label: "03",
    title: "Keep visibility clear",
    body: "Customers receive simple tracking visibility and direct support when a shipment status needs context.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const industries = [
  {
    title: "Retail & ecommerce",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 8h16v11H4z" />
        <path d="M8 8V5h8v3" />
        <path d="M9 13h6" />
      </svg>
    ),
  },
  {
    title: "Industrial equipment",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 16h18v5H3z" />
        <path d="M6 16v-4" />
        <path d="M10 12v4" />
        <path d="M14 10v6" />
        <path d="M18 12v4" />
      </svg>
    ),
  },
  {
    title: "Automotive parts",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3" />
        <path d="M12 19v3" />
        <path d="M2 12h3" />
        <path d="M19 12h3" />
      </svg>
    ),
  },
  {
    title: "Healthcare supplies",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="4" width="12" height="16" rx="3" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    title: "Consumer goods",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="7" width="14" height="10" rx="2" />
        <path d="M5 11h14" />
        <path d="M8 7V4h8v3" />
      </svg>
    ),
  },
  {
    title: "Project cargo",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 18h18" />
        <path d="M4 18l2-6h12l2 6" />
        <path d="M8 12V6" />
        <path d="M16 12V6" />
        <path d="M10 6h4" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote:
      "Stride gave our operations team the one thing we needed most: direct answers before our freight became a problem.",
    name: "Maya Chen",
    role: "Supply Chain Director, Northstar Goods",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
  },
  {
    quote:
      "Their updates are concise, their handoffs are clean, and our team always knows who owns the next step.",
    name: "Bobby Brown",
    role: "Import Manager, BlueGate Trading",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80",
  },
  {
    quote:
      "We chose Stride because they remove the doubt ahead of movement — and they keep our partners aligned without noise.",
    name: "Lena Morales",
    role: "Operations Lead, Harborline Distribution",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <SEO
        title="Stride Logistics | Premium Freight Coordination"
        description="Stride Logistics coordinates air, sea, and road freight with shipment visibility, customs-ready support, and responsive operations teams."
        path="/"
      />

      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">Enterprise freight coordination</span>
            <h1 className="animate-slide-up">
              FREIGHT MOVES BETTER
              <br />
              <span>WHEN EVERY HANDOFF IS CLEAR</span>
            </h1>
            <p className="animate-fade-in" style={{ animationDelay: "0.14s" }}>
              Stride Logistics coordinates air, sea, and road freight for
              businesses that cannot afford shipment uncertainty.
            </p>
            <div
              className="hero-actions animate-scale-in"
              style={{ animationDelay: "0.28s" }}
            >
              <Link className="btn btn-primary" to="/contact">
                Request Freight Quote
              </Link>
              <Link className="btn btn-secondary" to="/track">
                Track Shipment
              </Link>
            </div>
          </div>

          <aside
            className="hero-ops-card animate-fade-in"
            style={{ animationDelay: "0.32s" }}
            aria-label="Stride Logistics operating promise"
          >
            <span>Operations promise</span>
            <strong>Clear cargo movement from booking to delivery.</strong>
            <p>
              Route planning, partner coordination, customs support, and
              shipment visibility under one accountable team.
            </p>
          </aside>
        </div>
        <span className="scroll-indicator" aria-hidden="true" />
      </section>

      <section
        className="stats-band"
        aria-label="Stride Logistics performance stats"
      >
        <div
          className="container stats-grid animate-fade-in"
          style={{ animationDelay: "0.22s" }}
        >
          <CountUp end={500} suffix="+" label="Shipments Coordinated" />
          <CountUp end={98} suffix="%" label="On-Time Delivery Rate" />
          <CountUp end={18} label="Priority Trade Lanes" />
          <div className="stat-item">
            <span className="stat-number">&lt;24h</span>
            <span className="stat-label">Operations Response SLA</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading animate-fade-in">
            <span className="eyebrow">Freight services</span>
            <h2 className="section-title">WHAT WE MOVE</h2>
            <p>
              Mode-specific coordination for cargo that needs a practical route,
              clean documentation, and dependable follow-through.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <article
                className="service-card animate-fade-up"
                key={service.title}
                style={{ animationDelay: `${0.12 + index * 0.08}s` }}
              >
                <div
                  className="service-card-image"
                  aria-hidden="true"
                  style={{
                    backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.3), rgba(13, 27, 42, 0.3)), url(${service.image})`,
                  }}
                />
                <div className="service-card-content">
                  <span>{service.meta}</span>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container process-grid">
          <div
            className="process-intro animate-fade-in"
            style={{ animationDelay: "0.18s" }}
          >
            <span className="eyebrow">Shipment process</span>
            <h2>PRECISION FROM BOOKING TO DELIVERY</h2>
            <p>
              Premium logistics is not just movement. It is the discipline of
              removing ambiguity before cargo changes hands.
            </p>
          </div>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <article
                className="process-step animate-fade-up"
                key={step.label}
                style={{ animationDelay: `${0.16 + index * 0.08}s` }}
              >
                <div className="process-step-marker">
                  <span className="process-step-icon" aria-hidden="true">
                    {step.icon}
                  </span>
                  <span className="process-step-label">{step.label}</span>
                </div>
                <div className="process-step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section network-section">
        <div className="container network-grid">
          <div className="network-panel">
            <span className="eyebrow">Coverage network</span>
            <h2>PORTS, AIRPORTS, ROADS, AND RESPONSIBLE HANDOFFS.</h2>
            <p>
              Stride supports cargo movement across international port lanes,
              airport freight routes, customs checkpoints, and regional road
              networks.
            </p>
            <Link className="btn btn-primary" to="/contact">
              Plan a Shipment
            </Link>
          </div>
          <div
            className="coverage-card"
            aria-label="Stride coverage highlights"
          >
            <div>
              <strong>3</strong>
              <span>Continents covered</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Critical status monitoring</span>
            </div>
            <div>
              <strong>1</strong>
              <span>Accountable operations contact</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section industries-section">
        <div className="container">
          <div className="section-heading animate-fade-in">
            <span className="eyebrow">Industry coverage</span>
            <h2 className="section-title">BUILT FOR BUSINESS-CRITICAL CARGO</h2>
            <p>
              Stride supports freight teams that need predictability,
              documentation discipline, and clear customer-facing answers.
            </p>
          </div>
          <div className="industry-grid">
            {industries.map((industry, index) => (
              <div
                className="industry-card animate-fade-in"
                key={industry.title}
                style={{ animationDelay: `${0.12 + index * 0.08}s` }}
              >
                <span className="industry-icon" aria-hidden="true">
                  {industry.icon}
                </span>
                <h3>{industry.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section proof-section">
        <div className="container proof-grid">
          <div>
            <span className="eyebrow">Client proof</span>
            <h2>LOGISTICS TEAMS TRUST CLARITY.</h2>
            <p>
              Our service model is built around fewer surprises, faster answers,
              and shipment updates that operators can act on.
            </p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <article
                className="testimonial-card animate-fade-up"
                key={testimonial.name}
                style={{ animationDelay: `${0.16 + index * 0.08}s` }}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
                <div className="testimonial-copy">
                  <span className="quote-mark">"</span>
                  <p>{testimonial.quote}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section track-cta">
        <div className="container cta-grid">
          <div className="animate-fade-in" style={{ animationDelay: "0.18s" }}>
            <span className="eyebrow">Shipment visibility</span>
            <h2>KNOW WHERE YOUR CARGO IS</h2>
            <p>
              Enter your tracking number and get a simple, instant shipment
              status update.
            </p>
          </div>
          <div
            className="cta-actions animate-fade-in"
            style={{ animationDelay: "0.26s" }}
          >
            <Link className="btn btn-primary" to="/track">
              Track Shipment
            </Link>
            <Link className="btn btn-outline" to="/contact">
              Talk to Operations
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
