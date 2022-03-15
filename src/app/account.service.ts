import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Account} from "../objects";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountInput = new Subject<Account>();
  accountObservable$ = this.accountInput.asObservable();
  constructor() { }

  changeAccount(account:Account){
    this.accountInput.next(account);
  }
}
