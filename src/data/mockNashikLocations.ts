export interface NashikLocation {
  id: string;
  name: string;
  marathiName: string;
  pincode: string;
  coordinates: { x: number; y: number }; // Relative percentage on SVG map
  popularLandmarks: string[];
}

export const NASHIK_LOCATIONS: NashikLocation[] = [
  {
    id: 'gangapur-rd',
    name: 'Gangapur Road',
    marathiName: 'गंगापूर रोड',
    pincode: '422005',
    coordinates: { x: 32, y: 35 },
    popularLandmarks: ['Someshwar Waterfall Rd', 'Navshya Ganapati', 'KTHM College', 'Serene Meadows']
  },
  {
    id: 'college-rd',
    name: 'College Road',
    marathiName: 'कॉलेज रोड',
    pincode: '422005',
    coordinates: { x: 42, y: 44 },
    popularLandmarks: ['BYK College', 'Bhosala Military School', 'Model Colony', 'Big Bazaar']
  },
  {
    id: 'mahatma-nagar',
    name: 'Mahatma Nagar',
    marathiName: 'महात्मा नगर',
    pincode: '422007',
    coordinates: { x: 36, y: 52 },
    popularLandmarks: ['Cricket Ground', 'Water Tank', 'Archit Harmony', 'Samarth Nagar']
  },
  {
    id: 'panchavati',
    name: 'Panchavati',
    marathiName: 'पंचवटी',
    pincode: '422003',
    coordinates: { x: 58, y: 32 },
    popularLandmarks: ['Kalaram Temple', 'Sita Gumpha', 'Godavari Ghat', 'Nimani Bus Stand']
  },
  {
    id: 'indira-nagar',
    name: 'Indira Nagar',
    marathiName: 'इंदिरा नगर',
    pincode: '422009',
    coordinates: { x: 52, y: 68 },
    popularLandmarks: ['Jogging Track', 'Pathardi Phata', 'Rane Nagar', 'Wasan Nagar']
  },
  {
    id: 'govind-nagar',
    name: 'Govind Nagar',
    marathiName: 'गोविंद नगर',
    pincode: '422009',
    coordinates: { x: 48, y: 56 },
    popularLandmarks: ['City Centre Mall', 'ABB Circle', 'Symbiosis Campus', 'Karmayogi Nagar']
  },
  {
    id: 'cidco',
    name: 'CIDCO',
    marathiName: 'सिडको',
    pincode: '422009',
    coordinates: { x: 38, y: 65 },
    popularLandmarks: ['Pawan Nagar', 'Trimurti Chowk', 'Uttam Nagar', 'Shivaji Chowk']
  },
  {
    id: 'satpur',
    name: 'Satpur MIDC',
    marathiName: 'सातपूर',
    pincode: '422007',
    coordinates: { x: 25, y: 50 },
    popularLandmarks: ['MIDC Police Station', 'ESI Hospital', 'NICE Area', 'Carbon Naka']
  },
  {
    id: 'canada-corner',
    name: 'Canada Corner',
    marathiName: 'कॅनडा कॉर्नर',
    pincode: '422002',
    coordinates: { x: 50, y: 46 },
    popularLandmarks: ['Sharanpur Road', 'Rajiv Gandhi Bhavan', 'Vise Mala', 'Old Agra Rd']
  }
];
