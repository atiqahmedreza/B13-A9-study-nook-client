export const truncate = (text = '', max = 100) => {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must include at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must include at least one lowercase letter';
  }
  return null;
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);

export const calculateBookingCost = (startTime, endTime, hourlyRate) => {
  if (!startTime || !endTime || hourlyRate == null) return 0;
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  const hours = (eh * 60 + em - (sh * 60 + sm)) / 60;
  if (hours < 1) return 0;
  return hours * hourlyRate;
};

export const canCancelBooking = (booking) => {
  if (!booking || booking.status !== 'confirmed') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const bookingDate = new Date(`${booking.date}T00:00:00`);
  return bookingDate >= today;
};

export const getTodayISO = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
