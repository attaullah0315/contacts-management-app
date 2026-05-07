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

  searchControl = new FormControl('');

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

  selectContact(contact: Contact): void {
    this.selectedContactId = contact.id;
    this.contactSelected.emit(contact);
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }

  getInitials(contact: Contact): string {
    return `${contact.firstName?.[0] ?? ''}${contact.lastName?.[0] ?? ''}`.toUpperCase();
  }

  trackByContactId(_index: number, contact: Contact): string {
    return contact.id;
  }
}
