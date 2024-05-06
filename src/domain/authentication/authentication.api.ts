import { Model } from '../model';
import { login, register, logout } from './hooks/auth';

export class AuthenticationApi {
  static login(values: any) {
    return login(values);
  }

  static register(values: Partial<Model.User>) {
    return register(values);
  }

  static logout() {
    return logout();
  }
}