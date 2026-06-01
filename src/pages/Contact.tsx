import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { sanitizeInput } from '../lib/sanitize';

type ContactFormData = {
  fullName: string;
  email: string;
  origin: string;
  destination: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    origin: '',
    destination: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (!formData.fullName.trim() ||
        !formData.email.trim() ||
        !formData.origin.trim() ||
        !formData.destination.trim() ||
        !formData.message.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    const sanitizedData = {
      fullName: sanitizeInput(formData.fullName.trim()),
      email: sanitizeInput(formData.email.trim()),
      origin: sanitizeInput(formData.origin.trim()),
      destination: sanitizeInput(formData.destination.trim()),
      message: sanitizeInput(formData.message.trim())
    };

    setFormData(sanitizedData);
    setNotice('Online inquiry submission is not connected yet. Please contact the operations team directly with these details.');
  };

  return (
    <>
      <SEO
        title="Request Freight Quote | Stride Logistics"
        description="Contact Stride Logistics to plan air, sea, or road freight with responsive operations support."
        path="/contact"
      />
      <section className="contact-page">
        <div className="contact-visual">
          <div>
            <span className="eyebrow">Request freight support</span>
            <h1>
              LET'S MOVE
              <br />
              YOUR CARGO
            </h1>
            <p>Share your route, timeline, and cargo details. Our operations team will respond within 24 hours.</p>
            <div className="contact-proof-list" aria-label="Contact response promises">
              <span>Quote guidance</span>
              <span>Customs-ready planning</span>
              <span>Human operations support</span>
            </div>
          </div>
        </div>

        <div className="contact-form-wrap">
          <div className="contact-form-panel">
            <span className="eyebrow">Booking inquiry</span>
            <h2>Tell us what needs to move</h2>
            <p className="form-intro">
              Include cargo type, weight, dimensions, pickup window, delivery deadline, and any documentation requirements.
            </p>

            {notice && (
              <div className="alert alert-success">
                {notice}
              </div>
            )}

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="origin">Origin *</label>
                  <input
                    id="origin"
                    type="text"
                    name="origin"
                    autoComplete="address-level2"
                    value={formData.origin}
                    onChange={handleChange}
                    placeholder="e.g. New York, USA"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="destination">Destination *</label>
                  <input
                    id="destination"
                    type="text"
                    name="destination"
                    autoComplete="shipping address-level2"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. London, UK"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Message / Details *</label>
                <textarea
                  id="message"
                  name="message"
                  autoComplete="off"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your cargo (weight, dimensions, cargo type)..."
                  rows={5}
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit">
                Review Inquiry
              </button>
            </form>

            <div className="contact-support-grid">
              <article>
                <h3>Operations desk</h3>
                <p>Responses within 24 hours for quote requests and routing questions.</p>
              </article>
              <article>
                <h3>Shipment details</h3>
                <p>Share origin, destination, cargo dimensions, urgency, and documentation needs.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
