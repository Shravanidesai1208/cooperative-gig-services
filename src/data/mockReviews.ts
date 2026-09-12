import { ReviewItem } from '../types';

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    workerId: 'worker-ramesh-patil',
    customerName: 'Ananya Kulkarni',
    customerLocality: 'Gangapur Road, Nashik',
    rating: 5,
    date: 'Yesterday',
    comment: 'Ramesh ji arrived within 15 minutes of booking! Fixed our main tripping MCB box cleanly and explained what caused the surge. Very respectful and did not charge any hidden fees. WorkNest co-op model is fantastic!',
    service: 'Electrician - Inverter & MCB Tripping',
    tags: ['Punctual', 'Expert Diagnostics', 'Clean Work', 'Transparent Price'],
    categories: {
      professionalism: 5,
      quality: 5,
      timeliness: 5,
      communication: 5
    }
  },
  {
    id: 'rev-2',
    workerId: 'worker-ramesh-patil',
    customerName: 'Dr. Vivek Joshi',
    customerLocality: 'College Road, Nashik',
    rating: 5,
    date: '3 days ago',
    comment: 'Replaced two old ceiling fans with BLDC fans. Very clean drilling with dust collection, polite behavior. It feels great knowing that 88% of my payment went straight to Ramesh bhai instead of an app commission!',
    service: 'Electrician - Fan Installation',
    tags: ['Polite', 'High Skill', 'Zero Mess'],
    categories: {
      professionalism: 5,
      quality: 5,
      timeliness: 5,
      communication: 5
    }
  },
  {
    id: 'rev-3',
    workerId: 'worker-ramesh-patil',
    customerName: 'Pooja Deshpande',
    customerLocality: 'Mahatma Nagar, Nashik',
    rating: 5,
    date: '1 week ago',
    comment: 'Emergency switchboard repair at 8 PM. Ramesh arrived on his bike with all genuine Havells parts. Very safe work, verified with OTP before starting. Highly recommended co-op brother.',
    service: 'Electrician - Switchboard Fix',
    tags: ['Emergency Fast', 'Safe Work'],
    categories: {
      professionalism: 5,
      quality: 5,
      timeliness: 5,
      communication: 5
    }
  },
  {
    id: 'rev-4',
    workerId: 'worker-sunita-jadhav',
    customerName: 'Rohit Sharma',
    customerLocality: 'Govind Nagar, Nashik',
    rating: 5,
    date: '4 days ago',
    comment: 'Sunita tai and her team deep cleaned our 3BHK before Diwali. Kitchen tiles and chimney look brand new. Truly cooperative teamwork!',
    service: 'Home Deep Cleaning',
    tags: ['Thorough', 'Respectful Team', 'Organic Cleaners'],
    categories: {
      professionalism: 5,
      quality: 5,
      timeliness: 5,
      communication: 5
    }
  }
];
