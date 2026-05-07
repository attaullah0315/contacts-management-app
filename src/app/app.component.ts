import { Component } from '@angular/core';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Contacts Management';

  selectedContact: Contact | null = null;

  showDetailOnMobile = false;

  onContactSelected(contact: Contact): void {
    this.selectedContact = contact;
    this.showDetailOnMobile = true;
  }

  /**
   * Returns to the contact list on mobile (back button).
   */
  onBackToList(): void {
    this.showDetailOnMobile = false;
  }
}
