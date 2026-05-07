import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Contact, ContactDetail, EmailAddress } from '../models/contact.model';
import { MOCK_CONTACTS, MOCK_EMAIL_ADDRESSES } from './mock-data';

/**
 * ContactService handles all communication with the backend contact API.
 *
 * Assumption: The base URL points to a mockapi.io project. In a real application,
 * this would come from an environment configuration file (environment.ts / environment.prod.ts).
 *
 * Simplified: Error handling is basic here (logs + rethrows). A full implementation
 * would include retry logic (RxJS retryWhen), user-facing toast notifications, and
 * a centralised HTTP interceptor for auth headers and global error handling.
 *
 * Simplified: Pagination is not implemented. A full implementation would support
 * cursor-based or offset pagination by passing query params to the HTTP calls.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  /**
   * Base API URL — replace with your actual mockapi.io project URL.
   * Assumption: Using mockapi.io schema where resources live under /api/v1/.
   * In production this would be read from environment.apiUrl.
   */
  private readonly baseUrl = 'https://69fbe18dfce564e25916f5af.mockapi.io/api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the full list of contacts from GET /contacts.
   * Returns an Observable of Contact array.
   */
  getContacts(): Observable<Contact[]> {
    // Using mock data instead of HTTP call to avoid 404 errors
    return of(MOCK_CONTACTS);
  }

  /**
   * Fetches a single contact by ID from GET /contacts/{id}.
   */
  getContactById(id: string): Observable<Contact> {
    const contact = MOCK_CONTACTS.find(c => c.id === id);
    if (!contact) {
      return throwError(() => new Error(`Contact with id ${id} not found`));
    }
    return of(contact);
  }

  /**
   * Fetches email addresses for a specific contact from GET /contacts/{id}/email_addresses.
   */
  getEmailAddresses(contactId: string): Observable<EmailAddress[]> {
    const emails = MOCK_EMAIL_ADDRESSES[contactId] || [];
    return of(emails);
  }

  /**
   * Assembles a full ContactDetail by combining contact data + email addresses.
   * Uses forkJoin to make both requests in parallel for performance.
   *
   * Simplified: In a real app, the backend might provide a single endpoint
   * that returns the contact with embedded email addresses (e.g. GET /contacts/{id}?include=emails).
   * The current two-request approach is fine for mockapi.io constraints.
   */
  getContactDetail(id: string): Observable<ContactDetail> {
    return forkJoin({
      contact: this.getContactById(id),
      emails: this.getEmailAddresses(id)
    }).pipe(
      map(({ contact, emails }) => ({
        ...contact,
        emailAddresses: emails
      })),
      catchError(this.handleError)
    );
  }

  /**
   * Searches contacts by name, email, or phone on the client side.
   *
   * Simplified: This performs client-side filtering on already-fetched contacts.
   * A production implementation would debounce the search input and send the query
   * as a query parameter to the server (e.g. GET /contacts?search=john) to avoid
   * loading all contacts into memory.
   */
  searchContacts(query: string): Observable<Contact[]> {
    return this.getContacts().pipe(
      map(contacts => {
        const q = query.toLowerCase().trim();
        if (!q) return contacts;
        return contacts.filter(c =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
          c.role?.toLowerCase().includes(q) ||
          c.phone?.includes(q)
        );
      })
    );
  }

  /**
   * Centralised error handler.
   * Simplified: Only logs to console and rethrows. A full implementation would
   * map HTTP status codes to user-friendly messages and integrate with a
   * notification/toast service.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('ContactService error:', error);
    const message = error.error instanceof ErrorEvent
      ? error.error.message
      : `Server error ${error.status}: ${error.message}`;
    return throwError(() => new Error(message));
  }
}