/**
 * WhatsApp redirection utility for enquiries with pre-written text
 */

export const cleanPhoneForWhatsApp = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  // If digits start with 0 or 10-digit Indian number without country code, prepend 91
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
};

export const getWhatsAppUrl = (
  phone: string,
  message: string = 'Hello Global Infosoft, I would like to enquire about your custom software development and digital solutions.'
): string => {
  const cleanNumber = cleanPhoneForWhatsApp(phone);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};

export const WHATSAPP_MESSAGES = {
  general: 'Hello Global Infosoft, I would like to enquire about your software, web & mobile app development services.',
  ceo: 'Hello Rajnish Ji (CEO), I am reaching out to enquire about enterprise software development and business solutions with Global Infosoft.',
  cto: 'Hello Manoj Ji (CTO), I would like to discuss software engineering architecture and digital project requirements with Global Infosoft.',
  headOffice: 'Hello Global Infosoft Head Office, I would like to make an enquiry regarding custom software, ERP, retail POS billing, and development services.',
  sales: 'Hello Global Infosoft Sales Team, I would like to request a quotation and project consultation for software development.',
  support: 'Hello Global Infosoft Support Team, I am reaching out for technical assistance and service support.'
};
