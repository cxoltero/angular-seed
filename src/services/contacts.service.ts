import { Injectable } from '@angular/core';

export interface ContactInterface {
  id?: number;
  firstName: string;
  middleName?: string;
  email?: string;
  lastName?: string;
  phone?: string;
  image?: string;
}

@Injectable()
export default class ContactService {
  public buildName(contact: ContactInterface): string {
    const middleName: string = contact.middleName ? ` ${contact.middleName}` : '';
    const lastName: string = contact.lastName ? ` ${contact.lastName}` : '';

    return `${contact.firstName}${middleName}${lastName}`;
  }
}

