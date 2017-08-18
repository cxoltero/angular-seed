import { removeNgStyles, createNewHosts, createInputTransfer, bootloader } from '@angularclass/hmr';
// TODO, as of now I had to import polyfills due to error:
// Uncaught reflect-metadata shim is required when using class decorators
// Current fix refference:
// https://github.com/angular/angular-cli/issues/2008#issuecomment-247366275

import './polyfills';

import { NgModule, ApplicationRef, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { JsonpModule }    from '@angular/http';

import { APP_ROUTES } from './routes';
import ContactService from './services/contacts.service';
import GravatarService from './services/gravatar.service';

import { BootstrapComponent } from './components/bootstrap/bootstrap';
import { FooterComponent } from './components/footer/footer';
import { NavigationComponent } from './components/navigation/navigation';
import { ContactInfoComponent } from './components/contact-info/contact-info';
import { ContactFormComponent } from './components/contacts-list-form/contacts-list-form';
import { ContactsListComponent } from './components/contacts-list/contacts-list';


// views
import { HomeViewComponent } from './views/home/home';
import { AboutViewComponent } from './views/about/about';

import { AppStore } from './app-store';

if (process.env.ENV === 'production') {
  enableProdMode();
}

@NgModule({
  imports:      [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    JsonpModule
  ],
  declarations: [
    BootstrapComponent,
    FooterComponent,
    NavigationComponent,
    HomeViewComponent,
    AboutViewComponent,
    ContactInfoComponent,
    ContactFormComponent,
    ContactsListComponent
  ],
  exports:      [ BootstrapComponent ],
  bootstrap:    [ BootstrapComponent ],
  providers: [
    ContactService,
    GravatarService,
    AppStore
  ]
})

class AppModule {
  constructor(public appRef: ApplicationRef, public appStore: AppStore) {
    console.log(this.appRef, 'app ref');
    console.log(this.appStore, 'app appStore');
  }

  /* tslint:disable no-any */
  hmrOnInit(store: any) {
    console.log('inside first');
    if (!store || !store.state) { return; }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // restore state
    this.appStore.setState(store.state);
    // restore input values
    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  /* tslint:disable no-any */
  hmrOnDestroy(store: any) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    const currentState = this.appStore.getState();
    store.state = currentState;
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  /* tslint:disable no-any */
  hmrAfterDestroy(store: any) {
    console.log('inside first');
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

// boot on document ready
bootloader(main);