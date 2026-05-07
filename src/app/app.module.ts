import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';

/**
 * AppModule — Root module for the Contacts Management application.
 *
 * Design decision: Using a single NgModule for this assessment. In a large
 * production app, this would be split into feature modules (ContactsModule,
 * SharedModule, CoreModule) with lazy loading via the Angular Router to
 * improve initial bundle size and load performance.
 *
 * HttpClientModule is imported here (once in root) so the ContactService can
 * inject HttpClient. In a larger app, an HTTP interceptor would be registered
 * here for auth headers and global error handling.
 */
@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    // ContactService is provided in root via providedIn: 'root' — no explicit registration needed.
    // If we needed multiple instances (e.g. per feature module), we'd provide it here.
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
