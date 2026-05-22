export const STATUS_OPTIONS = [
  'Booked',
  'In Transit',
  'At Customs',
  'In Wharf',
  'Arrived',
  'Delivered',
] as const;

export type ShipmentStatus = (typeof STATUS_OPTIONS)[number];

export type Shipment = {
  id: string | number;
  tracking_number: string;
  customer_name: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  status_note: string | null;
  created_at?: string;
  updated_at: string;
};

export const getStatusClass = (status: ShipmentStatus) => {
  const statusMap: Record<ShipmentStatus, string> = {
    Booked: 'status-booked',
    'In Transit': 'status-in-transit',
    'At Customs': 'status-at-customs',
    'In Wharf': 'status-in-wharf',
    Arrived: 'status-arrived',
    Delivered: 'status-delivered',
  };

  return statusMap[status];
};
