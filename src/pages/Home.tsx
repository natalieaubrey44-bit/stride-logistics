import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import CountUp from "../components/CountUp";

const services = [
  {
    title: "Sea Freight",
    imageClass: "service-card-image-sea",
    body: "Full and partial container loads coordinated across major port lanes with customs-ready documentation.",
    meta: "FCL / LCL / Port coordination",
  },
  {
    title: "Air Freight",
    imageClass: "service-card-image-air",
    body: "Priority air movement for time-sensitive cargo where missed windows carry real business cost.",
    meta: "Urgent cargo / Airport handling",
  },
  {
    title: "Road Freight",
    imageClass: "service-card-image-road",
    body: "Door-to-door regional haulage built for predictable handoffs, updates, and delivery accountability.",
    meta: "Last mile / Cross-border road",
  },
];

const processSteps = [
  {
    label: "01",
    icon: "\uD83D\uDCCB",
    title: "Place Your Booking",
    body: "Fill out our contact form with your cargo details, origin, and destination.",
  },
  {
    label: "02",
    icon: "\uD83D\uDCE6",
    title: "We Collect Your Cargo",
    body: "Our team arranges collection from your location at a confirmed time.",
  },
  {
    label: "03",
    icon: "\u2708\uFE0F",
    title: "Your Shipment Moves",
    body: "Your cargo travels by the fastest available air, sea, or road route.",
  },
  {
    label: "04",
    icon: "\uD83D\uDD0D",
    title: "Track Every Update",
    body: "Use your unique tracking number to follow each shipment status update.",
  },
  {
    label: "05",
    icon: "\u2705",
    title: "Delivered",
    body: "Your cargo arrives at its destination. Confirmation sent to you directly.",
  },
];

const whyStrideBullets = [
  "No account needed - track your shipment with just a code",
  "Direct customs handling support on every international shipment",
  "Air, sea, and road coverage across 40+ countries",
  "Personal updates from our team - not bots, not automated delays",
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

const staggerDelays = [
  "delay-120",
  "delay-200",
  "delay-280",
  "delay-360",
  "delay-440",
  "delay-520",
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
              YOUR CARGO,
              <br />
              <span>DELIVERED WORLDWIDE.</span>
            </h1>
            <p className="animate-fade-in delay-140">
              Stride Logistics moves parcels and freight by air, sea, and road
              - across borders, through customs, and to the door.
            </p>
            <div className="hero-actions animate-scale-in delay-280">
              <Link className="btn btn-primary" to="/contact">
                Ship With Us
              </Link>
              <Link className="btn btn-secondary" to="/track">
                Track Your Shipment
              </Link>
            </div>
          </div>

          <aside
            className="hero-ops-card animate-fade-in delay-320"
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
        <div className="container stats-grid animate-fade-in delay-220">
          <CountUp
            end={200}
            prefix="1,"
            suffix="+"
            label="Shipments Delivered"
          />
          <CountUp end={98} suffix=".4%" label="On-Time Delivery Rate" />
          <CountUp end={40} suffix="+" label="Countries Reached" />
          <CountUp end={5} suffix="+" label="Years in Operation" />
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
                className={`service-card animate-fade-up ${staggerDelays[index]}`}
                key={service.title}
              >
                <div
                  className={`service-card-image ${service.imageClass}`}
                  aria-hidden="true"
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
        <div className="container">
          <div className="section-heading process-heading animate-fade-in delay-180">
            <h2 className="section-title">HOW IT WORKS</h2>
          </div>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <article
                className={`process-step animate-fade-up ${staggerDelays[index + 1]}`}
                key={step.label}
              >
                <span className="process-step-watermark" aria-hidden="true">
                  {step.label}
                </span>
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

      <section className="section why-section">
        <div className="container why-grid">
          <div>
            <span className="eyebrow">Why Stride</span>
            <h2>SHIP WITH MORE CERTAINTY.</h2>
            <p>
              Most couriers leave you guessing. Stride gives every customer a
              tracking number, a direct line to our team, and status updates
              that actually mean something - from dispatch to doorstep.
            </p>
          </div>
          <div>
            <ul className="why-list" aria-label="Why customers choose Stride">
              {whyStrideBullets.map((bullet) => (
                <li key={bullet}>
                  <span aria-hidden="true">{"\u2713"}</span>
                  {bullet}
                </li>
              ))}
            </ul>
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
                className={`industry-card animate-fade-in ${staggerDelays[index]}`}
                key={industry.title}
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
                className={`testimonial-card animate-fade-up ${staggerDelays[index + 1]}`}
                key={testimonial.name}
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
          <div className="animate-fade-in delay-180">
            <h2>READY TO SHIP?</h2>
            <p>
              Get in touch with our team and we'll handle the rest - from
              collection to delivery, anywhere in the world.
            </p>
          </div>
          <div className="cta-actions animate-fade-in delay-260">
            <Link className="btn btn-cta" to="/contact">
              Ship With Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
