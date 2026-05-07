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

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnChanges, OnDestroy {

  @Input() contact: Contact | null = null;

  contactDetail: ContactDetail | null = null;
  isLoading = false;
  errorMessage: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && this.contact) {
      this.loadContactDetail(this.contact.id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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

  getPrimaryEmail(emails: EmailAddress[]): EmailAddress | null {
    return emails.find(e => e.isPrimary) ?? emails[0] ?? null;
  }

  getSecondaryEmails(emails: EmailAddress[]): EmailAddress[] {
    return emails.filter(e => !e.isPrimary);
  }

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
