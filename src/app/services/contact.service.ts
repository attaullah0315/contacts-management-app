import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Contact, ContactDetail, EmailAddress } from '../models/contact.model';
import { MOCK_CONTACTS, MOCK_EMAIL_ADDRESSES } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly baseUrl = 'https://69fbe18dfce564e25916f5af.mockapi.io/api/v1';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    // Using mock data instead of HTTP call to avoid 404 errors
    return of(MOCK_CONTACTS);
  }

  getContactById(id: string): Observable<Contact> {
    const contact = MOCK_CONTACTS.find(c => c.id === id);
    if (!contact) {
      return throwError(() => new Error(`Contact with id ${id} not found`));
    }
    return of(contact);
  }

  getEmailAddresses(contactId: string): Observable<EmailAddress[]> {
    const emails = MOCK_EMAIL_ADDRESSES[contactId] || [];
    return of(emails);
  }

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