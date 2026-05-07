export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  department?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  avatar?: string;
  status?: 'online' | 'away' | 'offline' | 'busy';
  bio?: string;
  meetingUrl?: string;
  socialLinks?: SocialLinks;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmailAddress {
  id: string;
  contactId: string;
  email: string;
  isPrimary: boolean;
  label?: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export interface ContactDetail extends Contact {
  emailAddresses: EmailAddress[];
}
 */
export type ApiResponse<T> = T[];
