# Contacts Management Dashboard

A production-grade Angular application for a contact management system, built as a frontend technical assessment.

## Live Demo

> Record and share a Loom of the running solution after following the setup steps below.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Angular | 17 | SPA framework |
| TypeScript | 5.2 | Type-safe development |
| SCSS | — | Component styling |
| RxJS | 7.8 | Reactive data streams |
| Karma + Jasmine | — | Unit testing |
| MockAPI.io | — | Mock REST backend |

---

## Prerequisites

- **Node.js** v18+ ([download](https://nodejs.org))
- **npm** v9+
- **Angular CLI** v17: `npm install -g @angular/cli`

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/contacts-management-app.git
cd contacts-management-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the Mock API

This app uses [mockapi.io](https://mockapi.io) as the mock backend.

**Option A — Use the pre-configured endpoint (recommended for review):**

The `ContactService` (`src/app/services/contact.service.ts`) already points to a live mockapi.io project. No changes needed.

**Option B — Set up your own mockapi.io project:**

1. Go to [mockapi.io](https://mockapi.io) and create a free account
2. Create a new project and add two resources:

**Resource 1: `/contacts`**
```json
{
  "id": "string (auto)",
  "firstName": "string",
  "lastName": "string",
  "role": "string",
  "department": "string",
  "phone": "string",
  "address": "string",
  "city": "string",
  "country": "string",
  "avatar": "string (URL)",
  "status": "online | away | offline | busy",
  "bio": "string",
  "meetingUrl": "string"
}
```

**Resource 2: `/contacts/:id/email_addresses`** (nested under contacts)
```json
{
  "id": "string (auto)",
  "contactId": "string",
  "email": "string",
  "isPrimary": "boolean",
  "label": "work | personal"
}
```

3. Copy your project's base URL and update `src/app/services/contact.service.ts`:

```typescript
private readonly baseUrl = 'https://YOUR_PROJECT_ID.mockapi.io/api/v1';
```

### 4. Run the development server

```bash
npm start
# or
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## Running Tests

### Unit tests (Karma + Jasmine)

```bash
npm test
# or
ng test
```

This opens a browser window with the Jasmine test runner. Tests are watched and re-run on file changes.

### Run tests headlessly (for CI)

```bash
ng test --watch=false --browsers=ChromeHeadless
```

### Test coverage report

```bash
ng test --code-coverage
# Report generated in: coverage/contacts-management-app/index.html
```

---

## Production Build

```bash
npm run build
# Output: dist/contacts-management-app/
```

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── contact-list/
│   │   │   ├── contact-list.component.ts       # List with search & selection
│   │   │   ├── contact-list.component.html
│   │   │   ├── contact-list.component.scss
│   │   │   └── contact-list.component.spec.ts  # Unit tests
│   │   └── contact-details/
│   │       ├── contact-details.component.ts    # Detail panel with emails
│   │       ├── contact-details.component.html
│   │       ├── contact-details.component.scss
│   │       └── contact-details.component.spec.ts
│   ├── models/
│   │   └── contact.model.ts                    # TypeScript interfaces
│   ├── services/
│   │   ├── contact.service.ts                  # HTTP service layer
│   │   └── contact.service.spec.ts             # Service unit tests
│   ├── app.component.ts                        # Root shell component
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   └── app.module.ts
├── styles.scss                                 # Global styles + CSS variables
└── index.html
```

---

## Architecture Decisions

### Component Design
- **ContactListComponent** — Presentational + container. Fetches the list, manages search state, emits selection events. Uses `OnPush` change detection.
- **ContactDetailsComponent** — Driven by `@Input()`. Reacts to contact changes via `ngOnChanges`, fetches emails in parallel with `forkJoin`.
- **AppComponent** — Thin shell. Owns layout and the selected contact state. Handles mobile panel switching.

### Data Flow
```
AppComponent
  ├── ContactListComponent → (contactSelected) → AppComponent
  │     └── ContactService.getContacts()
  │     └── ContactService.searchContacts()  [debounced, client-side]
  └── ContactDetailsComponent ← [contact]
        └── ContactService.getContactDetail()
              └── forkJoin(getContactById, getEmailAddresses)
```

### State Management
No external state library (NgRx/Akita) was used — the component tree is shallow enough that `@Input`/`@Output` bindings are sufficient. For a larger app with cross-cutting state (user auth, notifications, global filters), NgRx would be appropriate.

### Styling
- Component-scoped SCSS with no global leakage
- CSS custom properties (variables) defined in `styles.scss` for theming
- `Sora` (headings) + `DM Sans` (body) from Google Fonts
- Responsive: two-panel desktop → single-panel mobile with slide transition

---

## Assumptions & Simplifications

See inline `// Assumption:` and `// Simplified:` comments throughout the source code. Key ones:

- **Search is client-side**: Loads all contacts then filters in memory. Production would use server-side search with query params.
- **Pagination not implemented**: A full implementation would use cursor-based pagination with lazy loading.
- **Error handling is basic**: Only console logs + UI error states. Production would use a centralised HTTP interceptor + toast notification service.
- **No authentication**: The API is public mock data. Real app would have an `AuthInterceptor` attaching JWT tokens.
- **Cross-browser support**: Tested in modern browsers only. IE11/legacy support would require polyfills and additional CSS.
- **E2E tests excluded**: As specified in the assessment brief. Would use Cypress or Playwright in production.

---

## Loom Recording

> 📹 **[Watch the demo on Loom](https://loom.com/YOUR_RECORDING_LINK)**

The recording demonstrates:
1. Application loading contacts from the mock API
2. Selecting a contact and viewing details + emails
3. Search functionality with debounce
4. Mobile responsive layout
5. Running unit tests

---

## Author

Built for frontend technical assessment — 3 years experience in Angular/TypeScript development.
