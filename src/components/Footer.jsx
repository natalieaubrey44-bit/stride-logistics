import { Link } from 'react-router-dom';

const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Network coverage', to: '/' },
      { label: 'Industries served', to: '/' }
    ]
  },
  {
    title: 'Services',
    links: [
      { label: 'Sea freight', to: '/' },
      { label: 'Air freight', to: '/' },
      { label: 'Road freight', to: '/' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Track shipment', to: '/track' },
      { label: 'Request quote', to: '/contact' },
      { label: 'Talk to operations', to: '/contact' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <Link className="footer-wordmark" to="/" aria-label="Stride Logistics home">
            <span>STRIDE</span>
            <span>LOGISTICS</span>
          </Link>
          <p>
            Precision freight coordination for teams that need cargo moving with clarity, accountability, and calm.
          </p>
          <div className="footer-badges" aria-label="Stride Logistics trust signals">
            <span>Customs-ready</span>
            <span>Insured cargo support</span>
            <span>24h response</span>
          </div>
        </div>

        <div className="footer-columns">
          {footerColumns.map((column) => (
            <nav className="footer-links" aria-label={`${column.title} links`} key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map((link) => (
                <Link to={link.to} key={link.label}>{link.label}</Link>
              ))}
            </nav>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; 2026 Stride Logistics. All rights reserved.</p>
        <p>Air, sea, and road freight coordination across priority trade lanes.</p>
      </div>
    </footer>
  );
}
