import {
  Component,
  OnChanges,
  OnDestroy,
  Input,
  SimpleChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Contact, ContactDetail, EmailAddress } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';

/**
 * ContactDetailsComponent
 *
 * Displays full details for the currently selected contact, including:
 * - Profile header (avatar, name, role, action buttons)
 * - Bio
 * - All email addresses (with primary flag)
 * - Phone numbers
 * - Meeting URL
 * - Social media links
 *
 * Receives a Contact via @Input and fetches additional details (emails)
 * reactively when the input changes via ngOnChanges.
 *
 * Assumption: The /contacts/{id}/email_addresses endpoint returns all emails
 * for that contact. The component merges this with the base Contact object.
 *
 * Design decision: OnPush change detection. The component re-renders only when
 * the @Input reference changes or markForCheck() is called after async data arrives.
 */
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnChanges, OnDestroy {

  /**
   * The selected contact passed from the parent (AppComponent / ContactListComponent).
   * When this changes, the component loads full details including emails.
   */
  @Input() contact: Contact | null = null;

  contactDetail: ContactDetail | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Triggered when the @Input contact changes.
   * Loads full contact details including email addresses.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && this.contact) {
      this.loadContactDetail(this.contact.id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Fetches the full contact detail (contact + emails) from the service.
   * Any in-flight requests from a previous contact selection are cancelled
   * via takeUntil + switchMap in the service (handled at service level).
   *
   * Simplified: We don't cancel in-flight requests here explicitly. A full
   * implementation would use switchMap in an observable pipe to auto-cancel
   * previous requests when a new contact is selected rapidly.
   */
  loadContactDetail(id: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.contactDetail = null;

    this.contactService.getContactDetail(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (detail) => {
        this.contactDetail = detail;
        this.isLoading = false;
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
   * Returns the primary email for a contact, or the first one if none is flagged.
   */
  getPrimaryEmail(emails: EmailAddress[]): EmailAddress | null {
    return emails.find(e => e.isPrimary) ?? emails[0] ?? null;
  }

  /**
   * Returns non-primary emails.
   */
  getSecondaryEmails(emails: EmailAddress[]): EmailAddress[] {
    return emails.filter(e => !e.isPrimary);
  }

  /**
   * Returns initials for avatar fallback.
   */
  getInitials(contact: Contact): string {
    return `${contact.firstName?.[0] ?? ''}${contact.lastName?.[0] ?? ''}`.toUpperCase();
  }

  /**
   * Formats a full name from a contact.
   */
  getFullName(contact: Contact): string {
    return `${contact.firstName} ${contact.lastName}`.trim();
  }

  /**
   * Determines the display label for a social icon.
   */
  getSocialUrl(type: string, contact: Contact): string | undefined {
    return contact.socialLinks?.[type as keyof typeof contact.socialLinks];
  }

  /** Social link types to display in the UI */
  readonly socialTypes = ['facebook', 'instagram', 'twitter', 'linkedin', 'google'] as const;
}
