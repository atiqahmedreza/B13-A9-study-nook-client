export const AMENITIES = [
  'Whiteboard',
  'Projector',
  'Wi-Fi',
  'Power Outlets',
  'Quiet Zone',
  'Air Conditioning',
];

export const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => {
  const hour = i + 8;
  return `${String(hour).padStart(2, '0')}:00`;
});

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Rooms', path: '/rooms' },
];

export const PRIVATE_NAV_LINKS = [
  { label: 'Add Room', path: '/add-room' },
  { label: 'My Listings', path: '/my-listings' },
  { label: 'My Bookings', path: '/my-bookings' },
];

export const PAGE_TITLES = {
  '/': 'StudyNook – Home',
  '/rooms': 'StudyNook – Available Rooms',
  '/login': 'StudyNook – Login',
  '/register': 'StudyNook – Register',
  '/add-room': 'StudyNook – Add Room',
  '/my-listings': 'StudyNook – My Listings',
  '/my-bookings': 'StudyNook – My Bookings',
};
