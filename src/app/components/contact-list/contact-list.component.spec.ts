import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ContactListComponent } from './contact-list.component';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

/**
 * Unit tests for ContactListComponent.
 * The ContactService is mocked to isolate component logic from HTTP.
 */
describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let mockContactService: jasmine.SpyObj<ContactService>;

  const mockContacts: Contact[] = [
    { id: '1', firstName: 'Johanna', lastName: 'Stevens', role: 'UI/UX Designer', status: 'online' },
    { id: '2', firstName: 'Nicholas', lastName: 'Gordon', role: 'Developer', status: 'offline' },
    { id: '3', firstName: 'Bradley', lastName: 'Malone', role: 'Sales Manager', status: 'away' }
  ];

  beforeEach(async () => {
    mockContactService = jasmine.createSpyObj('ContactService', [
      'getContacts',
      'searchContacts'
    ]);

    mockContactService.getContacts.and.returnValue(of(mockContacts));
    mockContactService.searchContacts.and.returnValue(of(mockContacts));

    await TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ContactService, useValue: mockContactService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contacts on init', () => {
    expect(mockContactService.getContacts).toHaveBeenCalledOnce();
    expect(component.contacts.length).toBe(3);
    expect(component.isLoading).toBeFalse();
  });

  it('should auto-select first contact on load', () => {
    expect(component.selectedContactId).toBe('1');
  });

  it('should emit contactSelected when a contact is clicked', () => {
    const emitSpy = spyOn(component.contactSelected, 'emit');
    component.selectContact(mockContacts[1]);
    expect(emitSpy).toHaveBeenCalledWith(mockContacts[1]);
    expect(component.selectedContactId).toBe('2');
  });

  it('should show loading state initially', () => {
    // Reset to initial loading state
    component.isLoading = true;
    component.contacts = [];
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('.spinner');
    expect(spinner).toBeTruthy();
  });

  it('should show error state when API fails', () => {
    mockContactService.getContacts.and.returnValue(
      throwError(() => new Error('Network error'))
    );
    component['loadContacts']();
    fixture.detectChanges();

    expect(component.errorMessage).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  });

  it('should generate correct initials', () => {
    expect(component.getInitials(mockContacts[0])).toBe('JS');
    expect(component.getInitials(mockContacts[1])).toBe('NG');
  });

  it('should clear search when clearSearch is called', fakeAsync(() => {
    component.searchControl.setValue('test');
    tick(300);
    component.clearSearch();
    expect(component.searchControl.value).toBe('');
  }));

  it('should track contacts by ID for performance', () => {
    expect(component.trackByContactId(0, mockContacts[0])).toBe('1');
  });

  it('should debounce search input', fakeAsync(() => {
    mockContactService.searchContacts.calls.reset();
    component.searchControl.setValue('jo');
    tick(150); // Before debounce
    expect(mockContactService.searchContacts).not.toHaveBeenCalled();
    tick(150); // After debounce
    expect(mockContactService.searchContacts).toHaveBeenCalledWith('jo');
  }));
});
