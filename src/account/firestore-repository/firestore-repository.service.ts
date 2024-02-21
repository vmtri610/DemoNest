import { Injectable } from '@nestjs/common';
import {
  Account,
  AccountRepository,
  ErrAccountNotFound,
  Payment,
} from '../../domain/account.domain';
import * as admin from 'firebase-admin';

@Injectable()
export class FirestoreRepositoryService implements AccountRepository {
  db = admin.firestore();

  constructor() {
    this.db = admin.firestore();
  }

  createAccount(account: Account): any {
    return this.db.collection('accounts').doc(account.id).set(account);
  }

  async getAccount(id: string): Promise<Account> {
    return this.db
      .collection('accounts')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data() as Account;
        } else {
          throw ErrAccountNotFound;
        }
      });
  }

  deleteAccount(id: string): any {
    return this.db.collection('accounts').doc(id).delete();
  }

  async getAllAccounts(): Promise<Account[]> {
    return await this.db
      .collection('accounts')
      .get()
      .then((querySnapshot) => {
        let accounts: Account[] = [];
        querySnapshot.forEach((doc) => {
          accounts.push(doc.data() as Account);
        });
        return accounts;
      });
  }

  transfer(payment: Payment): any {}

  updateAccount(account: Account): any {}
}
