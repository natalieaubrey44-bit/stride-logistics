import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <div className="container" style={{ padding: '6rem 1rem 4rem' }}>
      <SEO title="Privacy Policy | Stride Logistics" />
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <br />
      <h2>1. Information We Collect</h2>
      <p>We collect information to provide better services to all our users, including tracking data and contact information.</p>
      <br />
      <h2>2. How We Use Information</h2>
      <p>We use the information we collect to coordinate freight, maintain our operations, and protect Stride Logistics and our users.</p>
      <br />
      <h2>3. Data Sharing</h2>
      <p>We do not share your personal information with companies, organizations, or individuals outside of Stride Logistics except when necessary for freight coordination.</p>
    </div>
  );
}
