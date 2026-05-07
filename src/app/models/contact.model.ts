/**
 * Contact model representing a single contact from the /contacts API endpoint.
 * Assumption: The mock API returns contacts with standard CRM fields.
 * The 'avatar' field may or may not be present — we fall back to initials if absent.
 */
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  role: string;          // e.g. "Developer", "UI/UX Designer"
  department?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  avatar?: string;       // URL to profile image — optional, may be null/empty
  status?: 'online' | 'away' | 'offline' | 'busy';
  bio?: string;
  meetingUrl?: string;
  socialLinks?: SocialLinks;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Email address model returned from /contacts/{id}/email_addresses endpoint.
 * A contact can have multiple email addresses; one may be flagged as primary.
 */
export interface EmailAddress {
  id: string;
  contactId: string;
  email: string;
  isPrimary: boolean;
  label?: string;        // e.g. "work", "personal"
}

/**
 * Social links associated with a contact profile.
 */
export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

/**
 * Combined view model merging Contact + its EmailAddresses for the detail view.
 * Assembled in the service layer so components stay simple.
 */
export interface ContactDetail extends Contact {
  emailAddresses: EmailAddress[];
}

/**
 * Generic API response wrapper.
 * Assumption: mockapi.io returns arrays directly, not wrapped in a data envelope.
 * If the real API uses an envelope, this interface would be used instead:
 * { data: T[], total: number, page: number, limit: number }
 */
export type ApiResponse<T> = T[];
