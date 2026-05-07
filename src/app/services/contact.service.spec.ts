import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactService } from './contact.service';
import { Contact, EmailAddress, ContactDetail } from '../models/contact.model';

/**
 * Unit tests for ContactService.
 * We use HttpClientTestingModule to intercept HTTP calls and assert on requests
 * without making real network requests.
 *
 * Assumption: The base URL in ContactService is configured to the mockapi.io endpoint.
 * Tests use the same URL prefix to match outgoing requests.
 */
describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  const BASE_URL = 'https://67eb4ebfaa794fb3222c4fa2.mockapi.io/api/v1';

  const mockContacts: Contact[] = [
    {
      id: '1',
      firstName: 'Johanna',
      lastName: 'Stevens',
      role: 'UI/UX Designer',
      status: 'online',
      avatar: 'https://example.com/avatar1.jpg'
    },
    {
      id: '2',
      firstName: 'Nicholas',
      lastName: 'Gordon',
      role: 'Developer',
      status: 'offline'
    }
  ];

  const mockEmails: EmailAddress[] = [
    { id: 'e1', contactId: '1', email: 'johanna@gmail.com', isPrimary: true, label: 'personal' },
    { id: 'e2', contactId: '1', email: 'johanna@company.com', isPrimary: false, label: 'work' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no unexpected HTTP requests were made
    httpMock.verify();
  });

  describe('getContacts', () => {
    it('should fetch all contacts via GET /contacts', () => {
      service.getContacts().subscribe(contacts => {
        expect(contacts).toEqual(mockContacts);
        expect(contacts.length).toBe(2);
      });

      const req = httpMock.expectOne(`${BASE_URL}/contacts`);
      expect(req.request.method).toBe('GET');
      req.flush(mockContacts);
    });

    it('should return an empty array when API returns no contacts', () => {
      service.getContacts().subscribe(contacts => {
        expect(contacts).toEqual([]);
      });

      const req = httpMock.expectOne(`${BASE_URL}/contacts`);
      req.flush([]);
    });

    it('should propagate HTTP errors', () => {
      service.getContacts().subscribe({
        next: () => fail('expected error'),
        error: (err: Error) => {
          expect(err.message).toContain('500');
        }
      });

      const req = httpMock.expectOne(`${BASE_URL}/contacts`);
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getContactById', () => {
    it('should fetch a single contact by ID', () => {
      service.getContactById('1').subscribe(contact => {
        expect(contact).toEqual(mockContacts[0]);
        expect(contact.firstName).toBe('Johanna');
      });

      const req = httpMock.expectOne(`${BASE_URL}/contacts/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockContacts[0]);
    });
  });

  describe('getEmailAddresses', () => {
    it('should fetch email addresses for a contact', () => {
      service.getEmailAddresses('1').subscribe(emails => {
        expect(emails).toEqual(mockEmails);
        expect(emails.length).toBe(2);
        const primary = emails.find(e => e.isPrimary);
        expect(primary?.email).toBe('johanna@gmail.com');
      });

      const req = httpMock.expectOne(`${BASE_URL}/contacts/1/email_addresses`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEmails);
    });
  });

  describe('getContactDetail', () => {
    it('should combine contact and email data in parallel', () => {
      let result: ContactDetail | undefined;

      service.getContactDetail('1').subscribe(detail => {
        result = detail;
      });

      // forkJoin fires both requests simultaneously
      const contactReq = httpMock.expectOne(`${BASE_URL}/contacts/1`);
      const emailReq = httpMock.expectOne(`${BASE_URL}/contacts/1/email_addresses`);

      contactReq.flush(mockContacts[0]);
      emailReq.flush(mockEmails);

      expect(result).toBeTruthy();
      expect(result!.firstName).toBe('Johanna');
      expect(result!.emailAddresses.length).toBe(2);
      expect(result!.emailAddresses[0].isPrimary).toBe(true);
    });
  });

  describe('searchContacts', () => {
    it('should filter contacts by name (case-insensitive)', () => {
      service.searchContacts('johanna').subscribe(results => {
        expect(results.length).toBe(1);
        expect(results[0].firstName).toBe('Johanna');
      });

      const req = httpMock.expectOne(`${BASE_URL}/contacts`);
      req.flush(mockContacts);
    });

    it('should filter contacts by role', () => {
      service.searchContacts('developer').subscribe(results => {
        expect(results.length).toBe(1);
        expect(results[0].firstName).toBe('Nicholas');
      });

      const req = httpMock.expectOne(`${BASE_URL}/contacts`);
      req.flush(mockContacts);
    });

    it('should return all contacts when query is empty', () => {
      service.searchContacts('').subscribe(results => {
        expect(results.length).toBe(2);
      });

      const req = httpMock.expectOne(`${BASE_URL}/contacts`);
      req.flush(mockContacts);
    });

    it('should return empty array when no contacts match', () => {
      service.searchContacts('zzznomatch').subscribe(results => {
        expect(results.length).toBe(0);
      });

      const req = httpMock.expectOne(`${BASE_URL}/contacts`);
      req.flush(mockContacts);
    });
  });
});
