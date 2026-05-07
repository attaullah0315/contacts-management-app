import { Component } from '@angular/core';
import { Contact } from './models/contact.model';

/**
 * AppComponent — Root shell component.
 *
 * Acts as the layout container for the contacts dashboard.
 * It manages the currently selected contact and passes it down
 * to the ContactDetailsComponent via @Input binding.
 *
 * The layout is a two-panel split (list | detail) that collapses
 * to a single-panel on mobile, showing either the list or the detail.
 *
 * Assumption: No routing is needed for this single-page dashboard.
 * If the app needed deep-linking (e.g. /contacts/1), Angular Router
 * would be added with paramMap to handle contact ID from the URL.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Contacts Management';

  /** The contact currently selected in the list panel */
  selectedContact: Contact | null = null;

  /**
   * On mobile, toggles between showing the list and the detail panel.
   * True = show detail view; false = show list view.
   */
  showDetailOnMobile = false;

  /**
   * Handles contact selection from the ContactListComponent.
   * Updates selectedContact and switches to detail view on mobile.
   */
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
