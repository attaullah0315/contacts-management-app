import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

/**
 * ContactListComponent
 *
 * Displays a scrollable, searchable list of all contacts.
 * Emits a (contactSelected) event when a contact is clicked, allowing
 * the parent to update the detail panel — keeping this component "dumb"
 * about the detail view.
 *
 * Design decision: OnPush change detection is used for performance —
 * the list can be large and we don't want Angular checking it on every tick.
 *
 * Assumption: The full contact list is loaded on init. For very large datasets
 * (thousands of contacts), virtual scrolling (CDK ScrollingModule) should be
 * added and the search should be server-side with debounce.
 */
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit, OnDestroy {

  @Output() contactSelected = new EventEmitter<Contact>();

  contacts: Contact[] = [];
  selectedContactId: string | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  /** FormControl for the search input — enables reactive debounced search */
  searchControl = new FormControl('');

  /** Subject used to clean up RxJS subscriptions on component destroy */
  private destroy$ = new Subject<void>();

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContacts();
    this.setupSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Loads the initial contact list.
   */
  public loadContacts(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.contactService.getContacts().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.isLoading = false;
        // Auto-select first contact if list is not empty
        if (contacts.length > 0) {
          this.selectContact(contacts[0]);
        }
        this.cdr.markForCheck();
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Sets up reactive search with 300ms debounce.
   * Switches to a new search request on each keypress (cancels previous).
   *
   * Simplified: Search is client-side. Production would send query to server.
   */
  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.contactService.searchContacts(query ?? '')),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.cdr.markForCheck();
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.cdr.markForCheck();
      }
    });
  }

  /**
   * Handles contact row click. Emits the selected contact to parent.
   */
  selectContact(contact: Contact): void {
    this.selectedContactId = contact.id;
    this.contactSelected.emit(contact);
  }

  /**
   * Clears the search input and reloads the full list.
   */
  clearSearch(): void {
    this.searchControl.setValue('');
  }

  /**
   * Returns initials from a contact's name for avatar fallback.
   */
  getInitials(contact: Contact): string {
    return `${contact.firstName?.[0] ?? ''}${contact.lastName?.[0] ?? ''}`.toUpperCase();
  }

  /**
   * TrackBy function for *ngFor performance — avoids re-rendering unchanged contacts.
   */
  trackByContactId(_index: number, contact: Contact): string {
    return contact.id;
  }
}
