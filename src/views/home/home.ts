import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import ContactService, { ContactInterface } from '../../services/contacts.service';
import { AppStore } from '../../app-store';

interface LocalStateInterface {
  contacts: ContactInterface[];
  currentIndex: number;

}

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: [ './home.scss' ]
})

export class HomeViewComponent {
  public isFormOpen: boolean;
  public activeContactId: number;
  public contacts: ContactInterface[];
  public activeContact: ContactInterface;
  public buildName: Function;
  private localState: LocalStateInterface;

  constructor(private _contactService: ContactService, private appStore: AppStore) {
    this.isFormOpen = false;
    this.buildName = this._contactService.buildName;

    this.localState = {
      contacts: [],
      currentIndex: null
    };
  }

  ngOnInit() {
    const { contacts, currentIndex } = this.localState;

    this.localState = this.appStore.getState();
    this.activeContact = contacts.length > 0 ? contacts[currentIndex] : null;
  }

  public openForm() {
    this.isFormOpen = true;
  }

  public cancelNewContact(res: string) {
    if (res === 'cancelAddContact') {
      this.isFormOpen = false;
    }
  }

  public addNewContact(contact: ContactInterface) {
    if (contact.firstName) {
      this.addContact(contact);
      this.activeContact = contact;
      this.activeContactId = this.localState.contacts.length - 1;
      this.isFormOpen = false;
    }
  }

  public setActive(id: number) {
    this.activeContact = this.localState.contacts[id];
  }

  public getContacts() {
    return this.localState.contacts;
  }

  private addContact(contact: ContactInterface) {
    this.localState.contacts.push(contact);
    this.appStore.setState(this.localState);
  }
}