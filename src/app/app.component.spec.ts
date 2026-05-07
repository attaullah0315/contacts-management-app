import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Contact } from './models/contact.model';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [AppComponent, ContactListComponent, ContactDetailsComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component.title).toBe('Contacts Management');
  });

  it('should start with no contact selected', () => {
    expect(component.selectedContact).toBeNull();
  });

  it('should start with detail hidden on mobile', () => {
    expect(component.showDetailOnMobile).toBeFalse();
  });

  it('should select contact and show detail on mobile', () => {
    const mockContact: Contact = {
      id: '1', firstName: 'Test', lastName: 'User', role: 'Developer'
    };
    component.onContactSelected(mockContact);
    expect(component.selectedContact).toEqual(mockContact);
    expect(component.showDetailOnMobile).toBeTrue();
  });

  it('should go back to list on mobile', () => {
    component.showDetailOnMobile = true;
    component.onBackToList();
    expect(component.showDetailOnMobile).toBeFalse();
  });
});
