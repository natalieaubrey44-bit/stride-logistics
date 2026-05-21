import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabaseClient';

const getStatusClass = (status) => {
  const statusMap = {
    Booked: 'status-booked',
    'In Transit': 'status-in-transit',
    'At Customs': 'status-at-customs',
    'In Wharf': 'status-in-wharf',
    Arrived: 'status-arrived',
    Delivered: 'status-delivered'
  };

  return statusMap[status] || 'status-booked';
};

export default function Track() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState(null);
  const [searched, setSearched] = useState(false);

  const trackingRegex = /^STR-[A-Z0-9]{5}$/;

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setShipment(null);
    setSearched(false);

    const trimmedInput = trackingNumber.trim().toUpperCase();

    // Client-side validation using regex
    if (!trackingRegex.test(trimmedInput)) {
      setError('Invalid format. Must be "STR-" followed by exactly 5 alphanumeric uppercase characters (e.g., STR-A3F9K).');
      return;
    }

    setLoading(true);

    try {
      // Query Supabase shipments table. eq() is parameterized by default.
      const { data, error: queryError } = await supabase
        .from('shipments')
        .select('*')
        .eq('tracking_number', trimmedInput)
        .single();

      if (queryError) {
        if (queryError.code === 'PGRST116') {
          // No rows returned
          setShipment(null);
        } else {
          setError('An error occurred while fetching the shipment details. Please try again.');
        }
      } else {
        setShipment(data);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <>
      <SEO
        title="Track Shipment | Stride Logistics"
        description="Track a Stride Logistics shipment with a valid STR tracking number and view the latest cargo status."
        path="/track"
      />
      <section className="track-page">
        <div className="container track-shell">
          <aside className="track-assurance">
            <span className="eyebrow">Shipment visibility</span>
            <h1>TRACK YOUR SHIPMENT</h1>
            <p>
              Enter your Stride tracking number for a clear status update from the operations workflow.
            </p>
            <div className="tracking-help-card">
              <h2>Where to find your code</h2>
              <p>Your tracking number appears in your shipment confirmation and follows the STR-XXXXX format.</p>
              <Link className="text-link" to="/contact">Need help from operations?</Link>
            </div>
            <div className="track-trust-list" aria-label="Tracking support assurances">
              <span>Secure lookup</span>
              <span>Status-note visibility</span>
              <span>Direct support available</span>
            </div>
          </aside>

          <div className="track-panel">
            <h2>Shipment Lookup</h2>
            <p className="track-subtitle">Enter your Stride tracking number below (format: STR-XXXXX)</p>

            <form className="track-form" onSubmit={handleSearch}>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number (e.g. STR-A3F9K)"
                disabled={loading}
              />
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Track'}
              </button>
            </form>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            {shipment && (
              <div className="result-card">
                <h2>Shipment Found</h2>
                <div className="detail-grid">
                  <div className="detail-row">
                    <span className="detail-label">Tracking Number</span>
                    <span className="detail-value">{shipment.tracking_number}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Customer Name</span>
                    <span className="detail-value">{shipment.customer_name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Origin</span>
                    <span className="detail-value">{shipment.origin}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Destination</span>
                    <span className="detail-value">{shipment.destination}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Current Status</span>
                    <span className={`status-badge ${getStatusClass(shipment.status)}`}>
                      {shipment.status}
                    </span>
                  </div>
                  {shipment.status_note && (
                    <div className="detail-row">
                      <span className="detail-label">Status Note</span>
                      <span className="detail-value">{shipment.status_note}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="detail-label">Last Updated</span>
                    <span className="detail-muted">{new Date(shipment.updated_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {searched && !shipment && !error && (
              <div className="empty-state">
                No shipment found for that tracking number. Please check and try again.
              </div>
              )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
