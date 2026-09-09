/**
 * Email enquiry routing utility
 * Directs enquiries to info@globalinfosoft.com with formatted client details.
 */

export const PRIMARY_ENQUIRY_EMAIL = 'info@globalinfosoft.com';

export interface ProjectEnquiryData {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  serviceCategory?: string;
  budgetRange?: string;
  message?: string;
  submittedAt?: string;
}

export const formatEnquiryEmailBody = (data: ProjectEnquiryData): string => {
  const timestamp = data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';

  return `Dear Rajnish Kumar,

A new business project enquiry has been submitted through the Global InfoSoft website portal.

==============================================
1. CLIENT CONTACT DETAILS
==============================================
• Full Name: ${data.fullName || 'Not specified'}
• Work Email: ${data.email || 'Not specified'}
• Phone / WhatsApp: ${data.phone || 'Not specified'}
• Company / Organization: ${data.company || 'Individual / Not specified'}

==============================================
2. PROJECT & ARCHITECTURE SCOPE
==============================================
• Interested Practice: ${data.serviceCategory || 'Custom Software Development'}
• Anticipated Investment: ${data.budgetRange || 'Not specified'}

• Project Requirements & Goals:
${data.message || 'No additional details provided.'}

==============================================
3. SUBMISSION METADATA
==============================================
• Date & Time: ${timestamp}
• Recipient: ${PRIMARY_ENQUIRY_EMAIL}
• Action Required: Review requirements, execute mutual NDA, and prepare preliminary architecture roadmap.

---
Global InfoSoft - Enterprise Software & Intelligent Digital Realities
Website Portal Automated Dispatch`;
};

export const getEnquiryMailtoUrl = (data: ProjectEnquiryData): string => {
  const subject = `[New Project Enquiry] ${data.serviceCategory || 'Software Development'} - ${data.fullName || 'Client'} ${data.company ? `(${data.company})` : ''}`;
  const body = formatEnquiryEmailBody(data);
  return `mailto:${PRIMARY_ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const getEnquiryGmailWebUrl = (data: ProjectEnquiryData): string => {
  const subject = `[New Project Enquiry] ${data.serviceCategory || 'Software Development'} - ${data.fullName || 'Client'} ${data.company ? `(${data.company})` : ''}`;
  const body = formatEnquiryEmailBody(data);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PRIMARY_ENQUIRY_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const getSupportTicketMailtoUrl = (ticket: {
  fullName: string;
  email: string;
  category: string;
  priority: string;
  ticketId: string;
  description: string;
}): string => {
  const subject = `[Support Ticket #${ticket.ticketId}] ${ticket.category} (${ticket.priority}) - ${ticket.fullName}`;
  const body = `Dear Global InfoSoft Engineering Team & Rajnish Kumar,

A new technical support ticket has been logged:

• Ticket ID: #${ticket.ticketId}
• Name: ${ticket.fullName}
• User Email: ${ticket.email}
• Category: ${ticket.category}
• Priority: ${ticket.priority}

Description:
${ticket.description}

Sent to: ${PRIMARY_ENQUIRY_EMAIL}`;

  return `mailto:${PRIMARY_ENQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
