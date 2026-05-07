import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ContactDetailsComponent } from './contact-details.component';
import { ContactService } from '../../services/contact.service';
import { Contact, ContactDetail } from '../../models/contact.model';
import { SimpleChange } from '@angular/core';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;
  let mockContactService: jasmine.SpyObj<ContactService>;

  const mockContact: Contact = {
    id: '1',
    firstName: 'Johanna',
    lastName: 'Stevens',
    role: 'UI/UX Designer',
    status: 'online',
    bio: 'When I first got into advertising...',
    phone: '439-582-1578',
    meetingUrl: 'http://go.betacall.com/meet/j.stevens',
    socialLinks: {
      facebook: 'https://facebook.com/johanna',
      twitter: 'https://twitter.com/johanna'
    }
  };

  const mockContactDetail: ContactDetail = {
    ...mockContact,
    emailAddresses: [
      { id: 'e1', contactId: '1', email: 'johanna.stevens@gmail.com', isPrimary: true, label: 'personal' },
      { id: 'e2', contactId: '1', email: 'johanna.stevens@whiteui.store', isPrimary: false, label: 'work' }
    ]
  };

  beforeEach(async () => {
    mockContactService = jasmine.createSpyObj('ContactService', ['getContactDetail']);
    mockContactService.getContactDetail.and.returnValue(of(mockContactDetail));

    await TestBed.configureTestingModule({
      declarations: [ContactDetailsComponent],
      providers: [
        { provide: ContactService, useValue: mockContactService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty state when no contact is selected', () => {
    component.contact = null;
    fixture.detectChanges();
    const emptyState = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
  });

  it('should load contact detail when contact input changes', () => {
    component.contact = mockContact;
    component.ngOnChanges({
      contact: new SimpleChange(null, mockContact, true)
    });
    expect(mockContactService.getContactDetail).toHaveBeenCalledWith('1');
    expect(component.contactDetail).toEqual(mockContactDetail);
  });

  it('should handle error state', () => {
    mockContactService.getContactDetail.and.returnValue(
      throwError(() => new Error('Failed to load'))
    );
    component.contact = mockContact;
    component.ngOnChanges({
      contact: new SimpleChange(null, mockContact, true)
    });
    expect(component.errorMessage).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  });

  it('should return correct initials', () => {
    expect(component.getInitials(mockContact)).toBe('JS');
  });

  it('should return full name', () => {
    expect(component.getFullName(mockContact)).toBe('Johanna Stevens');
  });

  it('should identify primary email', () => {
    const primary = component.getPrimaryEmail(mockContactDetail.emailAddresses);
    expect(primary?.email).toBe('johanna.stevens@gmail.com');
    expect(primary?.isPrimary).toBeTrue();
  });

  it('should return secondary emails', () => {
    const secondary = component.getSecondaryEmails(mockContactDetail.emailAddresses);
    expect(secondary.length).toBe(1);
    expect(secondary[0].email).toBe('johanna.stevens@whiteui.store');
  });

  it('should return null for primary email when list is empty', () => {
    expect(component.getPrimaryEmail([])).toBeNull();
  });
});
