import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabaseClient';
import { generateTrackingNumber } from '../lib/generateTracking';

const STATUS_OPTIONS = [
  'Booked',
  'In Transit',
  'At Customs',
  'In Wharf',
  'Arrived',
  'Delivered'
];

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

export default function AdminDashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // New Shipment Form State
  const [customerName, setCustomerName] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState('Booked');
  const [statusNote, setStatusNote] = useState('');
  const [createdTrackingNumber, setCreatedTrackingNumber] = useState('');

  // Editing State
  const [editingShipment, setEditingShipment] = useState(null);
  const [editStatus, setEditStatus] = useState('Booked');
  const [editStatusNote, setEditStatusNote] = useState('');

  const fetchShipments = async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: fetchError } = await supabase
        .from('shipments')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setShipments(data || []);
    } catch {
      setError('Failed to fetch shipments. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      fetchShipments();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleCreateShipment = async (e) => {
    e.preventDefault();
    setError('');
    setCreatedTrackingNumber('');

    if (!customerName.trim() || !origin.trim() || !destination.trim()) {
      setError('Customer name, origin, and destination are required.');
      return;
    }

    const trackingNum = generateTrackingNumber();

    try {
      const { error: insertError } = await supabase
        .from('shipments')
        .insert({
          tracking_number: trackingNum,
          customer_name: customerName.trim(),
          origin: origin.trim(),
          destination: destination.trim(),
          status: status,
          status_note: statusNote.trim()
        });

      if (insertError) throw insertError;

      setCreatedTrackingNumber(trackingNum);
      // Reset form fields
      setCustomerName('');
      setOrigin('');
      setDestination('');
      setStatus('Booked');
      setStatusNote('');

      // Refresh shipments list
      fetchShipments();
    } catch {
      setError('Failed to create shipment. Please try again.');
    }
  };

  const handleStartEdit = (shipment) => {
    setEditingShipment(shipment);
    setEditStatus(shipment.status);
    setEditStatusNote(shipment.status_note || '');
  };

  const handleCancelEdit = () => {
    setEditingShipment(null);
  };

  const handleUpdateShipment = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { error: updateError } = await supabase
        .from('shipments')
        .update({
          status: editStatus,
          status_note: editStatusNote.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', editingShipment.id);

      if (updateError) throw updateError;

      setEditingShipment(null);
      fetchShipments();
    } catch {
      setError('Failed to update shipment. Please try again.');
    }
  };

  return (
    <div className="admin-dashboard">
      <SEO
        title="Shipments Dashboard | Stride Logistics"
        description="Stride Logistics admin shipment operations dashboard."
        path="/sl-portal/dashboard"
      />
      <header className="admin-header">
        <div>
          <span className="admin-kicker">Operations control</span>
          <h1>Shipments Dashboard</h1>
        </div>
        <a className="btn btn-primary" href="#new-shipment">New Shipment</a>
      </header>

      <div className="admin-stack">
        <section className="admin-metrics" aria-label="Shipment dashboard summary">
          <div>
            <span>Total shipments</span>
            <strong>{shipments.length}</strong>
          </div>
          <div>
            <span>Active statuses</span>
            <strong>{new Set(shipments.map((shipment) => shipment.status)).size}</strong>
          </div>
          <div>
            <span>Latest workflow</span>
            <strong>{shipments[0]?.status || 'Ready'}</strong>
          </div>
        </section>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {createdTrackingNumber && (
          <div className="alert alert-success">
            <h3>Shipment Created Successfully!</h3>
            <p>
              Please copy the auto-generated tracking number for the customer:
            </p>
            <div className="tracking-code">
              {createdTrackingNumber}
            </div>
          </div>
        )}

        <section className="admin-card" id="new-shipment">
          <h2>Create New Shipment</h2>
          <form className="form-grid" onSubmit={handleCreateShipment}>
            <div className="field">
              <label htmlFor="customerName">Customer Name *</label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                placeholder="e.g. Acme Corp"
              />
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="origin">Origin *</label>
                <input
                  id="origin"
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  placeholder="e.g. Shanghai, CN"
                />
              </div>

              <div className="field">
                <label htmlFor="destination">Destination *</label>
                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  placeholder="e.g. Los Angeles, US"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="status">Initial Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="statusNote">Status Note</label>
              <input
                id="statusNote"
                type="text"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="e.g. Package loaded onto container"
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Create Shipment
            </button>
          </form>
        </section>

        {editingShipment && (
          <section className="admin-card is-editing">
            <h2>
              Edit Shipment: {editingShipment.tracking_number}
            </h2>
            <p>
              Updating status details for <strong>{editingShipment.customer_name}</strong>. Customer name, origin, destination, and tracking number cannot be edited.
            </p>
            <form className="form-grid" onSubmit={handleUpdateShipment}>
              <div className="field">
                <label htmlFor="editStatus">Status</label>
                <select
                  id="editStatus"
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="editStatusNote">Status Note</label>
                <input
                  id="editStatusNote"
                  type="text"
                  value={editStatusNote}
                  onChange={(e) => setEditStatusNote(e.target.value)}
                  placeholder="e.g. Arrived at customs checkpoint"
                />
              </div>

              <div className="admin-actions">
                <button className="btn btn-primary" type="submit">Save Changes</button>
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="admin-card">
          <h2>Shipments List</h2>
          {loading ? (
            <div className="empty-state">Loading shipments...</div>
          ) : shipments.length === 0 ? (
            <div className="empty-state">
              No shipments found in the database.
            </div>
          ) : (
            <div className="table-wrap">
              <table className="shipments-table">
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Customer</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((s) => (
                    <tr key={s.id}>
                      <td className="mono-cell">{s.tracking_number}</td>
                      <td>{s.customer_name}</td>
                      <td>{s.origin}</td>
                      <td>{s.destination}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(s.status)}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="muted-cell">
                        {new Date(s.updated_at).toLocaleString()}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-small"
                          onClick={() => handleStartEdit(s)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
