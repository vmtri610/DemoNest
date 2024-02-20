import { Injectable } from '@nestjs/common';
import {
  AuthRepository,
  ErrMessUnauthorized,
} from '../../../domain/auth.domain';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements AuthRepository {
  auth: admin.auth.Auth;

  constructor() {
    this.auth = admin.auth();
  }

  async verifyToken(token: string): Promise<DecodedIdToken> {
    try {
      let decodedToken = await this.auth.verifyIdToken(token);
      if (decodedToken.uid == null) {
        throw ErrMessUnauthorized;
      }
      return decodedToken;
    } catch (error) {
      throw ErrMessUnauthorized;
    }
  }
}
