import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../models/user';
import { Adapter } from './adapter';

@Injectable({
  providedIn: 'root',
})
export class UserAdapter implements Adapter<User> {
  constructor(private domSanitizer: DomSanitizer) {}

  adapt(item: any): User {
    item.creationdate = new Date(item.creationdate);


    item.profile_image = this.domSanitizer.bypassSecurityTrustResourceUrl(
      item.profile_image ?? "/assets/images/defaultavatar.svg"
    );
    return new User(
      item.id,
      item.email,
      item.name,
      item.profile_image,
      item.creationdate,
      item.isAdmin ?? false,
      item.fk_community_id,
      item.color,
      item.communities
    );
  }
}
