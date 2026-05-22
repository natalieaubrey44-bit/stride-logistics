import SEO from '../components/SEO';

export default function Terms() {
  return (
    <div className="container" style={{ padding: '6rem 1rem 4rem' }}>
      <SEO title="Terms & Conditions | Stride Logistics" />
      <h1>Terms & Conditions</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <br />
      <h2>1. Introduction</h2>
      <p>Welcome to Stride Logistics. These terms and conditions outline the rules and regulations for the use of our services.</p>
      <br />
      <h2>2. Services</h2>
      <p>We provide freight coordination across various trade lanes. By accessing our services, we assume you accept these terms and conditions.</p>
      <br />
      <h2>3. Liability</h2>
      <p>Stride Logistics is not liable for any delays caused by customs, weather, or other unforeseeable circumstances beyond our control.</p>
    </div>
  );
}
