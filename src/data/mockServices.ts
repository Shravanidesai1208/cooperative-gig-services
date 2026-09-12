import { ServiceCategory } from '../types';

export const MOCK_SERVICES: ServiceCategory[] = [
  {
    id: 'electrician',
    name: 'Electrician Services',
    nameHi: 'इलेक्ट्रीशियन सेवाएं',
    nameMr: 'इलेक्ट्रिशियन सेवा',
    category: 'electrician',
    icon: 'Zap',
    description: 'Certified Nashik co-op electricians for wiring, short circuits, switchboards, and fan repairs.',
    basePrice: 199,
    popularSubServices: [
      'Switchboard & Socket Fix',
      'Ceiling Fan Repair / Installation',
      'Inverter & MCB Tripping Diagnosis',
      'Complete Room Re-Wiring',
      'Decorative Lighting & Chandelier Setup'
    ]
  },
  {
    id: 'plumbing',
    name: 'Plumbing & Drainage',
    nameHi: 'प्लंबिंग और ड्रेनेज',
    nameMr: 'प्लंबिंग आणि ड्रेनेज कामे',
    category: 'plumbing',
    icon: 'Wrench',
    description: 'Expert local plumbers for tap leakages, pipe installations, water tanks, and unclogging.',
    basePrice: 249,
    popularSubServices: [
      'Kitchen Tap / Mixer Leakage',
      'Bathroom Drain Unblocking',
      'Overhead Water Tank Float Valve Setup',
      'Geyser Inlet / Outlet Fitting',
      'Concealed Pipe Seepage Detection'
    ]
  },
  {
    id: 'cleaning',
    name: 'Home Deep Cleaning',
    nameHi: 'घर की गहरी सफाई',
    nameMr: 'घर डीप क्लिनिंग सेवा',
    category: 'cleaning',
    icon: 'Sparkles',
    description: 'Eco-friendly, deep machine scrubbing by trained co-op women and men teams.',
    basePrice: 799,
    popularSubServices: [
      '2BHK / 3BHK Full Home Deep Scrubbing',
      'Kitchen Chimney & Oil Degreasing',
      'Bathroom Tile Scale & Acid-Free Clean',
      'Sofa & Mattress Foam Wash',
      'Balcony & Window Sliding Track Clean'
    ]
  },
  {
    id: 'carpentry',
    name: 'Carpentry & Woodwork',
    nameHi: 'बढ़ईगीरी और फर्नीचर',
    nameMr: 'सुतारकाम आणि फर्निचर',
    category: 'carpentry',
    icon: 'Hammer',
    description: 'Skilled carpenters for hinges, custom shelving, lock repairs, and furniture fixes.',
    basePrice: 299,
    popularSubServices: [
      'Godrej Main Door Lock Installation',
      'Hydraulic Wardrobe Hinge Replacement',
      'Modular Kitchen Drawer Alignment',
      'Mosquito Net Mesh Window Fitment',
      'Bed / Sofa Frame Reinforcement'
    ]
  },
  {
    id: 'appliances',
    name: 'Appliance Repair',
    nameHi: 'घरेलू उपकरण मरम्मत',
    nameMr: 'घरगुती उपकरणे दुरुस्ती',
    category: 'appliances',
    icon: 'Tv',
    description: 'Transparent part replacement with genuine warranty for RO, Fridge, Washing Machines.',
    basePrice: 349,
    popularSubServices: [
      'RO Water Purifier Membrane & Filter Service',
      'Semi/Automatic Washing Machine Spin Issue',
      'Single/Double Door Refrigerator Cooling Fix',
      'Microwave Magnetron & Heating Repair',
      'Air Cooler Motor & Pump Replacement'
    ]
  },
  {
    id: 'painting',
    name: 'Painting & Waterproofing',
    nameHi: 'पेंटिंग और वॉटरप्रूफिंग',
    nameMr: 'रंगकाम आणि वॉटरप्रूफिंग',
    category: 'painting',
    icon: 'Paintbrush',
    description: 'Nashik monsoon wall seepage treatment, dampness solutions, and interior aesthetic repaints.',
    basePrice: 599,
    popularSubServices: [
      'Monsoon Wall Dampness & Putty Treatment',
      'Balcony Exterior Waterproof Coating',
      'Single Wall Accent Texture Design',
      'Touch-up & Door Enamel Gloss Paint',
      'Full Home Fresh Paint Estimate'
    ]
  }
];
